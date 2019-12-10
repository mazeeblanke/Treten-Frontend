import React from 'react'
import PropTypes from 'prop-types'
import Instructor from './Instructor'

const InstructorList = props => {
  return (
    <section className="pb-4">
      <div className="container">
        <div className="row">
          {
            props.instructors.map((instructor) => (
              <div key={instructor.title} className="col-sm-12 col-md-6 col-lg-3">
                <Instructor hasBorder={false} isLoading={props.isLoading} {...instructor} />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

InstructorList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  instructors: PropTypes.array.isRequired
}

export default InstructorList
