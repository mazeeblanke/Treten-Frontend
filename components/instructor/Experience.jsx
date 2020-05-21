import PropTypes from 'prop-types'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'
import EmptyState from '../shared/EmptyState'

const Experience = props => {
  return (
    <div className="card instructor-experience mb-4 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Experience</h5>
        {!props.experience.length ? <EmptyState emptyText="No work experience!" /> : null}
        {props.experience.map(experience => (
          <div key={experience.nameOfCompany} className="experience mb-2 p-2">
            <div className="d-flex justify-content-sm-between">
              <h6 className="fw-600">{experience.nameOfCompany}</h6>
              <small className="ml-3">
                {moment(experience.startDate).format('Y')} -{' '}
                {experience.endDate
                  ? moment(experience.endDate).format('Y')
                  : 'Present'}
              </small>
            </div>
            <div>
              <p className="mb-1 mt-1 is-grey-dark">{experience.jobTitle}</p>
              <p className="mb-1 mt-2 is-grey-dark">
                {ReactHtmlParser(experience.jobDescription)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired
}

export default Experience
