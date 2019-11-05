import React from "react";
import { Form, Input, DatePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

const EducationFormEntry = props => {
  const {
    educationIndex,
    edu,
    setEducation,
    errors: { education }
  } = props;
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
                      (education[educationIndex] || {}).name_of_institution &&
                      "has-error"
                    }
                  >
                    <label htmlFor="institution_name">
                      Name of institution
                    </label>
                    <Input
                      value={edu.name_of_institution}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter name of institution"
                      onChange={({ target }) =>
                        setEducation(
                          target.value,
                          "name_of_institution",
                          "education",
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).name_of_institution && (
                        <div class="ant-form-explain">
                          {education &&
                            (education[educationIndex] || {})
                              .name_of_institution}
                          !
                        </div>
                      )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {}).start_date &&
                      "has-error"
                    }
                  >
                    <label htmlFor="start_date">Start date</label>
                    <DatePicker
                      value={
                        moment.isMoment(edu.start_date)
                          ? edu.start_date
                          : moment(edu.start_date || undefined) || undefined
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      onChange={moment =>
                        setEducation(
                          moment,
                          "start_date",
                          "education",
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).start_date && (
                        <div class="ant-form-explain">
                          {education &&
                            (education[educationIndex] || {}).start_date}
                          !
                        </div>
                      )}
                  </Form.Item>
                </div>
                <div className="col-md-3 mt-3">
                  <Form.Item
                    className={
                      education &&
                      (education[educationIndex] || {}).end_date &&
                      "has-error"
                    }
                  >
                    <label htmlFor="end_date">End date</label>
                    <DatePicker
                      value={
                        moment.isMoment(edu.end_date)
                          ? edu.start_date
                          : moment(edu.end_date || undefined) || undefined
                      }
                      className="has-full-width"
                      mode="year"
                      format="YYYY"
                      onChange={moment =>
                        setEducation(
                          moment,
                          "end_date",
                          "education",
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {}).end_date && (
                        <div class="ant-form-explain">
                          {education &&
                            (education[educationIndex] || {}).end_date}
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
                        .qualification_obtained &&
                      "has-error"
                    }
                  >
                    <label htmlFor="qualification_obtained">
                      Qualification obtained
                    </label>
                    <Input
                      value={edu.qualification_obtained}
                      size="large"
                      type="text"
                      placeholder="e.g. Enter qualification obtained"
                      onChange={({ target }) =>
                        setEducation(
                          target.value,
                          "qualification_obtained",
                          "education",
                          educationIndex
                        )
                      }
                    />
                    {education &&
                      (education[educationIndex] || {})
                        .qualification_obtained && (
                        <div class="ant-form-explain">
                          {education &&
                            (education[educationIndex] || {})
                              .qualification_obtained}
                          !
                        </div>
                      )}
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className="col-md-1">
              <img
                src="/static/images/close.png"
                onClick={() =>
                  setEducation(null, null, "education", educationIndex)
                }
              ></img>
            </div>
          </div>
        </div>
      </div>
      <hr className="mt-5"></hr>
    </div>
  );
};

EducationFormEntry.propTypes = {};

export default EducationFormEntry;
