import { DefaultSeo } from 'next-seo'
import React, { Component } from 'react'
import CookieConsent from 'react-cookie-consent'
import Navbar from '../../components/shared/Navbar'
import NextNProgress from '../../components/shared/NextNProgress'

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
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'http://tretenacademy.com.ng',
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
          <NextNProgress color="#E12828" startPosition={1} stopDelayMs={500} height={3} />
          <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="treten"
            style={{ background: '#2B373B' }}
            buttonStyle={{ color: '#4e503b', fontSize: '12px', padding: '15px 35px' }}
            expires={150}
          >
            <p className="text-center m-0 p-0">
              By using our site, you acknowledge that you have read and understand our
              <a href="/cookie"> Cookie Policy </a>
              <span>{",  "}</span>
              <a href="/policies"> Privacy Policy </a>
              <span>{"  , and our   "}</span>
              <a href="/termsandconditions"> Terms of Service </a>
            </p>
          </CookieConsent>
        </div>
      )
    }
  }
}
