import React from 'react'
import PropTypes from 'prop-types'
import CertificationEntryForm from './CertificationFormEntry'
import Display from './Display'
import EmptyState from './EmptyState'

const CertificationForm = props => {
  return (
    <div ref={props.certificationRef}>
      <h5 className="mt-6">Certifications</h5>
      <div
        id="addCertificationWrapper"
        className="row"
        style={{
          maxHeight: '190px',
          minHeight: '140px',
          overflowY: 'scroll'
        }}
      >
        <div className="col-md-12">
          <Display if={!(props.certifications || []).length}>
            <div className="pt-4 pb-4">
              <EmptyState emptyText="No certification added!" />
            </div>
          </Display>
          {props.certifications && props.certifications.map((certification, certificationIndex) => (
            <CertificationEntryForm
              errors={props.errors}
              key={certification.id}
              certification={certification}
              setCertification={props.setCertification}
              certificationIndex={certificationIndex}
              fetchCertifications={props.fetchCertifications}
              certificationOptions={props.certificationOptions}
            />
          ))}
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div
            onClick={() => {
              props.addCertification()
            }}
            className="d-flex align-items-center has-pointer-cursor"
          >
            <img className="mr-2" src="/static/images/plus.png" />
            <p className="m-0 ">
              <b>Add another certification</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

CertificationForm.propTypes = {
  addCertification: PropTypes.func.isRequired,
  setCertification: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  certifications: PropTypes.array.isRequired,
  certificationRef: PropTypes.object,
  fetchCertifications: PropTypes.func.isRequired,
  certificationOptions: PropTypes.array,
}

export default CertificationForm
