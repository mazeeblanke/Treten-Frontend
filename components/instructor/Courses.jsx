import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Courses = props => {
  return (
    <div className="card instructor-experience mb-9  pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Courses</h5>
        {!props.courses.length ? <EmptyState emptyText="No courses!" /> : null}
        {
          props.courses.map((course) => (
            <div key={course.title} className="course mb-2 p-2">
              <div className="d-flex justify-content-sm-between">
                <h6 className="fw-600">
                  {course.title}
                </h6>
                <Link className="is-red" href={`/courses/${course.slug}`}>
                  <a className="is-red has-pointer-cursor">
                    view
                  </a>
                </Link>
              </div>
              <p className="is-red">{course.category.name}</p>
              <div>
                <p className="mb-1 is-grey-dark">{course.excerpt}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

Courses.propTypes = {
  courses: PropTypes.array.isRequired
}

export default Courses
