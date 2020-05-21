import React from 'react'
import PropTypes from 'prop-types'
import Instructor from '../instructor/Instructor'

const CourseInstructor = props => {
  const { instructors } = props
  return (
    <div className="row mt-4">
      {
        instructors.map((instructor) => (
          <div key={instructor.id} className="col-md-3 mb-4">
            <Instructor
              key={instructor.id}
              width="100%"
              isLoading={false}
              socialLinks={instructor.socialLinks}
              userable={instructor}
              name={instructor.name}
              profilePic={instructor.profilePic}
              hasBorder={true}
            />
          </div>
        ))
      }
    </div>
  )
}

CourseInstructor.propTypes = {
  instructors: PropTypes.array.isRequired
}

export default CourseInstructor
