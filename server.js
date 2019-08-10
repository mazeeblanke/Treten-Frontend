const express = require("express");
const next = require("next");
const server = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev: dev
});
const handler = app.getRequestHandler();
process.env.PROXYURL = 'https://treten-ng-backend.herokuapp.com/';
var proxy = require("express-http-proxy");

app
  .prepare()
  .then(() => {
    server.use("/api", proxy(process.env.PROXYURL));

    server.use("/t", proxy(process.env.PROXYURL));

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
