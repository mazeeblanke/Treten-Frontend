import React from 'react'
import PropTypes from 'prop-types'
import EducationFormEntry from './EducationFormEntry'
import Display from './Display'
import EmptyState from './EmptyState'

const EducationForm = props => {
  return (
    <div ref={props.educationRef}>
      <h5 className="mt-6">Education</h5>
      <div
        id="addEducationWrapper"
        className="row work-experirence"
        style={{
          maxHeight: '320px',
          minHeight: '300px',
          overflowY: 'scroll'
        }}
      >
        <div className="col-md-12">
          <Display if={!(props.education || []).length}>
            <div className="mt-7 mb-7">
              <EmptyState emptyText="No education added!" />
            </div>
          </Display>
          <div className="col-md-12">
            {props.education && props.education.map((edu, educationIndex) => (
              <EducationFormEntry
                errors={props.errors}
                edu={edu}
                educationIndex={educationIndex}
                setEducation={props.setEducation}
                key={edu.id}
              />
            ))}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <div
              onClick={() => {
                props.addEducation()
              }}
              className="d-flex align-items-center has-pointer-cursor"
            >
              <img className="mr-2" src="/images/plus.png" />
              <p className="m-0 ">
                <b>Add another education</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

EducationForm.propTypes = {
  educationRef: PropTypes.object.isRequired,
  education: PropTypes.array.isRequired,
  setEducation: PropTypes.func.isRequired,
  addEducation: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default EducationForm
