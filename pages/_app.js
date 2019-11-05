import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import CookieConsent from "react-cookie-consent";
import NextNProgress from '../components/shared/NextNProgress';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import "../static/slick-carousel/slick/slick.css";
import "../static/slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../static/sass/application.scss';



class Treten extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Container>
        <Head>
          <link rel="shortcut icon" type="image/png" href="/static/images/logo.png" />
          {/* <!-- Chrome, Firefox OS and Opera --> */}
          <meta name="theme-color" content="#E12828" />
          {/* <!-- Windows Phone --> */}
          <meta name="msapplication-navbutton-color" content="#E12828" />
          {/* <!-- iOS Safari --> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#E12828" />
          <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i&display=swap" rel="stylesheet"></link>
        </Head>

        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="treten"
          style={{ background: "#2B373B" }}
          buttonStyle={{ color: "#4e503b", fontSize: "12px", padding: '15px 35px' }}
          expires={150}
        >
          <p className="text-center m-0 p-0">
            By using our site, you acknowledge that you have read and understand our <a href=""> Cookie Policy </a>,  <a href=""> Privacy Policy </a>,  and our <a href=""> Terms of Service </a>
          </p>
        </CookieConsent>
        <NextNProgress
          color="#E12828"
          startPosition={1}
          stopDelayMs={500}
          height={3}
        />
      </Container>
    )
  }
}

export default withReduxStore(Treten);

