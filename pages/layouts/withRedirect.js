/* eslint-disable */
import React, { Component } from 'react'
import { redirectTo } from '../../lib/helpers'
import { userIsInstructor, userIsStudent, userIsAdmin } from '../../store/reducers/user'

export default Page => {
  return class extends Component {
    static async getInitialProps (ctx) {
      let pageProps = {}
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx)
      }
      const user = ctx.reduxStore.getState().user
      if (!user || !user.role) {
        redirectTo('/', { res: ctx.res, status: 302 })
        return { ...pageProps }
      }

      if (user && user.role && ctx.asPath.includes('profile')) {
        return { ...pageProps }
      }
      if (userIsStudent(user) && !ctx.asPath.includes('student')) {
        // if (ctx.asPath.includes('admin')) {
        //   redirectTo(ctx.asPath.replace('admin', 'student'), { res: ctx.res, status: 302 })
        //   return { ...pageProps }
        // } else 
        if (ctx.asPath.includes('instructor')) {
          redirectTo(ctx.asPath.replace('instructor', 'student'), { res: ctx.res, status: 302 })
          return { ...pageProps }
        } else {
          redirectTo('/d/student/courses', { res: ctx.res, status: 302 })
          return { ...pageProps }
        }
        // redirectTo('/d/student/courses', { res: ctx.res, status: 302 })
        // return { ...pageProps }
      } else if (userIsInstructor(user) && !ctx.asPath.includes('instructor')) {
        if (ctx.asPath.includes('admin')) {
          redirectTo(ctx.asPath.replace('admin', 'instructor'), { res: ctx.res, status: 302 })
          return { ...pageProps }
        } else if (ctx.asPath.includes('student')) {
          redirectTo(ctx.asPath.replace('student', 'instructor'), { res: ctx.res, status: 302 })
          return { ...pageProps }
        } else {
          redirectTo('/d/instructor/home', { res: ctx.res, status: 302 })
          return { ...pageProps }
        }
        // redirectTo('/d/instructor/home', { res: ctx.res, status: 302 })
      } else if (userIsAdmin(user) && !ctx.asPath.includes('admin')) {
        if (ctx.asPath.includes('student')) {
          redirectTo(ctx.asPath.replace('student', 'admin'), { res: ctx.res, status: 302 })
          return { ...pageProps }
        } else if (ctx.asPath.includes('instructor')) {
          redirectTo(ctx.asPath.replace('instructor', 'admin'), { res: ctx.res, status: 302 })
          return { ...pageProps }
        } else {
          redirectTo('/d/admin/home', { res: ctx.res, status: 302 })
          return { ...pageProps }
        }
        // redirectTo('/d/admin/home', { res: ctx.res, status: 302 })
      }
      // if (ctx.pathname === "" || ctx.pathname === "/_error") {
      //   redirectTo("/hello-next-js", { res: ctx.res, status: 302 });
      //   return {pageProps};
      // }
      return { ...pageProps }
    }

    render () {
      return (
        <Page className="mt-5" {...this.props} />
      )
    }
  }
}
