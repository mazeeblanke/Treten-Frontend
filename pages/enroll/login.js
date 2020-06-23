import qs from 'query-string'
import React, { Component } from 'react'
import withAuthLayout from '../layouts/withAuthLayout'
import LoginForm from '../../components/auth/EnrollLoginForm'

class Login extends Component {
  
  static async getInitialProps ({ req }) {
    let extraQueryParams;  
    if (!req) {
      extraQueryParams = {
        ...qs.parse(location.search)
      }
    }  
    return {
      returnUrl: req 
        ? req.query.return
        : extraQueryParams.return
    }
  }    

  render () {
    const {
      returnUrl
    }  = this.props  
    return (
      <div className="container mt-6">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 col-lg-4">
            <div>
              <h4>
                <b>Login to your account</b>
              </h4>
              <LoginForm returnUrl={returnUrl} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthLayout(Login)
