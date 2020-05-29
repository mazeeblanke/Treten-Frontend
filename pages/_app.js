import App from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import NextNProgress from '../components/shared/NextNProgress'
import 'react-phone-number-input/style.css'
import 'react-quill/dist/quill.snow.css'
import 'antd/dist/antd.css'
import '../public/slick-carousel/slick/slick.css'
import '../public/slick-carousel/slick/slick-theme.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../public/sass/application.scss'
import 'react-image-crop/dist/ReactCrop.css';
import 'element-theme-default'
// import { PageTransition } from 'next-page-transitions'

class Treten extends App {
  render () {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        {/* <PageTransition timeout={300} classNames="page-transition"> */}
          <Component {...pageProps} />
        {/* </PageTransition>   */}
      </Provider>
    )
  }
}

export default withReduxStore(Treten)
