import { Form, Icon, Input, Button, Checkbox } from 'antd';
import ReactPhoneInput from 'react-phone-input-2'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

const { TextArea } = Input;

class ContactUsForm extends Component {
  state = {
    phone: ''
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
                })(
                  <Input
                    size="large"
                    type="email"
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
                })(
                  <Input
                    size="large"
                    type="email"
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
                })(
                  <Input
                    size="large"
                    type="email"
                    placeholder="Email"
                  />,
                )}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-1 ">
              <label className="mb-1" htmlFor="Phone number">Phone number</label>
              <ReactPhoneInput
                className="has-full-width"
                defaultCountry="ng"
                value={this.state.phone}
              />
            </div>

            <div className="col-md-12">
              <Form.Item>
                <label >What’s your message?</label>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input your email!' }],
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

export default WrappedContactUsForm;