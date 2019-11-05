import { Form, Icon, Input, Button, Checkbox } from "antd";
import ReactPhoneInput from "react-phone-input-2";
import React, { Component } from "react";
import PropTypes from "prop-types";
import "react-phone-input-2/dist/style.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { getUser } from "../../store";
import { getUserDetails } from "../../store/reducers/user";
const { TextArea } = Input;
import notifier from "simple-react-notifications";

class PersonalDetailsForm extends Component {
  state = {
    phone: "",
    isUpdatingProfile: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      isUpdatingProfile: true
    });

    this.props.form.validateFields((err, form) => {
      if (!err) {
        // user
        this.props
          .updateUserDetails(form)
          .then(res => {
            notifier.success("Your profile has been updated");
            console.log("Your profile has been updated");
            this.setState({
              isUpdatingProfile: false
            });
            //show snackbar
            return;
          })
          .catch(err => {
            // console.log(err.response.data);
            let errors = err.response.data.errors || {};
            // message.error( err.response.data.errors.email instanceof Array ?  err.response.data.errors.email[0] : err.response.data.errors.email , 25);
            this.setState({
              isUpdatingProfile: false
            });

            this.props.form.setFields({
              first_name: {
                errors: errors.first_name
                  ? [new Error(errors.first_name[0])]
                  : []
              },
              last_name: {
                errors: errors.last_name ? [new Error(errors.last_name[0])] : []
              },
              other_name: {
                errors: errors.other_name
                  ? [new Error(errors.other_name[0])]
                  : []
              },
              email: {
                errors: errors.email ? [new Error(errors.email[0])] : []
              },
              phone_number: {
                errors: errors.phone_number
                  ? [new Error(errors.phone_number[0])]
                  : []
              }
            });

            notifier.error("ERROR! Your profile could not be updated");
          });
      } else {
        this.setState({
          isUpdatingProfile: false
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-12 personaldetails-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <div className="row">
            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="first_name">First name</label>
                {getFieldDecorator("first_name", {
                  rules: [
                    { required: true, message: "Please input your first name!" }
                  ],
                  initialValue: this.props.user.first_name
                })(<Input size="large" type="text" placeholder="Jonathan" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="last_name">Last name</label>
                {getFieldDecorator("last_name", {
                  rules: [
                    { required: true, message: "Please input your last name!" }
                  ],
                  initialValue: this.props.user.last_name
                })(<Input size="large" type="text" placeholder="Doe" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="other_name">Other name (optional)</label>
                {getFieldDecorator("other_name", {
                  rules: [
                    {
                      required: false,
                      message: "Please input your other name!"
                    }
                  ],
                  initialValue: this.props.user.other_name
                })(<Input size="large" type="text" placeholder="Doe" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Form.Item>
                <label htmlFor="email">Email address</label>
                {getFieldDecorator("email", {
                  rules: [
                    { required: true, message: "Please input your email!" }
                  ],
                  initialValue: this.props.user.email
                })(<Input size="large" type="email" placeholder="Email" />)}
              </Form.Item>
            </div>

            <div className="col-md-6 mt-4 ">
              <label className="mb-1" htmlFor="Phone number">
                Phone number
              </label>
              {getFieldDecorator("phone_number", {
                rules: [
                  {
                    required: false,
                    message: "Please input your phone number!"
                  }
                ],
                initialValue: this.props.user.phone_number || ""
              })(
                <ReactPhoneInput
                  className="has-full-width"
                  defaultCountry="ng"
                />
              )}
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  loading={this.state.isUpdatingProfile}
                  disabled={this.state.isUpdatingProfile}
                  style={{ width: "140px", height: "42px" }}
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
    );
  }
}

PersonalDetailsForm.propTypes = {};

const WrappedPersonalDetailsForm = Form.create({
  name: "personal_details_form"
})(PersonalDetailsForm);

const mapStateToProps = state => {
  return {
    user: getUserDetails(state)
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(WrappedPersonalDetailsForm);
