import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import PropTypes from 'prop-types';

const Option = Select.Option;

class AssignInstructorsForm extends React.Component {


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="add-new-form">
        <div className="row">
          <div className="col-md-12 mb-2">
            <Form.Item >
              <label htmlFor="course">
                <b>Select course</b>
              </label>
              {/* {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter title' }],
                initialValue: entry.email
              })( */}
                <Select
                  onChange={(e) => {this.props.setAssignInstructorForm(e, 'course')}}
                  size="large"
                  placeholder="Select course"
                  className="has-full-width"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
            <Form.Item >
              <label htmlFor="batch">
                <b>Select batch</b>
              </label>
              {/* {getFieldDecorator('email', {
                rules: [{ required: true, message: 'Please enter title' }],
                initialValue: entry.email
              })( */}
                <Select
                  onChange={(e) => {this.props.setAssignInstructorForm(e, 'batch')}}
                  size="large"
                  placeholder="Select batch"
                  className="has-full-width"
                >
                  <Option value="jack">Jack</Option>
                  <Option value="none">None</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              {/* )} */}
            </Form.Item>
          </div>

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
              Assign Instructor
            </Button>
          </Form.Item>
        </div>

      </Form>
    );
  }
}

const WrappedAssignInstructorsForm = Form.create({ name: 'assign_instructors_form' })(AssignInstructorsForm);

export default WrappedAssignInstructorsForm;

