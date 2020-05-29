import React, { Component } from 'react'
import Head from 'next/head'
import AlternateNavbar from '../../components/shared/AlternateNavbar'
import NextNProgress from '../../components/shared/NextNProgress'
// const Cookies = require('js-cookie')

export default (Page) => {
  return class extends Component {
    static async getInitialProps (ctx) {
      let pageProps = {}
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx)
      }
      return { ...pageProps, currentPath: ctx.asPath }
    }

    render () {
      return (
        <div id="treten" style={{ margin: '0' }}>
          <Head>
            {/* <meta name="csrf-token" content={Cookies.get('XSRF-TOKEN')} /> */}
          </Head>
          <AlternateNavbar />
          <Page {...this.props} />
          <NextNProgress color="#E12828" startPosition={1} stopDelayMs={500} height={3} />
        </div>
      )
    }
  }
}
