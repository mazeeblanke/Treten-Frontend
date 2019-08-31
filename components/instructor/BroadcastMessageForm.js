import React from 'react';
import { Form, Button, Input, DatePicker, Select  } from 'antd';
const { Option } = Select;
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const uuidv1 = require('uuid/v1');
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});
import  Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';

class BroadcastMessageForm extends React.Component {

  state = {

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="email-form">

        <div className="row">
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="course">
                <b>Send email to</b>
              </label>
              {getFieldDecorator('course', {
                rules: [{ required: true, message: 'Please select a user group' }],

              })(
                <Select onChange={(e) => {this.props.setBroadcastMessageForm({ name: 'course', value: e})}} size="large" placeholder="Select user group" className="has-full-width">
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              )}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="title">
                <b>Subject or title</b>
              </label>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter title' }],
                initialValue: this.props.broadcastMessageForm.title
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  placeholder="e.g. Updates on study timetable"
                  onChange={(e) => {this.props.setBroadcastMessageForm({ name: 'title', value: e.target.value })}}
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-6 mt-1">
            <Form.Item>
              <label className="m-0 p-0" htmlFor="bio">
                <b>Message</b>
              </label>
              <div className="mb-1">
                {
                  !this.props.broadcastMessageForm.file
                    ? (
                      <img src="/static/images/add-attachment-to-msg.png" />
                    )
                    : (
                      <div className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <p className="m-0 p-0">{this.props.broadcastMessageForm.file.name}</p>
                        </div>
                        <small onClick={(e) => this.props.setBroadcastMessageForm({ name: 'file', value: e[0] })} style={{ color: '#e12828' }}>remove file</small>
                      </div>
                    )
                }
              </div>
              <ReactQuill
                placeholder="Start typing message"
                onChange={() => {}}
                height={300}
              />
            </Form.Item>
          </div>

        </div>


        <div className="col-md-12 mb-3">
        {/* Add new */}
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
              Send Email
            </Button>
          </Form.Item>
        </div>

      </Form>
    );
  }
}

const WrappedBroadcastMessageForm = Form.create({ name: 'enroll_register_form' })(BroadcastMessageForm);

export default WrappedBroadcastMessageForm;

// export default BroadcastMessageForm;
