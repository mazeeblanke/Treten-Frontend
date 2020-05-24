// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class TretenDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <script async defer src="https://cdn.jsdelivr.net/npm/socket.io-client@2/dist/socket.io.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <script
            async
            defer
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
                    (function(){
                    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                    s1.async=true;
                    s1.src='https://embed.tawk.to/5da387e2fbec0f2fe3b988d8/default';
                    s1.charset='UTF-8';
                    s1.setAttribute('crossorigin','*');
                    s0.parentNode.insertBefore(s1,s0);
                    })();  
                `
            }}
          /> */}
        </body>
      </Html>
    )
  }
}

export default TretenDocument
