// import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import React, { Component } from 'react'
import Navbar from '../../components/shared/Navbar'
import 'simple-react-notifier/dist/index.css'
// const Cookies = require('js-cookie')
/* eslint-disable */
export default Page => {
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
        <div id="treten">
          {/* <Head>
            <meta name="csrf-token" content={Cookies.get('XSRF-TOKEN')} />
          </Head> */}
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'https://tretenacademy.com',
              site_name: 'Treten Academy',
            }}
            twitter={{
              handle: '@tretenacademy',
              site: '@treten',
              cardType: 'summary_large_image',
            }}
          />
          <Navbar currentPath={this.props.currentPath} noBoxShadow {...this.props} />
          <Page className="mt-5" {...this.props} />
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </div>
      )
    }
  }
}
