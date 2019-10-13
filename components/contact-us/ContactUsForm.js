import { Form, Icon, Input, Button, message } from 'antd';
import ReactPhoneInput from 'react-phone-input-2'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from "react-redux";

const { TextArea } = Input;

class ContactUsForm extends Component {
  state = {
    isLoading: false
  }

  mounted() {
    message.config({
      maxCount: 1,
    });
  }

  handleSubmit = (e) => {

    e.preventDefault();

    this.setState({
      isLoading: true
    })

    this.props.form.validateFields((err, form) => {
      if (!err) {
        console.log('Received values of form: ', form);

        axios.post('t/api/contactus', { ...form }).then((res) => {
          console.log(res.data)
          this.setState({
            isLoading: false
          });

          message.success(res.data.message, 21);

          this.props.form.resetFields();

        }).catch((err) => {
          message.error('The Form contains some errors', 21);

          let errors = err.response.data.errors || {};
          this.setState({
            isLoading: false,
          });

          this.props.form.setFields({
            email: {
              errors: errors.email ? [new Error(errors.email[0])] : [],
            },
          });
        })

      } else {
        this.setState({
          isLoading: false
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-7 contactus-form pr-6 pl-6 pb-2">
        <h5 className="text-center contact-us-form__main-text mt-5 mb-5">
          Let’s talk!
        </h5>
        <Form onSubmit={this.handleSubmit} className="login-form">

          <div className="row">

            <div className="col-md-6">
              <Form.Item>
                <label htmlFor="email">First name</label>
                {getFieldDecorator('first_name', {
                  rules: [{ required: true, message: 'Please input your first name!' }],
                  initialValue: this.props.user.first_name
                })(
                  <Input
                    disabled={!!this.props.user.first_name}
                    size="large"
                    type="text"
                    placeholder="Jonathan"
                  />,
                )}
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item>
                <label htmlFor="email">Last name</label>
                {getFieldDecorator('last_name', {
                  rules: [{ required: true, message: 'Please input your last name!' }],
                  initialValue: this.props.user.last_name
                })(
                  <Input
                    disabled={!!this.props.user.last_name}
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
                  rules: [{ required: true, message: 'Please input your email!' }],
                  initialValue: this.props.user.email
                })(
                  <Input
                    disabled={!!this.props.user.email}
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
                getFieldDecorator('phone_number', {
                  rules: [{ required: true, message: 'Please input your phone number'}],
                  initialValue: this.props.user.phone_number || ''
                })(
                  <ReactPhoneInput
                    className="has-full-width"
                    defaultCountry="ng"
                  />
                )
              }
            </div>

            <div className="col-md-12">
              <Form.Item>
                <label >What’s your message?</label>
                {getFieldDecorator('message', {
                  rules: [{ required: true, message: 'Please input your email!' }],
                  initialValue: this.props.user.message
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
    );
  }
}

ContactUsForm.propTypes = {

};

const WrappedContactUsForm = Form.create({ name: 'register_form' })(ContactUsForm);

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user
})


export default connect(mapStateToProps)(WrappedContactUsForm);