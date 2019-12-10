import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import * as actions from '../../store/actions'
import notifier from 'simple-react-notifications'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from '../../lib/helpers'

const { TextArea } = Input
/* eslint-diable */
class ContactUsForm extends Component {
  state = {
    isLoading: false
  }

  handleSubmit = (e) => {
    e.preventDefault()

    this.setState({
      isLoading: true
    })

    this.props.form.validateFields((err, form) => {
      if (!err && isValidPhoneNumber(this.props.form.getFieldValue('phoneNumber'))) {
        this.props.sendContactUsMsg({ ...form }).then((res) => {
          this.setState({
            isLoading: false
          })
          notifier.success(res.data.message)
          this.props.form.resetFields()
        }).catch(() => {
          notifier.error('ERROR! The Form contains some errors')
          this.setState({
            isLoading: false,
          })
        })
      } else {
        this.setState({
          isLoading: false
        })
      }
    })
  }

  render () {
    const { form, user } = this.props
    const {
      getFieldDecorator,
      getFieldValue,
      setFieldsValue,
      // getFieldError
    } = form
    // const phoneNumber = getFieldValue('phoneNumber')
    return (
      <div className="col-md-7 contactus-form pr-6 pl-6 pb-2">
        <h5 className="text-center contact-us-form__main-text mt-5 mb-5">
          Let’s talk!
        </h5>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <div className="row">
            <div className="col-md-6">
              <Form.Item>
                <label htmlFor="firstName">First name</label>
                {getFieldDecorator('firstName', {
                  rules: [{ required: true, message: 'Please input your first name!' }],
                  initialValue: user.firstName
                })(
                  <Input
                    disabled={!!user.firstName}
                    size="large"
                    type="text"
                    placeholder="Jonathan"
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item>
                <label htmlFor="lastName">Last name</label>
                {getFieldDecorator('lastName', {
                  rules: [{ required: true, message: 'Please input your last name!' }],
                  initialValue: user.lastName
                })(
                  <Input
                    disabled={!!user.lastName}
                    size="large"
                    type="text"
                    placeholder="Doe"
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item>
                <label htmlFor="email">Email address</label>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your email!'
                    },
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                  ],
                  initialValue: user.email
                })(
                  <Input
                    disabled={!!user.email}
                    size="large"
                    type="email"
                    placeholder="Email"
                  />,
                )}
              </Form.Item>
            </div>
            <div className="col-md-6 mt-1 ">
              <label className="mb-1" htmlFor="Phone number">Phone number</label>
              {
                getFieldDecorator('phoneNumber', {
                  rules: [{ required: true, message: 'Please input your phone number' }],
                  initialValue: user.phoneNumber || ''
                })(
                  <PhoneInput
                    placeholder="Enter phone number"
                    onChange={ value => setFieldsValue({
                      phoneNumber: value,
                    })
                    }
                    error={
                      getFieldValue('phoneNumber') &&
                      !isValidPhoneNumber(getFieldValue('phoneNumber')) &&
                      'The provided phone number is invalid'
                    }
                  />
                )
              }
            </div>
            <div className="col-md-12">
              <Form.Item>
                <label >What’s your message?</label>
                {getFieldDecorator('message', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                  initialValue: user.message
                })(
                  <TextArea
                    size="large"
                    rows={5}
                    placeholder="Tell us all about it!"
                  />,
                )}
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item className="d-flex justify-content-center">
                <Button
                  disabled={this.state.isLoading}
                  loading={this.state.isLoading}
                  type="primary"
                  htmlType="submit"
                  className="auth__btn pl-4 pr-4">
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

ContactUsForm.propTypes = {
  user: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  sendContactUsMsg: PropTypes.func.isRequired
}

const WrappedContactUsForm = Form.create({ name: 'contactus form' })(ContactUsForm)

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user
})

export default connect(mapStateToProps, {
  sendContactUsMsg: actions.sendContactUsMsg
})(WrappedContactUsForm)
