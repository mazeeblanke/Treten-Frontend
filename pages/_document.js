// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
// import { PageTransition } from 'next-page-transitions'

const viewport = 'width=device-width, initial-scale=1.0'

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
          <link rel="canonical" href="https://www.tretenacademy.com" />
          <script src="https://www.google.com/recaptcha/api.js?onload=recaptchaLoaded&render=explicit" async defer></script>
          {/* <!-- Chrome, Firefox OS and Opera --> */}
          <meta name="theme-color" content="#E12828" />
          {/* <!-- Windows Phone --> */}
          <meta name="msapplication-navbutton-color" content="#E12828" />
          {/* <!-- iOS Safari --> */}
          <meta name="apple-mobile-web-app-status-bar-style" content="#E12828" />
          {/* <!-- Twitter globals --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@treatenacademy" />
          <meta name="twitter:domain" content="tretenacademy.com" />
          <meta name="twitter:creator" content="@tretenacademy" />
          <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io.dev.js"></script>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169409471-1"></script>
          <script dangerouslySetInnerHTML={{ 
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-169409471-1'); 
            `
          }} />
          <script dangerouslySetInnerHTML={{ 
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '201527227853397');
            fbq('track', 'PageView');
            ` }} />
          <noscript dangerouslySetInnerHTML={{ 
            __html: `
            <img height="1" width="1" style="display:none"
            src="https://www.facebook.com/tr?id=201527227853397&ev=PageView&noscript=1" />
            `
          }}/>
        </Head>
        <body>
          <noscript dangerouslySetInnerHTML={{__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHTMKZV" height="0" width="0" style="display:none;visibility:hidden;"></iframe>`}} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "http://schema.org",
                "@type" : "Organization",
                "name" : "Treten",
                "url" : "http://tretenacademy.com",
                "description": "and training to take them from Zero to Hero"
              }
            `
          }} />

          {/* <!-- Treten Academy hub spot--> */}
          <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/5370391.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default TretenDocument
