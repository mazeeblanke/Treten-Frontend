import React from 'react'
import pluralize from 'pluralize'
import { Form, Button, Input } from 'antd'
import PropTypes from 'prop-types'
import Display from './Display'

class InviteUsersForm extends React.Component {
  render () {
    const {
      add,
      form,
      remove,
      errors,
      setForm,
      activeTab,
      isInviting,
      handleSubmit,
    } = this.props
    return (
      <Form onSubmit={handleSubmit} className="add-new-form">
        <div id="inviteUserFormWrapper" className="row" style={{
          minHeight: '100px',
          maxHeight: '200px',
          overflowY: 'scroll'
        }}>
          <div className="col-md-12 mb-1">
            {
              form.map((entry, entryIndex) => (
                <div key={entryIndex}>
                  <Form.Item
                    className={
                      errors[activeTab] && (errors[activeTab][entryIndex] || {}).email &&
                      'has-error'
                    }
                  >
                    <label htmlFor="email">
                      <b>Email address</b>
                    </label>
                    <div className="d-flex">
                      <Input
                        allowClear
                        size="large"
                        type="text"
                        value={entry.email}
                        placeholder="Enter email address"
                        onChange={(e) => {
                          setForm({
                            email: e.target.value
                          },
                          entryIndex
                          )
                        }}
                      />
                      <Display if={form.length > 1}>
                        <img  
                          alt="delete"
                          className="mt-2 ml-2 h20 has-pointer-cursor"
                          src="/images/close.png"
                          onClick={() => remove(entry)}
                        ></img>
                      </Display>
                    </div>
                    {errors[activeTab] && (errors[activeTab][entryIndex] || {}).email && (
                      <div className="ant-form-explain">
                        {errors[activeTab] && (errors[activeTab][entryIndex] || {}).email}
                        !
                      </div>
                    )}
                  </Form.Item>
                </div>
              ))
            }
          </div>
        </div>

        <div onClick={add} className={`
          d-flex align-items-center 
          has-pointer-cursor mt-3 mb-4`
        }>
          <img alt="add another" className="mr-2" src="/images/plus.png" />
          <p className="m-0 ">
            <b>Add another {pluralize.singular(activeTab)}</b>
          </p>
        </div>

        <div className="col-md-12 mb-3">
          <Form.Item className={`is-full-width d-flex 
            justify-content-center`
          }>
            <Button
              type="danger"
              htmlType="submit"
              loading={isInviting}
              disabled={isInviting}
              style={{ height: '42px', width: '140px' }}
            >
              Invite
            </Button>
          </Form.Item>
        </div>

      </Form>
    )
  }
}

InviteUsersForm.propTypes = {
  add: PropTypes.func.isRequired,
  form: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isInviting: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

const WrappedInviteUsersForm = Form.create({
  name: 'invite users form'
})(InviteUsersForm)

export default WrappedInviteUsersForm
