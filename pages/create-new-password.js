import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button, Input, Form } from 'antd';
import withAuthLayout from './layouts/withAuthLayout';

const { TabPane } = Tabs;

class PasswordReset extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="auth has-grey-bg has-min-full-vh pb-5">
        <div className="container pt-5 has-full-height">
          <div className="row justify-content-center has-full-height">
            <div className="col-md-5 auth__wrapper">
              <div className="auth__container">
                <Tabs className="has-full-height resetpassword " type="card">
                  <TabPane className="has-full-height pr-7 pl-7" tab="Reset password" key="register">
                    <p className="register__sub-text text-center mt-3">
                      Create a new password for your account
                    </p>


                    <Form onSubmit={this.handleSubmit} className="login-form">
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

                      <Form.Item className="is-full-width">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="auth__btn">
                          Create new password
                        </Button>
                      </Form.Item>
                    </Form>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PasswordReset.propTypes = {

};

const WrappedPasswordResetForm = Form.create({ name: 'login' })(PasswordReset);

export default withAuthLayout(WrappedPasswordResetForm);