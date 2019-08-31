import { Form, Icon, Input, Button, Checkbox } from 'antd';
import ReactPhoneInput from 'react-phone-input-2'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-phone-input-2/dist/style.css'

const { TextArea } = Input;

class PersonalDetailsForm extends Component {
  state = {
    phone: ''
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-12 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">

          <div className="row">

            <div className="col-md-6 mt-3">
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

            <div className="col-md-6 mt-3">
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

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="email">Other name (optional)</label>
                {getFieldDecorator('other_name', {
                  rules: [{ required: true, message: 'Please input your other name!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="Doe"
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
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

            <div className="col-md-6 mt-4 ">
              <label className="mb-1" htmlFor="Phone number">Phone number</label>
              <ReactPhoneInput
                className="has-full-width"
                defaultCountry="ng"
                value={this.state.phone}
              />
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  style={{ width: '140px', height: '42px' }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4">
                  Update profile
                </Button>
              </Form.Item>
            </div>

          </div>



        </Form>
      </div>
    );
  }
}

PersonalDetailsForm.propTypes = {

};

const WrappedPersonalDetailsForm = Form.create({ name: 'register_form' })(PersonalDetailsForm);

export default WrappedPersonalDetailsForm;