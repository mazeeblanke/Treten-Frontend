import React, { Component } from 'react'
import Head from 'next/head'
import AlternateNavbar from '../../components/shared/AlternateNavbar'

const Cookies = require('js-cookie')

export default (Page) => {
  return class extends Component {
    static async getInitialProps (ctx) {
      let pageProps = {}
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx)
      }
      // console.log(ctx)
      return { ...pageProps, currentPath: ctx.asPath }
    }

    render () {
      return (
        <div id="treten" style={{ margin: '0' }}>
          <Head>
            <meta name="csrf-token" content={Cookies.get('XSRF-TOKEN')} />
          </Head>
          <AlternateNavbar />
          <Page {...this.props} />
        </div>
      )
    }
  }
}
