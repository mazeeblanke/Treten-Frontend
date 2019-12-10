import React from 'react'
import { Form, Input, DatePicker, Select } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
const dateFormat = 'YYYY'

const partners = [{
  value: 'Microsoft',
  label: 'partners/microsoft.png'
}, {
  value: 'Fortinet',
  label: 'partners/Fortinet.png'
}, {
  value: 'Juniper Networks',
  label: 'partners/Juniper_Networks.png'
}, {
  value: 'Paloalto Networks',
  label: 'partners/paloaltonetworks.png'
}, {
  value: 'Cisco',
  label: 'partners/cisco.png'
}, {
  value: 'F5 Networks',
  label: 'partners/F5_Networks.png'
}]

const CertificationEntryForm = props => {
  const {
    certification,
    setCertification,
    certificationIndex,
    errors: { certifications }
  } = props
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
                  placeholder="Select certification provider"
                  value={(certification.certificationBy || {}).value}
                  className="has-full-width"
                  size="large"
                  onChange={(e, proxyComp, g) => {
                    setCertification(
                      {
                        value: proxyComp.props.value,
                        label: proxyComp.props.label
                      },
                      'certificationBy',
                      'certifications',
                      certificationIndex
                    )
                  }}
                >
                  {
                    partners.map(el => (
                      <Select.Option key={el.value} label={el.value} value={el.label}>
                        <div>
                          <img
                            style={{ float: 'left', height: '28px', marginTop: '7px' }}
                            src={`/static/images/${el.label}`} >
                          </img>
                          <span
                            className="ml-3"
                            style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                            {el.value}
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
          <img src="/static/images/close.png"
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
  certificationIndex: PropTypes.number.isRequired,
  errors: PropTypes.shape({ certifications: PropTypes.object })
}

export default CertificationEntryForm
