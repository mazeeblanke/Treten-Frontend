import React from 'react'
import {
  Form,
  Button,
  Input,
  Select
} from 'antd'
import dynamic from 'next/dynamic'
// import 'react-quill/dist/quill.snow.css'
import PropTypes from 'prop-types'
const { Option } = Select
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

class EmailForm extends React.Component {
  render () {
    const { form, handleSubmit, setEmailForm, emailForm } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={handleSubmit} className="email-form">
        <div className="row">
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="course">
                <b>Send email to</b>
              </label>
              {getFieldDecorator('course', {
                rules: [{ required: true, message: 'Please select a user group' }],
              })(
                <Select onChange={(e) => { setEmailForm({ name: 'course', value: e }) }} size="large" placeholder="Select user group" className="has-full-width">
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
                initialValue: emailForm.title
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  placeholder="e.g. Updates on study timetable"
                  onChange={(e) => { setEmailForm({ name: 'title', value: e.target.value }) }}
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
                  !emailForm.file
                    ? (
                      <img alt="attachment" src="/images/add-attachment-to-msg.png" />
                    )
                    : (
                      <div className="text-center">
                        <div className="d-flex justify-content-center align-items-center">
                          <p className="m-0 p-0">{emailForm.file.name}</p>
                        </div>
                        <small onClick={(e) => setEmailForm({ name: 'file', value: e[0] })} style={{ color: '#e12828' }}>remove file</small>
                      </div>
                    )
                }
              </div>
              <ReactQuill
                placeholder="Start typing message"
                onChange={() => { }}
                height={300}
              />
            </Form.Item>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <Form.Item className="is-full-width d-flex justify-content-center">
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
    )
  }
}

const WrappedEmailForm = Form.create({ name: 'enroll_register_form' })(EmailForm)

EmailForm.propTypes = {
  emailForm: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  setEmailForm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default WrappedEmailForm
