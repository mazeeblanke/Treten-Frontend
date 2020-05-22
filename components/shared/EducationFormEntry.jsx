import React from 'react'
import { Form, Input, DatePicker } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import { disabledDate } from '../../lib/helpers'

const EducationFormEntry = props => {
  const {
    educationIndex,
    edu,
    setEducation,
    errors: { education }
  } = props
  return (
    <div>
      <h5 className="text-capitalize">
        <b>{String.fromCharCode(educationIndex + 97)}</b>
      </h5>
      <div className="row align-items-center">
        <div className="col-md-12">
          <div className="row align-items-center">
            <div className="col-md-11">
              <div className="row">
                <div className="col-md-6 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {}).nameOfInstitution &&
                      'has-error'
                    }
                  >
                    <label htmlFor="institution_name">
                      Name of institution
                    </label>
                    <Input
                      value={edu.nameOfInstitution}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter name of institution"
                      onChange={({ target }) =>
                        setEducation(
                          target.value,
                          'nameOfInstitution',
                          'education',
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).nameOfInstitution && (
                      <div className="ant-form-explain">
                        {education &&
                            (education[educationIndex] || {})
                              .nameOfInstitution}
                          !
                      </div>
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {}).startDate &&
                      'has-error'
                    }
                  >
                    <label htmlFor="startDate">Start date</label>
                    <DatePicker
                      value={
                        moment.isMoment(edu.startDate)
                          ? edu.startDate
                          : edu.startDate && moment(edu.startDate)
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      onChange={moment =>
                        setEducation(
                          moment,
                          'startDate',
                          'education',
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).startDate && (
                      <div className="ant-form-explain">
                        {education &&
                            (education[educationIndex] || {}).startDate}
                          !
                      </div>
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {}).endDate &&
                      'has-error'
                    }
                  >
                    <label htmlFor="endDate">End date</label>
                    <DatePicker
                      value={
                        moment.isMoment(edu.endDate)
                          ? edu.endDate
                          : edu.endDate && moment(edu.endDate)
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      disabled={!edu.startDate}
                      onOk={() => {}}
                      disabledDate={(current) => disabledDate(current, edu.startDate)}
                      onChange={moment =>
                        setEducation(
                          moment,
                          'endDate',
                          'education',
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).endDate && (
                      <div className="ant-form-explain">
                        {education &&
                            (education[educationIndex] || {}).endDate}
                          !
                      </div>
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-6 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {})
                        .qualificationObtained &&
                      'has-error'
                    }
                  >
                    <label htmlFor="qualificationObtained">
                      Qualification obtained
                    </label>
                    <Input
                      value={edu.qualificationObtained}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter qualification obtained"
                      onChange={({ target }) =>
                        setEducation(
                          target.value,
                          'qualificationObtained',
                          'education',
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {})
                        .qualificationObtained && (
                      <div className="ant-form-explain">
                        {education &&
                            (education[educationIndex] || {})
                              .qualificationObtained}
                          !
                      </div>
                    )}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <img
                src="/images/close.png"
                onClick={() =>
                  setEducation(null, null, 'education', educationIndex)
                }
              ></img>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5"></hr>
    </div>
  )
}

EducationFormEntry.propTypes = {
  educationIndex: PropTypes.number.isRequired,
  edu: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    nameOfInstitution: PropTypes.string,
    qualificationObtained: PropTypes.string,
  }),
  setEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default EducationFormEntry
