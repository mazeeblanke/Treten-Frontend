import React from 'react'
import { Form, Input, Button } from 'antd'
// import ReactPhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/dist/style.css'
import PropTypes from 'prop-types'
import notifier from 'simple-react-notifier'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from '../../lib/helpers'

class EnrollRegisterForm extends React.Component {
  state = {
    phone: '',
    mounted: false,
    isRegistering: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      getFieldValue,
      validateFields,
      setFields
    } = this.props.form
    validateFields((err, values) => {
      if (
        !err &&
        isValidPhoneNumber(getFieldValue('phone_number'))
      ) {
        this.setState({
          isRegistering: true
        })
        this.props.register({
          ...values,
          as: 'student'
        }).then((res) => {
          this.props.proceed()
          notifier.success(res.message)
        }).catch((err) => {
          notifier.error('ERROR! Unable to authenticate!')
          const errors = err.response.data.errors || {}
          setFields({
            email: {
              errors: errors.email ? [new Error(errors.email[0])] : [],
            },
            password: {
              errors: errors.password ? [new Error(errors.password[0])] : [],
            },
          })
        }).finally(() => {
          if (this.state.mounted) {
            this.setState({
              isRegistering: false
            })
          }
        })
      }
    })
  };

  componentDidMount () {
    this.setState({
      mounted: true
    })
  }

  componentWillMount () {
    this.setState({
      mounted: false
    })
  }

  render () {
    const { form } = this.props
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue
    } = form
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="enroll-register-form"
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="first_name">First name</label>
              {getFieldDecorator('first_name', {
                rules: [{
                  required: true,
                  message: 'Please input your first name!'
                }],
              })(
                <Input
                  size="large"
                  type="text"
                  placeholder="Jonathan"
                />,
              )}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="last_name">Last name</label>
              {getFieldDecorator('last_name', {
                rules: [{
                  required: true,
                  message: 'Please input your last name!'
                }],
              })(
                <Input
                  size="large"
                  type="text"
                  placeholder="Doe"
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="other_name">Other name (optional)</label>
              {getFieldDecorator('other_name', {
                rules: [{
                  required: false,
                  message: 'Please input your other name!'
                }],
              })(
                <Input
                  size="large"
                  type="text"
                  placeholder="Adamu"
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
              <label htmlFor="phone_number">Phone number</label>
              {getFieldDecorator('phone_number', {
                rules: [{
                  required: true,
                  message: 'Please input your phone number!'
                }],
              })(
                <PhoneInput
                  placeholder="Enter phone number"
                  onChange={value => setFieldsValue({
                    phone_number: value,
                  })
                  }
                  error={
                    getFieldValue('phone_number') &&
                    !isValidPhoneNumber(getFieldValue('phone_number')) &&
                    'The provided phone number is invalid'
                  }
                />
                // <ReactPhoneInput
                //   className="has-full-width"
                //   defaultCountry="ng"
                // />
              )}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="password">
                Password
              </label>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: 'Please input your Password!'
                }],
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
            disabled={this.state.isRegistering}
            loading={this.state.isRegistering}
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

EnrollRegisterForm.propTypes = {
  proceed: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

const WrappedEnrollRegisterForm = Form.create({
  name: 'enroll register form'
})(EnrollRegisterForm)

export default WrappedEnrollRegisterForm
