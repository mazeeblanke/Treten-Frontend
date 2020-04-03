/* eslint-disable */
import { Form, Input, Button } from 'antd'
// import ReactPhoneInput from 'react-phone-input-2'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import 'react-phone-input-2/dist/style.css'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'
import { getUserDetails, userIsStudent } from '../../store/reducers/user'
import notifier from 'simple-react-notifier'
import { isValidPhoneNumber } from '../../lib/helpers'
import PhoneInput from 'react-phone-number-input'

class PersonalDetailsForm extends Component {
  state = {
    phoneError: '',
    isUpdatingProfile: false
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      getFieldValue
    } = this.props.form
    this.props.form.validateFields((err, form) => {
      if (
        !err && (
          !getFieldValue('phoneNumber') ||
          isValidPhoneNumber(getFieldValue('phoneNumber'))
        )
      ) {
        this.setState({
          isUpdatingProfile: true
        })
        this.props
          .updateUserDetails(form)
          .then(res => {
            notifier.success('Your profile has been updated')
            this.setState({
              isUpdatingProfile: false
            })
          })
          .catch(err => {
            const errors = err.response.data.errors || {}
            this.setState({
              isUpdatingProfile: false
            })

            this.props.form.setFields({
              firstName: {
                errors: errors.firstName
                  ? [new Error(errors.first_name[0])]
                  : []
              },
              lastName: {
                errors: errors.lastName ? [new Error(errors.last_name[0])] : []
              },
              otherName: {
                errors: errors.other_name
                  ? [new Error(errors.other_mame[0])]
                  : []
              },
              email: {
                errors: errors.email ? [new Error(errors.email[0])] : []
              },
              phoneNumber: {
                errors: errors.phone_number
                  ? [new Error(errors.phone_number[0])]
                  : []
              }
            })

            notifier.error('ERROR! Your profile could not be updated')
          })
      } else {
        this.setState({
          isUpdatingProfile: false
        })
      }
    })
  };

  render () {
    const {
      user,
      form
    } = this.props
    const {
      getFieldDecorator,
      getFieldValue
    } = form
    return (
      <div className="col-md-12 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <div className="row">
            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="firstName">First name</label>
                {getFieldDecorator('firstName', {
                  rules: [
                    { required: true, message: 'Please input your first name!' }
                  ],
                  initialValue: user.firstName
                })(<Input size="large" type="text" placeholder="Jonathan" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="lastName">Last name</label>
                {getFieldDecorator('lastName', {
                  rules: [
                    { required: true, message: 'Please input your last name!' }
                  ],
                  initialValue: user.lastName
                })(<Input size="large" type="text" placeholder="Doe" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="otherName">Other name (optional)</label>
                {getFieldDecorator('otherName', {
                  rules: [
                    {
                      required: false,
                      message: 'Please input your other name!'
                    }
                  ],
                  initialValue: user.otherName || ''
                })(<Input size="large" type="text" placeholder="Doe" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="email">Email address</label>
                {getFieldDecorator('email', {
                  rules: [
                    { required: true, message: 'Please input your email!' }
                  ],
                  initialValue: user.email
                })(<Input size="large" type="email" placeholder="Email" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4 ">
              <label className="mb-1" htmlFor="Phone number">
                Phone number
              </label>
              {
                getFieldDecorator('phoneNumber', {
                  rules: [{ required: false, message: 'Please input your phone number' }],
                  initialValue: user.phoneNumber || '',
                })(
                  <PhoneInput
                    placeholder="Enter phone number"
                    error={
                      getFieldValue('phoneNumber') &&
                      !isValidPhoneNumber(getFieldValue('phoneNumber')) &&
                      'The provided phone number is invalid'
                    }
                  />
                )
              }
            </div>
            {
              userIsStudent(user) && (
                <div className="col-md-6 mt-3">
                  <Form.Item>
                    <label htmlFor="title">Job Title</label>
                    {getFieldDecorator('title', {
                      rules: [
                        { required: false, message: 'Please input your job title!' }
                      ],
                      initialValue: user.title
                    })(<Input size="large" type="text" placeholder="Network Administrator" />)}
                  </Form.Item>
                </div>
              )
            }

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  loading={this.state.isUpdatingProfile}
                  disabled={this.state.isUpdatingProfile}
                  style={{ width: '140px', height: '42px' }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4"
                >
                  Update profile
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

PersonalDetailsForm.propTypes = {
  user: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
}

const WrappedPersonalDetailsForm = Form.create({
  name: 'personal details form'
})(PersonalDetailsForm)

const mapStateToProps = state => {
  return {
    user: getUserDetails(state)
  }
}

export default connect(
  mapStateToProps,
  { updateUserDetails: actions.updateUserDetails }
)(WrappedPersonalDetailsForm)
