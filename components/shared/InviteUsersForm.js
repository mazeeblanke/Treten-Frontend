import React from 'react';
import { Form, Button, Input } from 'antd';
import PropTypes from 'prop-types';

class InviteUsersForm extends React.Component {


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="add-new-form">

        <div className="row" style={{  minHeight: '100px', maxHeight: '300px', overflowY: 'scroll' }}>
          <div className="col-md-12 mb-1">
            {
              this.props.form.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  <Form.Item >
                    <label htmlFor="email">
                      <b>Email address</b>
                    </label>
                    {/* {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Please enter title' }],
                      initialValue: entry.email
                    })( */}
                      <Input
                        allowClear
                        size="large"
                        type="text"
                        value={entry.email}
                        placeholder="Enter email address"
                        onChange={(e) => {this.props.setForm({ email: e.target.value }, entryIndex)}}
                      />
                    {/* )} */}
                  </Form.Item>
                </div>
              ))
            }

          </div>

        </div>

        <div onClick={() => { this.props.add() }} className="d-flex align-items-center has-pointer-cursor mt-3 mb-4">
          <img className="mr-2" src="/static/images/plus.png" />
          <p className="m-0 ">
            <b>Add another {this.props.activeTab}</b>
          </p>
        </div>


        <div className="col-md-12 mb-3">
          <Form.Item className="is-full-width d-flex justify-content-center">
            {/* {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
            <Button
              style={{ height: '42px', width: '140px' }}
              type="danger"
              htmlType="submit"
            >
              Invite
            </Button>
          </Form.Item>
        </div>

      </Form>
    );
  }
}

const WrappedInviteUsersForm = Form.create({ name: 'invite_users_form' })(InviteUsersForm);

export default WrappedInviteUsersForm;

