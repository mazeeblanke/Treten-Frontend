const express = require("express");
const next = require("next");
const server = express();
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev: dev
});
const handler = app.getRequestHandler();
// process.env.PROXYURL = 'http://localhost:80';
process.env.PROXYURL = process.env.NODE_ENV === 'production'
  ? 'https://treten-ng-backend.herokuapp.com/'
  // : 'tretenweb';
  : 'http://172.18.0.5:80';

var proxy = require("express-http-proxy");

app
  .prepare()
  .then(() => {
    server.use("/api", proxy(`${process.env.PROXYURL}`));

    server.use("/t", proxy(process.env.PROXYURL));

    server.get("/", (req, res) => {
      app.render(req, res, "/home", {});
    });

    server.get("/instructors/:name", (req, res) => {
      app.render(req, res, "/instructor", {});
    });

    server.get("/d/instructor/resources", (req, res) => {
      app.render(req, res, "/d/student/resources", {});
    });

    server.get("/d/instructor/notifications", (req, res) => {
      app.render(req, res, "/d/student/notifications", {});
    });

    server.get("/d/admin/course", (req, res) => {
      app.render(req, res, "/d/instructor/course", {});
    });

    server.get("/d/admin/resources", (req, res) => {
      app.render(req, res, "/d/student/resources", {});
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
