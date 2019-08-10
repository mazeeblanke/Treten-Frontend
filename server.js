const express = require("express");
const next = require("next");
const server = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev: dev
});
const handler = app.getRequestHandler();
const { PROXYURL } = require('./lib/helpers');
var proxy = require("express-http-proxy");

app
  .prepare()
  .then(() => {
    server.use("/api", proxy(PROXYURL));

    server.use("/t", proxy(PROXYURL));

    server.get("/", (req, res) => {
      app.render(req, res, "/home", {});
    });

    server.get("/instructors/:name", (req, res) => {
      app.render(req, res, "/instructor", {});
    });

    server.get("/blog/:blogslug", (req, res) => {
      app.render(req, res, "/blog-post", {});
    });

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(PORT, _ => console.log(`> server running on port ${PORT}`));
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
