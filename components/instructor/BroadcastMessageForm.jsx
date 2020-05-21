import React from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { Form, Button, Input, Select } from 'antd'
import notifier from 'simple-react-notifier'
const { Option } = Select
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

class BroadcastMessageForm extends React.Component {
  state = {
    userGroupsOptions: [],
    isSubmitting: false,
    broadcastMessageForm: {
      userGroupId: null,
      title: null,
      message: ''
    },
  }

  searchUserGroups = (q) => {
    this.props.fetchUserGroups({
      q
    }).then((res) => {
      this.setState({
        userGroupsOptions: res.data
      })
    })
  }

  submit = () => {
    const {
      getFieldError
    } = this.props.form
    const {
      broadcastMessageForm: { message, title, userGroupId }
    } = this.state
    if (
      !message ||
      !getFieldError('title') ||
      !getFieldError('userGroupId')
    ) {
      this.setState({
        isSubmitting: true
      })
      this.props.sendBroadcast({
        message,
        title,
        userGroupId
      }).then((res) => {
        notifier.success(res.message)
        this.setState({
          broadcastMessageForm: {
            userGroupId: null,
            title: null,
            message: ''
          }
        })
        this.props.closeFormModal()
      }).catch((err) => {
        notifier.error(`ERROR! ${err.response.data.message}`)
      }).finally(() => {
        this.setState({
          isSubmitting: false
        })
      })
    }
  }

  setBroadcastMessageForm = ({ name, value }) => {
    this.setState({
      broadcastMessageForm: {
        ...this.state.broadcastMessageForm,
        [name]: value
      }
    })
  }

  render () {
    const {
      getFieldDecorator,
      getFieldError
    } = this.props.form
    const {
      form,
    } = this.props
    const {
      broadcastMessageForm: { message }
    } = this.state
    return (
      <Form onSubmit={this.props.handleSubmit} className="email-form">

        <div className="row">
          <div className="col-md-12 mb-1">
            <Form.Item>
              <label htmlFor="course">
                <b>Send broadcast to</b>
              </label>
              {getFieldDecorator('userGroupId', {
                rules: [{ required: true, message: 'Please select a user group' }],
              })(
                <Select
                  showSearch
                  allowClear
                  onChange={e => {
                    this.setBroadcastMessageForm({
                      name: 'userGroupId',
                      value: e
                    })
                  }}
                  size="large"
                  showArrow={true}
                  filterOption={false}
                  notFoundContent="No match"
                  onSearch={this.searchUserGroups}
                  className="has-full-width"
                  defaultActiveFirstOption={false}
                  placeholder={'Select user group'}
                >
                  <Option disabled value={null}>Select a user group</Option>
                  {
                    this.state.userGroupsOptions.map((option) => (
                      <Option key={option.id} value={option.id}>{option.groupName}</Option>
                    ))
                  }
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
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  placeholder="e.g. Updates on study timetable"
                  onChange={
                    (e) => this.setBroadcastMessageForm({
                      name: 'title',
                      value: e.target.value
                    })
                  }
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-12 mb-6 mt-1">
            <Form.Item>
              <label className="m-0 p-0" htmlFor="bio">
                <b>Message</b>
              </label>
              {/* <div className="mb-1">
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
              </div> */}
              <ReactQuill
                placeholder="Start typing message"
                onChange={e => {
                  this.setBroadcastMessageForm({
                    name: 'message',
                    value: e
                  })
                }}
                value={message}
                height={300}
              />
            </Form.Item>
          </div>

        </div>

        <div className="col-md-12 mb-3">
          {/* Add new */}
          <Form.Item className="is-full-width d-flex justify-content-center">
            <Button
              style={{ height: '42px', width: '140px' }}
              type="danger"
              disabled={
                !this.state.broadcastMessageForm.message ||
                getFieldError('title') ||
                getFieldError('userGroupId')
              }
              loading={this.state.isSubmitting}
              onClick={this.submit}
            >
              Send Broadcast
            </Button>
          </Form.Item>
        </div>

      </Form>
    )
  }
}

const WrappedBroadcastMessageForm = Form.create({
  name: 'broadcast form'
})(BroadcastMessageForm)

BroadcastMessageForm.propTypes = {
  setBroadcastMessageForm: PropTypes.func.isRequired,
  broadcastMessageForm: PropTypes.object.isRequired,
  fetchUserGroups: PropTypes.func.isRequired,
  closeFormModal: PropTypes.func.isRequired,
  sendBroadcast: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
}

export default WrappedBroadcastMessageForm
