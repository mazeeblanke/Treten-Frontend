import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import notifier from 'simple-react-notifier'
import * as actions from '../../store/actions'

class EnrollLoginForm extends React.Component {
  state = {
    isLoggingIn: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoggingIn: true
        })
        this.props.login(values).then((res) => {
          notifier.success('Login succesful!')
          Router.push(this.props.returnUrl)
        }).catch((err) => {
          notifier.error('ERROR! Unable to authenticate!')
          console.log(err)
          const errors = err.response.data.errors || {}
          this.props.form.setFields({
            email: {
              errors: errors.email ? [new Error(errors.email[0])] : [],
            },
            password: {
              errors: errors.password ? [new Error(errors.password[0])] : [],
            },
          })
        }).finally(() => {
          this.setState({
            isLoggingIn: false
          })
        })
      }
    })
  };

  render () {
    const { form } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={this.handleSubmit} className="enroll-register-form mt-3">
        <div className="row">
          <div className="col-md-12">
            <Form.Item>
              <label htmlFor="email">Email address</label>
              {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please input your email!' }],
              })(
                <Input
                  size="large"
                  type="email"
                  placeholder="jonathanadamu@mymail.com"
                />,
              )}
            </Form.Item>
          </div>
          <div className="col-md-12">
            <Form.Item>
              <label htmlFor="password">
                Password
              </label>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input.Password
                  type="password"
                  placeholder="Enter your password"
                />,
              )}
            </Form.Item>
          </div>
        </div>
        <Form.Item className="is-full-width mb-0">
          <Button
            disabled={this.state.isLoggingIn}
            loading={this.state.isLoggingIn}
            htmlType="submit"
            size="large"
            type="danger"
            style={{ float: 'right', width: '141px' }}
          >
            Login
          </Button>
        </Form.Item>
        <div>
          <Link href={"/enroll/register?return=" + this.props.returnUrl}>
            <a className="is-blue">Register</a>
          </Link>
          <p>
            <a href="/t/password/reset" className="is-blue">Forgot password?</a>
          </p>
        </div>
      </Form>
    )
  }
}

EnrollLoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
}

const WrappedEnrollLoginForm = Form.create({
  name: 'enroll login form'
})(EnrollLoginForm)

export default connect(null, {
  login: actions.login,
})(WrappedEnrollLoginForm)
