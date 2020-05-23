import { Form, Button, Input, Select } from 'antd'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import React from 'react'
const { Option } = Select

class ResourcesForm extends React.Component {
  render () {
    const {
      // form,
      courseOptions,
      handleSubmit,
      setResourcesForm,
      searchCourses,
      resourcesForm
    } = this.props
    // const { getFieldDecorator } = form
    return (
      <Form onSubmit={handleSubmit} className="batch-form">
        <div className="row">
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="course">
                <b>Select course</b>
              </label>
              {/* {getFieldDecorator('course', {
                rules: [{ required: true, message: 'Please select a course' }]
              })( */}
              <Select
                allowClear
                size="large"
                showSearch
                placeholder="Select course"
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                value={resourcesForm.courseId}
                onSearch={searchCourses}
                onChange={e => {
                  setResourcesForm({ name: 'courseId', value: e })
                }}
                notFoundContent="No match"
              >
                <Option value={null} selected disabled>Select course</Option>
                {
                  courseOptions.map((option) => (
                    <Option key={option.id} value={option.id}>{option.title}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </div>
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="title">
                <b>Select title</b>
              </label>
              {/* {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please enter title' }],
                initialValue: resourcesForm.title
              })( */}
              <Input
                allowClear
                size="large"
                type="text"
                value={resourcesForm.title}
                placeholder="Enter resource title"
                onChange={e => {
                  setResourcesForm({
                    name: 'title',
                    value: e.target.value
                  })
                }}
              />
              {/* )} */}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-6 mt-1">
            {!resourcesForm.file ? (
              <Dropzone
                accept="application/pdf"
                onDropAccepted={e =>
                  setResourcesForm({ name: 'file', value: e[0] })
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input accept=".pdf" {...getInputProps()} />
                    <img alt="upload" src="/images/cloud.png" />
                    <p className="text-center mt-2">
                      Click to upload file or drag in from computer
                    </p>
                    <em>(Only *.pdf files will be accepted)</em>
                  </div>
                )}
              </Dropzone>
            ) : (
              <div className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  {resourcesForm.file.type === 'application/pdf' ? (
                    <img
                      alt={resourcesForm.file.name}
                      style={{ height: '75px' }}
                      className="mr-3"
                      src="/images/file_des.svg"
                    />
                  ) : (
                    <img
                      alt={resourcesForm.file.name}
                      style={{ height: '75px' }}
                      className="mr-3"
                      src="/images/file.svg"
                    />
                  )}
                  <p className="m-0 p-0">
                    {resourcesForm.file.name}
                  </p>
                </div>
                <small
                  onClick={e =>
                    setResourcesForm({ name: 'file', value: e[0] })
                  }
                  style={{ color: '#e12828' }}
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
            <Button
              disabled={!resourcesForm.title || !resourcesForm.courseId || !resourcesForm.file}
              style={{ height: '42px', width: '140px' }}
              type="danger"
              htmlType="submit"
              loading={resourcesForm.isLoading}
            >
              Add new
            </Button>
          </Form.Item>
        </div>
      </Form>
    )
  }
}

ResourcesForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setResourcesForm: PropTypes.func.isRequired,
  resourcesForm: PropTypes.shape({
    file: PropTypes.object,
    courseId: PropTypes.number,
    title: PropTypes.string,
    isLoading: PropTypes.bool
  }).isRequired,
  form: PropTypes.object.isRequired,
  searchCourses: PropTypes.func.isRequired,
  courseOptions: PropTypes.array.isRequired,
}

const WrappedResourcesForm = Form.create({ name: 'resources form' })(
  ResourcesForm
)

export default WrappedResourcesForm

// export default ResourcesForm;
