import { Form, Button, Input, Select } from "antd";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
const { Option } = Select;
import React from "react";

class ResourcesForm extends React.Component {
  state = {};

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="batch-form">
        <div className="row">
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="course">
                <b>Select course</b>
              </label>
              {getFieldDecorator("course", {
                rules: [{ required: true, message: "Please select a course" }]
              })(
                <Select
                  onChange={e => {
                    this.props.setResourcesForm({ name: "course", value: e });
                  }}
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
              )}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="title">
                <b>Select title</b>
              </label>
              {getFieldDecorator("title", {
                rules: [{ required: true, message: "Please enter title" }],
                initialValue: this.props.resourcesForm.title
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  placeholder="Enter resource title"
                  onChange={e => {
                    this.props.setResourcesForm({
                      name: "title",
                      value: e.target.value
                    });
                  }}
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-6 mt-1">
            {!this.props.resourcesForm.file ? (
              <Dropzone
                onDropAccepted={e =>
                  this.props.setResourcesForm({ name: "file", value: e[0] })
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <img src="/static/images/cloud.png" />
                    <p className="text-center mt-2">
                      Click to upload file or drag in from computer
                    </p>
                  </div>
                )}
              </Dropzone>
            ) : (
              <div className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  {this.props.resourcesForm.file.type === "application/pdf" ? (
                    <img
                      style={{ height: "75px" }}
                      className="mr-3"
                      src="/static/images/file_des.svg"
                    />
                  ) : (
                    <img
                      style={{ height: "75px" }}
                      className="mr-3"
                      src="/static/images/file.svg"
                    />
                  )}
                  <p className="m-0 p-0">
                    {this.props.resourcesForm.file.name}
                  </p>
                </div>
                <small
                  onClick={e =>
                    this.props.setResourcesForm({ name: "file", value: e[0] })
                  }
                  style={{ color: "#e12828" }}
                >
                  remove file
                </small>
              </div>
            )}
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
              style={{ height: "42px", width: "140px" }}
              type="danger"
              htmlType="submit"
            >
              Add new
            </Button>
          </Form.Item>
        </div>
      </Form>
    );
  }
}

const WrappedResourcesForm = Form.create({ name: "resources_form" })(
  ResourcesForm
);

export default WrappedResourcesForm;

// export default ResourcesForm;
