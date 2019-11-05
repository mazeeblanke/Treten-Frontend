import React from "react";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { Form, Input, DatePicker } from "antd";
import dynamic from "next/dynamic";
import Display from "./Display";
import EmptyState from "./EmptyState";
import moment from 'moment';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const WorkExperienceForm = props => {
  const {
    errors: { work_experience: error }
  } = props;
  return (
    <div ref={props.workExperienceRef}>
      <h5 className="mt-6">Work Experience</h5>
      <div
        id="addWorkExperienceWrapper"
        className="row work-experirence"
        style={{
          height: "350px",
          overflowY: "scroll"
        }}
      >
        <div className="col-md-12">
          <Display if={!props.work_experience.length}>
            <EmptyState emptyText="No experience added!" />
          </Display>
          {props.work_experience.map((work_experience, workExperienceIndex) => (
            <div key={work_experience.id}>
              <h5 className="text-capitalize">
                <b>{String.fromCharCode(workExperienceIndex + 97)}</b>
              </h5>
              <div className="row">
                <div className="col-md-6 mt-3">
                  <Form.Item
                    className={
                      error &&
                      (error[workExperienceIndex] || {}).name_of_company &&
                      "has-error"
                    }
                  >
                    <label htmlFor="email">Name of company</label>
                    <Input
                      value={work_experience.name_of_company}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter name of company"
                      onChange={({ target }) =>
                        props.setWorkExperience(
                          target.value,
                          "name_of_company",
                          "work_experience",
                          workExperienceIndex
                        )
                      }
                    />
                    {error &&
                      (error[workExperienceIndex] || {}).name_of_company && (
                        <div class="ant-form-explain">
                          {error &&
                            (error[workExperienceIndex] || {}).name_of_company}
                          !
                        </div>
                      )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      error &&
                      (error[workExperienceIndex] || {}).start_date &&
                      "has-error"
                    }
                  >
                    <label htmlFor="email">Start date</label>
                    <DatePicker
                      value={
                        moment.isMoment(work_experience.start_date)
                          ? work_experience.start_date
                          : moment(work_experience.start_date || undefined) || undefined
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      onChange={(moment, parsedValue) =>
                        props.setWorkExperience(
                          moment,
                          "start_date",
                          "work_experience",
                          workExperienceIndex
                        )
                      }
                    />
                    {error && (error[workExperienceIndex] || {}).start_date && (
                      <div class="ant-form-explain">
                        {error && (error[workExperienceIndex] || {}).start_date}
                        !
                      </div>
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      error &&
                      (error[workExperienceIndex] || {}).end_date &&
                      "has-error"
                    }
                  >
                    <label htmlFor="email">End date</label>
                    <DatePicker
                      value={
                        moment.isMoment(work_experience.end_date)
                          ? work_experience.end_date
                          : moment(work_experience.end_date || undefined) || undefined
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      onChange={(moment, parsedValue) =>
                        props.setWorkExperience(
                          moment,
                          "end_date",
                          "work_experience",
                          workExperienceIndex
                        )
                      }
                    />
                    {error && (error[workExperienceIndex] || {}).end_date && (
                      <div class="ant-form-explain">
                        {error && (error[workExperienceIndex] || {}).end_date}!
                      </div>
                    )}
                  </Form.Item>
                </div>
                <div className="col-md-6 mt-3">
                  <Form.Item
                    className={
                      error &&
                      (error[workExperienceIndex] || {}).job_description &&
                      "has-error"
                    }
                  >
                    <label htmlFor="bio">Job Description</label>
                    <ReactQuill
                      value={work_experience.job_description}
                      height={300}
                      onChange={e =>
                        props.setWorkExperience(
                          e,
                          "job_description",
                          "work_experience",
                          workExperienceIndex
                        )
                      }
                    />
                    {error &&
                      (error[workExperienceIndex] || {}).job_description && (
                        <div class="ant-form-explain">
                          {error &&
                            (error[workExperienceIndex] || {}).job_description}
                          !
                        </div>
                      )}
                  </Form.Item>
                </div>
                <div className="col-md-6 mt-3">
                  <Form.Item
                    className={
                      error &&
                      (error[workExperienceIndex] || {}).job_title &&
                      "has-error"
                    }
                  >
                    <label htmlFor="email">Job title</label>
                    <Input
                      value={work_experience.job_title}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter job title"
                      onChange={({ target }) =>
                        props.setWorkExperience(
                          target.value,
                          "job_title",
                          "work_experience",
                          workExperienceIndex
                        )
                      }
                    />
                    {error && (error[workExperienceIndex] || {}).job_title && (
                      <div class="ant-form-explain">
                        {error && (error[workExperienceIndex] || {}).job_title}!
                      </div>
                    )}
                  </Form.Item>
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
              props.addWorkExperience();
            }}
            className="d-flex align-items-center has-pointer-cursor"
          >
            <img className="mr-2" src="/static/images/plus.png" />
            <p className="m-0 ">
              <b>Add another experience</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

WorkExperienceForm.propTypes = {};

export default WorkExperienceForm;
