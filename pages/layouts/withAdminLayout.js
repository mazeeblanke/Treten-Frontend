import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import AdminLayout from './AdminLayout'
import Head from 'next/head'
import * as actions from '../../store/actions'
import PropTypes from 'prop-types'
const Cookies = require('js-cookie')

export default Page => {
  class withAdminLayout extends Component {
    static async getInitialProps (ctx) {
      if (Page.getInitialProps) {
        await Page.getInitialProps(ctx)
      }
      return {}
    }

    render () {
      return (
        <AdminLayout headerName={Page.headerName} backText={Page.backText}>
          <Head>
            <meta name="csrf-token" content={Cookies.get('XSRF-TOKEN')} />
          </Head>
          <Page className="mt-5" {...this.props} />
        </AdminLayout>
      )
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

  withAdminLayout.propTypes = {
    user: PropTypes.object.isRequired
  }

  return withRouter(
    connect(
      mapStateToProps,
      { ...actions }
    )(withAdminLayout)
  )
}
