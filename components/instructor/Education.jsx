import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import EmptyState from '../shared/EmptyState'

const Education = props => {
  return (
    <div className="card instructor-education mb-2 mb-3 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Education</h5>
        {!props.education.length ? <EmptyState emptyText="No education!" /> : null}
        {props.education.map(_education => (
          <div key={_education.id} className="_education mb-3 p-2">
            <div className="d-flex justify-content-sm-between">
              <h6 className="fw-600">{_education.nameOfInstitution}</h6>
              <small className="ml-3">
                {_education.startDate
                  ? moment(_education.startDate).format('Y')
                  : ''}{' '}
                -{' '}
                {_education.endDate
                  ? moment(_education.endDate).format('Y')
                  : 'Present'}
              </small>
            </div>
            <div>
              <p className="mb-1 is-grey-dark">
                {_education.qualificationObtained}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired
}

export default Education
