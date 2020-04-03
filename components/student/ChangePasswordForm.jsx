import { Form, Input, Button } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserDetails } from '../../store/reducers/user'
import * as actions from '../../store/actions'
import notifier from 'simple-react-notifier'
import 'simple-react-notifier/dist/index.css'

class ChangePasswordForm extends Component {
  state = {
    isUpdatingPassword: false
  };

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, form) => {
      if (!err) {
        this.setState({
          isUpdatingPassword: true
        })
        this.props
          .updateUserDetails(form)
          .then(res => {
            this.setState({
              isUpdatingPassword: false
            })
            this.props.form.resetFields()

            // show snackbar
            notifier.success('Your password has been updated')
          })
          .catch((err) => {
            // message.error( err.response.data.errors.email instanceof Array ?  err.response.data.errors.email[0] : err.response.data.errors.email , 25);
            const errors = err.response.data.errors || {}
            this.props.form.setFields({
              oldPassword: {
                errors: errors.oldPassword ? [new Error(errors.oldPassword[0])] : [],
              },
              password: {
                errors: errors.password ? [new Error(errors.password[0])] : [],
              },
            })
            this.setState({
              isUpdatingPassword: false
            })
            notifier.error('ERROR! Your password could not be updated')
          })
      } else {
        this.setState({
          isUpdatingPassword: false
        })
      }
    })
  };

  render () {
    const { form, user } = this.props
    const { getFieldDecorator } = form
    const { isUpdatingPassword } = this.state
    return (
      <div className="col-md-12 col-lg-12 col-xl-6 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <div className="row">
            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="oldPassword">Current password</label>
                {getFieldDecorator('oldPassword', {
                  rules: [{ required: true }]
                })(
                  <Input.Password
                    type="password"
                    placeholder="Enter your current password"
                    onChange={e =>
                      form.setFieldsValue({
                        oldPassword: e.target.value
                      })
                    }
                    disabled={!!user.providerId}
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">New password</label>
                {getFieldDecorator('password', {
                  rules: [{ required: true, min: 8 }]
                })(
                  <Input.Password
                    type="password"
                    placeholder="Enter your password"
                    onChange={e =>
                      form.setFieldsValue({
                        password: e.target.value
                      })
                    }
                    disabled={!!user.providerId}
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">New password confirmation</label>
                {getFieldDecorator('passwordConfirmation', {
                  rules: [
                    {
                      required: true,
                      message:
                        'Please enter your new password confirmation! Passwords must be same',
                      min: 8,
                      validator: (rule, value, cb) =>
                        value === form.getFieldValue('password')
                          ? cb()
                          : cb(value)
                      // : cb(true)
                    }
                  ]
                })(
                  <Input.Password
                    type="password"
                    placeholder="Confirm new password"
                    disabled={!!user.providerId}
                    onChange={e =>
                      form.setFieldsValue({
                        passwordConfirmation: e.target.value
                      })
                    }
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  disabled={!!user.providerId}
                  style={{ width: '180px', height: '42px' }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4"
                  loading={isUpdatingPassword}
                >
                  Change password
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

ChangePasswordForm.propTypes = {
  user: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  updateUserDetails: PropTypes.func.isRequired,
}

const WrappedChangePasswordForm = Form.create({ name: 'change password form' })(
  ChangePasswordForm
)

const mapStateToProps = state => {
  return {
    user: getUserDetails(state)
  }
}

export default connect(
  mapStateToProps,
  {
    updateUserDetails: actions.updateUserDetails
  }
)(WrappedChangePasswordForm)
