import React from "react";
import { Form, Input, DatePicker } from "antd";
import PropTypes from "prop-types";
const dateFormat = "YYYY";
import moment from "moment";

const CertificationEntryForm = props => {
  const {
    certification,
    setCertification,
    certificationIndex,
    errors: { certifications }
  } = props;
  return (
    <div className="col-md-12 mb-3">
      <h5 className="text-capitalize">
        <b>{String.fromCharCode(certificationIndex + 97)}</b>
      </h5>
      <div className="row mb-1 align-items-center">
        <div className="col-md-11">
          <div className="row">
            <div className="col-md-6 certifications">
              <Form.Item
                className={
                  certifications &&
                  (certifications[certificationIndex] || {}).name &&
                  "has-error"
                }
              >
                <label htmlFor="name">Name of certification</label>
                <Input
                  value={certification.name}
                  size="large"
                  type="text"
                  placeholder="Name of certification"
                  name="name"
                  onChange={({ target }) =>
                    setCertification(
                      target.value,
                      "name",
                      "certifications",
                      certificationIndex
                    )
                  }
                />
                {certifications &&
                  (certifications[certificationIndex] || {}).name && (
                    <div class="ant-form-explain">
                      {certifications &&
                        (certifications[certificationIndex] || {}).name}
                      !
                    </div>
                  )}
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item
                className={
                  certifications &&
                  (certifications[certificationIndex] || {}).year &&
                  "has-error"
                }
              >
                <label htmlFor="year">Year acquired</label>
                <DatePicker
                  value={
                    moment.isMoment(certification.year)
                      ? certification.year
                      : moment(certification.year || undefined) || undefined
                  }
                  className="has-full-width"
                  mode="year"
                  format={dateFormat}
                  onChange={moment =>
                    setCertification(
                      moment,
                      "year",
                      "certifications",
                      certificationIndex
                    )
                  }
                />
                {certifications &&
                  (certifications[certificationIndex] || {}).year && (
                    <div class="ant-form-explain">
                      {certifications &&
                        (certifications[certificationIndex] || {}).year}
                      !
                    </div>
                  )}
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="col-md-1">
          <img src="/static/images/close.png"
            onClick={() =>
              setCertification(null, null, "certifications", certificationIndex)
            }
          >
            
          </img>
        </div>
      </div>
    </div>
  );
};

CertificationEntryForm.propTypes = {};

export default CertificationEntryForm;
