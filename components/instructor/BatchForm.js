import React from 'react';
import { Checkbox, Form, Button, Input, DatePicker, Col, Row, TimePicker  } from 'antd';
const { RangePicker } = DatePicker;
import PropTypes from 'prop-types';
import moment from 'moment';

const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;

const courseTypes = ['On site', 'On demand', 'Remote'];



class BatchForm extends React.Component {

  state = {

  }



  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSubmit} className="batch-form">

        <div className="row">
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="batch_name">
                <b>Batch name</b>
              </label>
              {getFieldDecorator('batch_name', {
                rules: [{ required: true, message: '' }],
                initialValue: this.props.batchForm.batch_name
              })(
                <Input
                  allowClear
                  size="large"
                  type="text"
                  placeholder="e.g. Batch A 2019"
                  onChange={this.props.onBatchNameChange}
                />
              )}
            </Form.Item>
          </div>
          <div className="col-md-6">
            <Form.Item>
              <label htmlFor="commencement_date">
                <b>Commencement date</b>
              </label>
              {getFieldDecorator('commencement_date', {
                rules: [{ required: true, message: '' }],
                initialValue: moment(this.props.batchForm.commencement_date || undefined)
              })(
                <DatePicker
                  className="has-full-width"
                  size="large"
                  placeholder="Select date"
                  onChange={this.props.onCommencementDateChange}

                />
              )}
            </Form.Item>
          </div>
        </div>

        <p className="m-0">
          <b>Mode of delivery</b>
        </p>
        <small>Select all that apply</small>


        <div className="row mt-3">
          <div className="col-md-12">
            <Form.Item>
              <CheckboxGroup
                size="large"
                options={courseTypes}
                onChange={this.props.onModeOfDeliveryChange}
                defaultValue={this.props.batchForm.modeOfDelivery}
              />
            </Form.Item>
          </div>
        </div>

        {/* <div className="row"> */}
          <h5 className="mb-3">Timetable</h5>

          <table className="has-full-width">
            <thead>
              <tr>
                <th style={{ width: '40%' }}>Day of the week</th>
                <th style={{ width: '60%' }}>Timetable</th>
              </tr>
            </thead>
            <tbody>
              {
                this.props.batchForm.timeTable.map(({ day, sessions }, dayIndex) => (
                  <tr key={day}>
                    <td style={{ verticalAlign: 'top' }}>
                    <span className="text-capitalize">{day}</span>
                    </td>
                    <td>
                      <div style={{ maxHeight: '150px', overflowY: 'scroll', paddingTop: '1px', paddingRight: '2%' }}>
                        {
                          sessions.map((session, sessionIndex) => (
                            <div className="mb-2" key={session.id}>
                              <InputGroup size="large" compact >
                                <Input
                                  onChange={(e) => this.props.setSession({ ...session, activityName: e.target.value }, dayIndex, sessionIndex)}
                                  placeholder="Class name"
                                  defaultValue={session.activityName}
                                />
                                <TimePicker
                                  size="large"
                                  use12Hours
                                  defaultValue={session.begin && moment(session.begin, 'HH:mm:ss')}
                                  onChange={(e, begin) => { this.props.setSession({ ...session, begin }, dayIndex, sessionIndex) }} />
                                <TimePicker
                                  size="large"
                                  use12Hours
                                  defaultValue={session.begin && moment(session.end, 'HH:mm:ss')}
                                  onChange={(e, end) => { this.props.setSession({ ...session, end }, dayIndex, sessionIndex)}} />
                              </InputGroup>
                            </div>
                          ))
                        }
                      </div>
                      <div onClick={() => { this.props.addSession(dayIndex) }} className="d-flex align-items-center has-pointer-cursor mt-3">
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
        {/* </div> */}

      </Form>
    );
  }
}

const WrappedBatchForm = Form.create({ name: 'enroll_register_form' })(BatchForm);

export default WrappedBatchForm;

// export default BatchForm;
