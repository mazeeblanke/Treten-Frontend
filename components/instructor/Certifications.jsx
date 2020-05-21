import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EmptyState from '../shared/EmptyState'

const Certifications = props => {
  return (
    <div className="card instructor-certifications mb-4 pb-1 has-border">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Certifications</h5>
        {!props.certifications.length ? <EmptyState emptyText="No certifications yet!" /> : null}
        {
          props.certifications.map((certification) => (
            <div key={certification.name} className="certification d-flex justify-content-sm-between mb-3 p-2">
              <div>
                <h6 className="fw-600">
                  {certification.name}
                </h6>
                <small>
                  {certification.year ? moment(certification.year).format('Y') : ''}
                </small>
              </div>
              <div>
                {certification.certificationBy && <img
                  className="ml-4"
                  style={{ height: '40px' }}
                  src={certification.certificationBy.label}
                />}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

Certifications.propTypes = {
  certifications: PropTypes.array.isRequired
}

export default Certifications
