import React, { useState } from 'react'
import { Form, Input, DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
const dateFormat = 'YYYY'

const CertificationEntryForm = props => {

  const {
    certification,
    setCertification,
    certificationIndex,
    fetchCertifications,
    certificationOptions,
    errors: { certifications }
  } = props

  const search = (searchQuery) => {
    fetchCertifications({
      q: searchQuery,
    })
  }

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
                  'has-error'
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
                      'name',
                      'certifications',
                      certificationIndex
                    )
                  }
                />
                {certifications &&
                  (certifications[certificationIndex] || {}).name && (
                  <div className="ant-form-explain">
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
                  'has-error'
                }
              >
                <label htmlFor="year">Year acquired</label>
                <DatePicker
                  value={
                    certification.year && (moment.isMoment(certification.year)
                      ? certification.year
                      : moment(certification.year))
                  }
                  className="has-full-width"
                  mode="year"
                  format={dateFormat}
                  onChange={moment =>
                    setCertification(
                      moment,
                      'year',
                      'certifications',
                      certificationIndex
                    )
                  }
                />
                {certifications &&
                  (certifications[certificationIndex] || {}).year && (
                  <div className="ant-form-explain">
                    {certifications &&
                        (certifications[certificationIndex] || {}).year}
                      !
                  </div>
                )}
              </Form.Item>
            </div>
            <div className="col-md-6 mt-3">
              <label htmlFor="certification-by">
                <b>Certification by</b>
              </label>
              <div>
                <Select
                  showSearch
                  size="large"
                  allowClear
                  showArrow={false}
                  onChange={(e, proxyComp, g) => {
                    setCertification(
                      {
                        value: proxyComp && proxyComp.props.value,
                        label: proxyComp && proxyComp.props.label
                      },
                      'certificationBy',
                      'certifications',
                      certificationIndex
                    )
                  }}
                  filterOption={false}
                  notFoundContent="No matched certifications found"
                  onSearch={search}
                  className="has-full-width"
                  defaultActiveFirstOption={false}
                  placeholder='Select certification'
                  value={(certification.certificationBy || {}).value}
                >
                  {
                    certificationOptions.map(el => (
                      <Select.Option key={el.id} label={el.bannerImage} value={el.company}>
                        <div>
                          <img
                            alt={el.company}
                            style={{ float: 'left', height: '28px', marginTop: '3px' }}
                            src={el.bannerImage} >
                          </img>
                          <span
                            className="ml-3"
                            style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                            {el.company}
                          </span>
                        </div>
                      </Select.Option>
                    ))
                  }
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-1">
          <img alt="set certification" src="/images/close.png"
            onClick={() =>
              setCertification(null, null, 'certifications', certificationIndex)
            }
          >
          </img>
        </div>
      </div>
    </div>
  )
}

CertificationEntryForm.propTypes = {
  certification: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.string,
    certificationBy: PropTypes.object,
  }).isRequired,
  setCertification: PropTypes.func.isRequired,
  fetchCertifications: PropTypes.func.isRequired,
  certificationOptions: PropTypes.array,
  certificationIndex: PropTypes.number.isRequired,
  errors: PropTypes.shape({ certifications: PropTypes.object })
}

export default CertificationEntryForm
