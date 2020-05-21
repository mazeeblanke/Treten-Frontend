import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button } from 'antd'
import notifier from 'simple-react-notifier'

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
          notifier.success(res.message)
          this.props.proceed()
        }).catch((err) => {
          notifier.error('ERROR! Unable to authenticate!')
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
      <Form onSubmit={this.handleSubmit} className="enroll-register-form">
        <div className="row">
          <div className="col-md-6">
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
          <div className="col-md-6">
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
        <Form.Item className="is-full-width">
          <Button
            disabled={this.state.isLoggingIn}
            loading={this.state.isLoggingIn}
            htmlType="submit"
            size="large"
            type="danger"
          >
            Proceed
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

EnrollLoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  proceed: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}

const WrappedEnrollLoginForm = Form.create({
  name: 'enroll login form'
})(EnrollLoginForm)

export default WrappedEnrollLoginForm
