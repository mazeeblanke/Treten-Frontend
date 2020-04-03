import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
// import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
// import 'react-phone-input-2/dist/style.css'
// import ReactPhoneInput from 'react-phone-input-2'
import notifier from 'simple-react-notifier'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber, convertToFormData } from '../../lib/helpers'
// import * as actions from '../../store/actions/index'

const { TextArea } = Input
const Recaptcha = require('react-gcaptcha')
const { captchaKey } = require('../../lib/config')

class InstructorForm extends React.Component {
  state = {
    isLoading: false,
    errors: [],
    file: null,
    captchaToken: null
  }

  setRecaptcha = (token) => {
    this.setState({
      captchaToken: token
    })
  }

  clearRecaptcha = () => {
    this.setState({
      captchaToken: null
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      file
    } = this.state
    const {
      validateFields,
      getFieldValue
    } = this.props.form
    validateFields((err, form) => {
      if (
        !err &&
        isValidPhoneNumber(getFieldValue('phone_number')) &&
        this.state.captchaToken
      ) {
        this.setState({
          isLoading: true
        })
        const payload = convertToFormData({
          ...form,
          file
        })
        axios.post('t/api/become-an-instructor', payload)
          .then((res) => {
            this.setState({
              isLoading: false
            })
            this.props.onSuccessfullSubmittion()
          }).catch((err) => {
            notifier.error('ERROR! The Form contains some errors')
            const errors = err.response.data.errors || {}
            this.setState({
              isLoading: false,
            })

            this.props.form.setFields({
              email: {
                errors: errors.email
                  ? [new Error(errors.email[0])]
                  : [],
              },
            })
          })
      }
    })
  };

  render () {
    const {
      getFieldDecorator,
      setFieldsValue,
      getFieldValue
    } = this.props.form
    const {
      file
    } = this.state
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="instructor-form pb-5"
      >
        <Form.Item>
          <label className="fw-600" htmlFor="first_name">
            First name
          </label>
          {getFieldDecorator('first_name', {
            initialValue: '',
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
        <Form.Item>
          <label className="fw-600" htmlFor="last_name">
            Last name
          </label>
          {getFieldDecorator('last_name', {
            initialValue: '',
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
        <Form.Item>
          <label className="fw-600" htmlFor="other_name">
            Other name (optional)
          </label>
          {
            getFieldDecorator('other_name', {
              initialValue: '',
              rules: [{ required: false }]
            })(
              <Input
                size="large"
                type="text"
                placeholder="Adamu"
              />
            )
          }
        </Form.Item>
        <Form.Item>
          <label className="fw-600" htmlFor="qualifications">
            Qualifications
          </label>
          {
            getFieldDecorator('qualifications', {
              initialValue: '',
              rules: [{
                required: true,
                message: 'Please input your qualifications'
              }]
            })(
              <Input
                size="large"
                type="text"
                placeholder="Enter the qualifications you possess"
              />
            )
          }
        </Form.Item>
        <Form.Item>
          <label className="fw-600" htmlFor="reasons_for_joining">
            Why are you a good fit for Treten Academy?
          </label>
          {
            getFieldDecorator('consideration', {
              initialValue: '',
              rules: [{
                required: true,
                message: 'Please input the details about why you will like to be an instructor'
              }]
            })(
              <TextArea
                rows={4}
                placeholder="Go into details about why you will like to be an instructor"
              />
            )
          }
        </Form.Item>
        <Form.Item className="mt-3">
          <label htmlFor="email">Email address</label>
          {getFieldDecorator('email', {
            initialValue: '',
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
              placeholder="Email"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <label htmlFor="Phone number">Phone number</label>
          {
            getFieldDecorator('phone_number', {
              initialValue: '',
              rules: [{ required: true, message: 'Please input your phone number' }]
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
              //   style={{ width: '100%' }}
              //   defaultCountry="ng"
              // />
            )
          }
        </Form.Item>
        <Form.Item>
          {!file ? (
            <Dropzone
              accept="application/pdf"
              onDropAccepted={e =>
                this.setState({ file: e[0] })
              }
            >
              {({ getRootProps, getInputProps }) => (
                <div style={{
                  height: '150px'
                }} {...getRootProps({ className: 'dropzone' })}>
                  <input accept=".pdf" {...getInputProps()} />
                  <img src="/static/images/cloud.png" />
                  <p className="text-center mt-2">
                    Click to upload file or drag in from computer
                  </p>
                  <em>(Only *.pdf files will be accepted)</em>
                </div>
              )}
            </Dropzone>
          ) : (
              <div className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  {file.type === 'application/pdf' ? (
                    <img
                      style={{ height: '75px' }}
                      className="mr-3"
                      src="/static/images/file_des.svg"
                    />
                  ) : (
                      <img
                        style={{ height: '75px' }}
                        className="mr-3"
                        src="/static/images/file.svg"
                      />
                    )}
                  <p className="m-0 p-0">
                    {file.name}
                  </p>
                </div>
                <small
                  onClick={e =>
                    this.setState({ file: e[0] })
                  }
                  style={{ color: '#e12828' }}
                >
                  remove file
              </small>
              </div>
            )}
        </Form.Item>
        <Recaptcha
          sitekey={captchaKey}
          verifyCallback={this.setRecaptcha}
          expiredCallback={this.clearRecaptcha}
        />
        <br></br>
        <Form.Item className="is-full-width mt-23">
          <Button
            disabled={
              this.state.isLoading ||
              !this.state.captchaToken
            }
            loading={this.state.isLoading}
            type="primary"
            htmlType="submit"
            className="auth__btn">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

InstructorForm.propTypes = {
  form: PropTypes.object.isRequired,
  onSuccessfullSubmittion: PropTypes.func.isRequired,
}

const WrappedInstructorForm = Form.create({
  name: 'instructor form'
})(InstructorForm)

export default WrappedInstructorForm
