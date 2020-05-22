import React from 'react'
import PropTypes from 'prop-types'
// import 'react-quill/dist/quill.snow.css'
import { Form, Input, DatePicker } from 'antd'
import dynamic from 'next/dynamic'
import Display from './Display'
import EmptyState from './EmptyState'
import moment from 'moment'
import { disabledDate } from '../../lib/helpers'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const WorkExperienceForm = props => {
  const {
    errors: { workExperience: error },
    addWorkExperience,
    workExperienceRef,
    setWorkExperience,
    workExperience
  } = props
  return (
    <div ref={workExperienceRef}>
      <h5 className="mt-6">Work Experience</h5>
      <div
        id="addWorkExperienceWrapper"
        className="row work-experirence"
        style={{
          height: '350px',
          overflowY: 'scroll'
        }}
      >
        <div className="col-md-12">
          <Display if={!(workExperience || []).length}>
            <EmptyState emptyText="No experience added!" />
          </Display>
          {workExperience && workExperience.map((workExperience, workExperienceIndex) => (
            <div key={workExperience.id}>
              <h5 className="text-capitalize">
                <b>{String.fromCharCode(workExperienceIndex + 97)}</b>
              </h5>
              <div className="col-md-12">
                <div className="row align-items-center">
                  <div className="col-md-11">
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <Form.Item
                          className={
                            error &&
                            (error[workExperienceIndex] || {}).nameOfCompany &&
                            'has-error'
                          }
                        >
                          <label htmlFor="email">Name of company</label>
                          <Input
                            value={workExperience.nameOfCompany}
                            size="large"
                            type="text"
                            placeholder="e.g. Enter name of company"
                            onChange={({ target }) =>
                              setWorkExperience(
                                target.value,
                                'nameOfCompany',
                                'workExperience',
                                workExperienceIndex
                              )
                            }
                          />
                          {error &&
                            (error[workExperienceIndex] || {}).nameOfCompany && (
                            <div className="ant-form-explain">
                              {error &&
                                  (error[workExperienceIndex] || {}).nameOfCompany}
                                !
                            </div>
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-3 mt-3">
                        <Form.Item
                          className={
                            error &&
                            (error[workExperienceIndex] || {}).startDate &&
                            'has-error'
                          }
                        >
                          <label htmlFor="email">Start date</label>
                          <DatePicker
                            value={
                              moment.isMoment(workExperience.startDate)
                                ? workExperience.startDate
                                : workExperience.startDate && moment(workExperience.startDate)
                            }
                            className="has-full-width"
                            mode="year"
                            format="YYYY"
                            onChange={(moment) =>
                              setWorkExperience(
                                moment,
                                'startDate',
                                'workExperience',
                                workExperienceIndex
                              )
                            }
                          />
                          {error && (error[workExperienceIndex] || {}).startDate && (
                            <div className="ant-form-explain">
                              {error && (error[workExperienceIndex] || {}).startDate}
                              !
                            </div>
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-3 mt-3">
                        <Form.Item
                          className={
                            error &&
                            (error[workExperienceIndex] || {}).endDate &&
                            'has-error'
                          }
                        >
                          <label htmlFor="email">End date</label>
                          <DatePicker
                            value={
                              moment.isMoment(workExperience.endDate)
                                ? workExperience.endDate
                                : workExperience.endDate && moment(workExperience.endDate)
                            }
                            className="has-full-width"
                            mode="year"
                            format="YYYY"
                            disabled={!workExperience.startDate}
                            disabledDate={(current) => disabledDate(current, workExperience.startDate)}
                            onChange={(moment) =>
                              setWorkExperience(
                                moment,
                                'endDate',
                                'workExperience',
                                workExperienceIndex
                              )
                            }
                          />
                          {error && (error[workExperienceIndex] || {}).endDate && (
                            <div className="ant-form-explain">
                              {error && (error[workExperienceIndex] || {}).endDate}!
                            </div>
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-6 mt-3">
                        <Form.Item
                          className={
                            error &&
                            (error[workExperienceIndex] || {}).jobDescription &&
                            'has-error'
                          }
                        >
                          <label htmlFor="bio">Job Description</label>
                          <ReactQuill
                            value={workExperience.jobDescription}
                            height={300}
                            onChange={e =>
                              setWorkExperience(
                                e,
                                'jobDescription',
                                'workExperience',
                                workExperienceIndex
                              )
                            }
                          />
                          {error &&
                            (error[workExperienceIndex] || {}).jobDescription && (
                            <div className="ant-form-explain">
                              {error &&
                                  (error[workExperienceIndex] || {}).jobDescription}
                                !
                            </div>
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-md-6 mt-3">
                        <Form.Item
                          className={
                            error &&
                            (error[workExperienceIndex] || {}).jobTitle &&
                            'has-error'
                          }
                        >
                          <label htmlFor="email">Job title</label>
                          <Input
                            value={workExperience.jobTitle}
                            size="large"
                            type="text"
                            placeholder="e.g. Enter job title"
                            onChange={({ target }) =>
                              setWorkExperience(
                                target.value,
                                'jobTitle',
                                'workExperience',
                                workExperienceIndex
                              )
                            }
                          />
                          {error && (error[workExperienceIndex] || {}).jobTitle && (
                            <div className="ant-form-explain">
                              {error && (error[workExperienceIndex] || {}).jobTitle}!
                            </div>
                          )}
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <img src="/images/close.png"
                      onClick={() =>
                        setWorkExperience(null, null, 'workExperience', workExperienceIndex)
                      }
                    >
                    </img>
                  </div>
                </div>
              </div>
              <hr className="mt-5"></hr>
            </div>
          ))}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div
            onClick={() => {
              addWorkExperience()
            }}
            className="d-flex align-items-center has-pointer-cursor"
          >
            <img className="mr-2" src="/images/plus.png" />
            <p className="m-0 ">
              <b>Add another experience</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

WorkExperienceForm.propTypes = {
  addWorkExperience: PropTypes.func.isRequired,
  setWorkExperience: PropTypes.func.isRequired,
  workExperienceRef: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  workExperience: PropTypes.array.isRequired,
}

export default WorkExperienceForm
