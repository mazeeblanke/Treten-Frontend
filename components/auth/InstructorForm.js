import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import ReactPhoneInput from 'react-phone-input-2';
import axios from 'axios';
import * as actions from '../../store/actions/index';
import 'react-phone-input-2/dist/style.css';
import { connect } from 'react-redux';

const { TextArea } = Input;

class InstructorForm extends React.Component {

  state = {
    isLoading: false,
    errors: []
  }

  mounted () {
    this.props.setInstructorRegistrationRequest(false);
    message.config({
      maxCount: 1,
    });
  }

  handleSubmit = e => {
    
    e.preventDefault();
    this.props.form.validateFields((err, form) => {
      if (!err) {
        console.log('Received values of form: ', form);

        this.setState({
          isLoading: true
        });

        axios.post('t/api/become-an-instructor', { as: 'instructor', ...form }).then((res) => {
            console.log(res.data)
            this.setState({
                isLoading: false
            });
            this.props.setInstructorRegistrationRequest(true);
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
              password: {
                errors: errors.password ? [new Error(errors.password[0])] : [],
              },
            });

            this.props.setInstructorRegistrationRequest(false);
        })

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}  className="instructor-form pb-5">

        <Form.Item>
          <label className="fw-600" htmlFor="first_name">First name</label>
          {getFieldDecorator('first_name', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your first name!' }],
          })(
            <Input
              size="large"
              type="text"
              placeholder="Jonathan"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <label className="fw-600" htmlFor="last_name">Last name</label>
          {getFieldDecorator('last_name', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your last name!' }],
          })(
            <Input
              size="large"
              type="text"
              placeholder="Doe"
            />
          )}
        </Form.Item>

        <Form.Item>
          <label className="fw-600" htmlFor="other_name">Other name (optional)</label>
          {
            getFieldDecorator('other_name', {
              initialValue: '',
              rules: [{ required: false}]
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
          <label className="fw-600" htmlFor="qualifications">Qualifications</label>
            {
              getFieldDecorator('qualifications', {
                initialValue: '',
                rules: [{ required: true, message: 'Please input your qualifications' }]
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
          <label className="fw-600" htmlFor="reasons_for_joining">Why are you a good fit for Treten Academy?</label>
          {
            getFieldDecorator('consideration', {
              initialValue: '',
              rules: [{ required: true, message: 'Please input the details about why you will like to be an instructor'}]
            })(
              <TextArea rows={4} placeholder="Go into details about why you will like to be an instructor" />
            )
          }
        </Form.Item>

        <Form.Item className="mt-3">
          <label htmlFor="email">Email address</label>
          {getFieldDecorator('email', {
            initialValue: '',
            rules: [{ required: true, message: 'Please input your email!' }],
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
              rules: [{ required: true, message: 'Please input your phone number'}]
            })(
              <ReactPhoneInput
                className="has-full-width"
                style={{width: '100%'}}
                defaultCountry="ng"
              />
            )
          }
        </Form.Item>

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

        <Form.Item className="is-full-width mt-23">
          <Button
            disabled={this.state.isLoading}
            loading={this.state.isLoading}
            type="primary"
            htmlType="submit"
            className="auth__btn">
            Submit
          </Button>
        </Form.Item>

      </Form>
    );
  }
}

const WrappedInstructorForm = Form.create({ name: 'register_form', onFieldsChange: (e, f, g) => console.log(g)  })(InstructorForm);

export default connect(null, { ...actions })(WrappedInstructorForm);