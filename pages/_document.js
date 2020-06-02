// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { PageTransition } from 'next-page-transitions'

const viewport = "width=device-width, initial-scale=1.0"

class TretenDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content={`${viewport}`} />
          <link rel="shortcut icon" type="image/png" href="/images/logo.png" />
          <script src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit" async defer></script>
          {/* <!-- Chrome, Firefox OS and Opera --> */}
          <meta name="theme-color" content="#E12828" />
          {/* <!-- Windows Phone --> */}
          <meta name="msapplication-navbutton-color" content="#E12828" />
          {/* <!-- iOS Safari --> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#E12828" />
        </Head>
        <body>
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type" : "Organization",
                "name" : "Treten",
                "url" : "http://tretenacademy.com.ng",
                "sameAs" : [
                  "https://twitter.com/tretenacademy",
                  "https://www.facebook.com/tretenacademy", 
                  "https://www.linkedin.com/company/treten-academy", 
                  "https://www.instagram.com/treten.academy/?hl=en",
                ],
                "image": [
                  "http://tretenacademy.com.ng/images/logo.png",
                ],
                "description": "We seek to empower professionals with the required skills and training to take them from Zero to Hero"
              }
            `
          }} />
          {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-168223452-1"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', 'UA-168223452-1');
            `
          }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default TretenDocument
