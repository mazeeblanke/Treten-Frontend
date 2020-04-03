import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import notifier from 'simple-react-notifier'
import { Input } from 'antd'
import axios from 'axios'

const { Search } = Input

class NewsLetterSubscription extends Component {
  state = {
    email: '',
    isLoading: false,
    errors: {}
  }

  setEmail = e => {
    this.setState({
      email: e.target.value
    })
  }

  subscribe = (e) => {
    this.setState({
      isLoading: true
    })
    axios.post('t/api/newsletter/subscribe', {
      email: this.state.email
    })
      .then((res) => {
        notifier.success(res.data.message)
        this.setState({
          isLoading: false,
          email: '',
          errors: {}
        })
      }).catch((err) => {
        notifier.error('ERROR! ' + err.response.data.message)
        this.setState({
          isLoading: false,
          errors: err.response.data.errors
        })
      })
  }

  render () {
    return (
      <section className="newsletter has-dark-bg mb-5 ">
        <div className="container has-full-height">
          <div className="row justify-content-center align-items-center has-full-height">
            <div className="col-sm-12 col-md-4">
              <h4 className="is-white m-0">
                Subscribe to our newsletter
              </h4>
              <p className="is-white font-weight-light m-0">
                For new awesome courses and special promotion campaigns
              </p>
            </div>
            <div className="col-sm-12 col-md-4">
              <div>
                <Search
                  disabled={
                    this.state.isLoading
                  }
                  loading={this.state.isLoading}
                  value={this.state.email}
                  onChange={this.setEmail}
                  className="search"
                  placeholder="What's your email address ?"
                  enterButton="Subscribe"
                  size="large"
                  onSearch={this.subscribe}
                />
                {this.state.errors.email && <div className="has-error">
                  <div className="ant-form-explain">
                    {this.state.errors.email}
                  </div>
                </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

NewsLetterSubscription.propTypes = {

}

export default NewsLetterSubscription
