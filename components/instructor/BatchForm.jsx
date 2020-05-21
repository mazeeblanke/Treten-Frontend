import React from 'react'
import {
  Radio,
  Form,
  Input,
  DatePicker,
  TimePicker
} from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import {
  userIsInstructor,
  userIsAdmin
} from '../../store/reducers/user'
import Display from '../../components/shared/Display'

const InputGroup = Input.Group

const courseTypes = ['on site', 'on demand', 'remote']

class BatchForm extends React.Component {
  render () {
    const {
      user,
      form,
      batchForm,
      addSession,
      setSession,
      handleSubmit,
      onPriceChange,
      onBatchNameChange,
      onModeOfDeliveryChange,
      onCommencementDateChange
    } = this.props
    const { getFieldDecorator } = form
    return (
      <Form onSubmit={handleSubmit} className="batch-form">
        <div className="row">
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="batchName">
                <b>Batch name</b>
              </label>
              {getFieldDecorator('batchName', {
                rules: [{ required: true, message: '' }],
                initialValue: batchForm.batchName
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  disabled={!userIsAdmin(user)}
                  placeholder="e.g. Batch A 2019"
                  onChange={onBatchNameChange}
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="commencementDate">
                <b>Commencement date</b>
              </label>
              {getFieldDecorator('commencementDate', {
                rules: [{ required: true, message: '' }],
                initialValue: batchForm.commencementDate && moment(batchForm.commencementDate)
              })(
                <DatePicker
                  size="large"
                  placeholder="Select date"
                  className="has-full-width"
                  disabled={!userIsAdmin(user)}
                  onChange={onCommencementDateChange}
                />
              )}
            </Form.Item>
          </div>
          {userIsAdmin(user) && (<div className="col-md-6">
            <Form.Item>
              <label htmlFor="price">
                <b>Price</b>
              </label>
              {getFieldDecorator('price', {
                rules: [{ required: true, message: '' }],
                initialValue: batchForm.price
              })(
                <Input
                  min={0}
                  allowClear
                  size="large"
                  type="number"
                  placeholder="Enter price"
                  onChange={onPriceChange}
                  disabled={!userIsAdmin(user)}
                  className="is-transparent-bg"
                />
              )}
            </Form.Item>
          </div>
          )}
        </div>
        <p className="m-0">
          <b>Mode of delivery</b>
        </p>
        <small>Select all that apply</small>
        <div className="row mt-3">
          <div className="col-md-12">
            <Form.Item>
              <Radio.Group
                size="large"
                disabled={!userIsAdmin(user)}
                value={batchForm.modeOfDelivery}
                defaultValue={batchForm.modeOfDelivery}
                onChange={(e) => onModeOfDeliveryChange(e.target.value)}
              >
                {
                  courseTypes.map(type => (
                    <Radio key={type} value={type}>{type}</Radio>
                  ))
                }
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <Display if={userIsInstructor(user)}>
          <h5 className="mb-3">Timetable</h5>
          <table className="has-full-width">
            <thead>
              <tr>
                <th style={{ width: '33%' }}>Day of the week</th>
                <th style={{ width: '67%' }}>Timetable</th>
              </tr>
            </thead>
            <tbody>
              {
                batchForm.timetable.map(({ day, sessions }, dayIndex) => (
                  <tr key={day}>
                    <td style={{ verticalAlign: 'top' }}>
                      <span className="text-capitalize">{day}</span>
                    </td>
                    <td>
                      <div style={{ maxHeight: '150px', overflowY: 'scroll', paddingTop: '1px', paddingRight: '2%' }}>
                        {
                          sessions.map((session, sessionIndex) => (
                            <div className="d-flex" key={session.id}>
                              <div className="mb-2" >
                                <InputGroup size="large" compact >
                                  <Input
                                    onChange={(e) => setSession({ ...session, activityName: e.target.value }, dayIndex, sessionIndex)}
                                    placeholder="Class name"
                                    defaultValue={session.activityName}
                                  />
                                  <TimePicker
                                    size="large"
                                    use12Hours
                                    defaultValue={session.begin && moment(session.begin, 'HH:mm:ss')}
                                    onChange={(e, begin) => { setSession({ ...session, begin }, dayIndex, sessionIndex) }} />
                                  <TimePicker
                                    size="large"
                                    use12Hours
                                    defaultValue={session.begin && moment(session.end, 'HH:mm:ss')}
                                    onChange={(e, end) => { setSession({ ...session, end }, dayIndex, sessionIndex) }} />
                                </InputGroup>
                              </div>
                              <img className="mt-2 ml-2 h20 has-pointer-cursor" src="/static/images/close.png"
                                onClick={() => { setSession({ ...session, remove: true }, dayIndex, sessionIndex) }}
                              ></img>
                            </div>
                          ))
                        }
                      </div>
                      <div onClick={() => { addSession(dayIndex) }} className="d-flex align-items-center has-pointer-cursor mt-3">
                        <img className="mr-2" src="/static/images/plus.png" />
                        <p className="m-0 ">
                          <b>Add another class</b>
                        </p>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </Display>
      </Form>
    )
  }
}

BatchForm.propTypes = {
  user: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  addSession: PropTypes.func.isRequired,
  setSession: PropTypes.func.isRequired,
  batchForm: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onBatchNameChange: PropTypes.func.isRequired,
  onPriceChange: PropTypes.func.isRequired,
  onModeOfDeliveryChange: PropTypes.func.isRequired,
  onCommencementDateChange: PropTypes.func.isRequired
}

const WrappedBatchForm = Form.create({ name: 'batch form' })(BatchForm)

export default WrappedBatchForm
