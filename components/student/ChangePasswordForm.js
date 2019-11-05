import { Form, Input, Button, Checkbox } from "antd";
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
import { getUserDetails } from "../../store/reducers/user";
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";

class ChangePasswordForm extends Component {
  state = {
    isUpdatingPassword: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isUpdatingPassword: true
    });

    this.props.form.validateFields((err, form) => {
      if (!err) {
        // user
        this.props
          .updateUserDetails(form)
          .then(res => {
            this.setState({
              isUpdatingPassword: false
            });
            this.props.form.resetFields();

            //show snackbar
            notifier.success("Your password has been updated");
            return;
          })
          .catch(err => {
            // message.error( err.response.data.errors.email instanceof Array ?  err.response.data.errors.email[0] : err.response.data.errors.email , 25);
            this.setState({
              isUpdatingPassword: false
            });
            notifier.error("ERROR! Your password could not be updated");
          });
      } else {
        this.setState({
          isUpdatingPassword: false
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-12 col-lg-12 col-xl-6 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <div className="row">
            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">Current password</label>
                {getFieldDecorator("password", {
                  rules: [{ required: true, min: 8 }]
                })(
                  <Input.Password
                    type="password"
                    placeholder="Enter your password"
                    onChange={e =>
                      this.props.form.setFieldsValue({
                        password: e.target.value
                      })
                    }
                    disabled={this.props.user.provider_id}
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="password">New password</label>
                {getFieldDecorator("password_confirmation", {
                  rules: [
                    {
                      required: true,
                      message:
                        "Please enter your new password confirmation! Passwords must be same",
                      min: 8,
                      validator: (rule, value, cb) =>
                        value === this.props.form.getFieldValue("password")
                          ? cb()
                          : cb(true)
                    }
                  ]
                })(
                  <Input.Password
                    type="password"
                    placeholder="Confirm new password"
                    disabled={this.props.user.provider_id}
                    onChange={e =>
                      this.props.form.setFieldsValue({
                        password_confirmation: e.target.value
                      })
                    }
                  />
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  disabled={this.props.user.provider_id}
                  style={{ width: "180px", height: "42px" }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4"
                  loading={this.state.isUpdatingPassword}
                >
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

ChangePasswordForm.propTypes = {};

const WrappedChangePasswordForm = Form.create({ name: "register_form" })(
  ChangePasswordForm
);

const mapStateToProps = state => {
  return {
    user: getUserDetails(state)
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(WrappedChangePasswordForm);
