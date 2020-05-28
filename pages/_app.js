import App, { Container } from 'next/app'
import Head from 'next/head'
import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { Provider } from 'react-redux'
import NextNProgress from '../components/shared/NextNProgress'
import withReduxStore from '../lib/with-redux-store'
import 'react-phone-number-input/style.css'
import 'react-quill/dist/quill.snow.css'
import 'antd/dist/antd.css'
import '../public/slick-carousel/slick/slick.css'
import '../public/slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/sass/application.scss'
import 'react-image-crop/dist/ReactCrop.css';
import 'element-theme-default'
import { PageTransition } from 'next-page-transitions'

// const Cookies = require('js-cookie')

class Treten extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <link rel="shortcut icon" type="image/png" href="images/logo.png" />
          <script src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit" async defer></script>
          {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link> */}
          {/* <!-- Chrome, Firefox OS and Opera --> */}
          <meta name="theme-color" content="#E12828" />
          {/* <!-- Windows Phone --> */}
          <meta name="msapplication-navbutton-color" content="#E12828" />
          {/* <!-- iOS Safari --> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#E12828" />
        </Head>

        <Provider store={reduxStore}>
          <PageTransition timeout={300} classNames="page-transition">
            <Component {...pageProps} />
          </PageTransition>  
        </Provider>
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
            <span>,</span>
            <a href="/policies"> Privacy Policy </a>
            <span>, and our</span>
            <a href="/termsandconditions"> Terms of Service </a>
          </p>
        </CookieConsent>
        <NextNProgress color="#E12828" startPosition={1} stopDelayMs={500} height={3} />
        {/* <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
          }
          .page-transition-enter-active {
            opacity: 1;
            transition: opacity 300ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity 300ms;
          }
        `}</style> */}
      </Container>
    )
  }
}

export default withReduxStore(Treten)
