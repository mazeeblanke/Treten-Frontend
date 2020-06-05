const express = require('express')
const next = require('next')
const server = express()
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
  dev
})
const handler = app.getRequestHandler()


process.env.PROXYURL =
  process.env.NODE_ENV === 'production'
    ? 'http://api.tretenacademy.com'
    : 'http://tretenweb';

const proxy = require('express-http-proxy')

app
  .prepare()
  .then(() => {
    server.use(
      '/t',
      proxy(process.env.PROXYURL, {
        limit: '420mb'
      })
    )

    server.get('/sitemap.xml',  proxy(process.env.PROXYURL, {
      limit: '420mb'
    }))

    server.get('/', (req, res) => {
      app.render(req, res, '/home', {})
    })

    server.get('/d/admin', (req, res) => {
      res.redirect(302, { Location: '/d/admin/home' })
      res.end()
    })

    server.get('/d/student', (req, res) => {
      res.writeHead(302, { Location: '/d/student/courses' })
      res.end()
    })

    server.get('/d/instructor', (req, res) => {
      res.writeHead(302, { Location: '/d/instructor/home' })
      res.end()
    })

    server.get('/d/student/home', (req, res) => {
      res.writeHead(302, { Location: '/d/student/courses' })
      res.end()
    })

    server.get('/instructors/:instructorSlug', (req, res) => {
      app.render(req, res, '/instructor', {})
    })

    server.get('/d/instructor/resources', (req, res) => {
      app.render(req, res, '/d/student/resources', {})
    })

    server.get('/d/instructor/notifications', (req, res) => {
      app.render(req, res, '/d/student/notifications', {})
    })

    server.get('/d/instructor/messages', (req, res) => {
      app.render(req, res, '/d/student/messages', {})
    })

    server.get('/d/student/courses/:courseSlug', (req, res) => {
      app.render(req, res, '/d/student/course', {})
    })

    server.get('/d/admin/messages', (req, res) => {
      app.render(req, res, '/d/student/messages', {})
    })

    server.get('/courses/:courseSlug', (req, res) => {
      app.render(req, res, '/course', {})
    })

    server.get('/courses/:courseSlug/enroll', (req, res) => {
      app.render(req, res, '/enroll', {})
    })

    server.get("/d/admin/:entity/update/:id", (req, res) => {
      return app.render(req, res, "/d/admin/" + req.params.entity + '/create', { id: req.params.id })
    })

    server.get('/d/admin/courses/:courseSlug', (req, res) => {
      app.render(req, res, '/d/instructor/course', {})
    })

    server.get('/d/instructor/courses/:courseSlug', (req, res) => {
      app.render(req, res, '/d/instructor/course', {})
    })

    server.get('/d/admin/resources', (req, res) => {
      app.render(req, res, '/d/student/resources', {})
    })

    server.get('/blog/:blogSlug', (req, res) => {
      app.render(req, res, '/blog-post', {})
    })

    // server.use(function(err, req, res, next) {
    //   console.log('kkkkk', err)
    //   if (err) {
    //     res.redirect(302, { Location: '/' })
    //     res.end()
    //   }
    //   // // set locals, only providing error in development
    //   // res.locals.message = err.message;
    //   // res.locals.error = req.app.get('env') === 'development' ? err : {};

    //   // // render the error page
    //   // res.status(err.status || 500);
    //   // res.render('error');
    // });

    server.get('*', (req, res) => handler(req, res))

    server.listen(PORT)
  })
  .catch(() => {
    process.exit(1)
  })
