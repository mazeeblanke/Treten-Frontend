import { Form, Input, Button, Checkbox } from 'antd';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChangePasswordForm extends Component {
  state = {
    phone: ''
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-12 col-lg-12 col-xl-6 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">

          <div className="row">

            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">
                  Current password
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

            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">
                  New password
                </label>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please enter your new Password!' }],
                })(
                  <Input.Password
                    type="password"
                    placeholder="Create new password"
                  />,
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  style={{ width: '140px', height: '42px' }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4">
                  Change password
                </Button>
              </Form.Item>
            </div>

          </div>



        </Form>
      </div>
    );
  }
}

ChangePasswordForm.propTypes = {

};

const WrappedChangePasswordForm = Form.create({ name: 'register_form' })(ChangePasswordForm);

export default WrappedChangePasswordForm;