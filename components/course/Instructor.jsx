import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const Instructor = props => {
  const {
    name,
    title,
    heading,
    profilePic,
    instructorSlug,
    qualifications,
  } = props
  return (
    <section id="instructor" className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-4 p-0">
            <div className="course-instructor p-5">
              <h5 className="fw-600 mb-4 mt-1">{heading || 'Instructor'}</h5>
              <img className="rounded-circle" src={profilePic} style={{ height: '80px' }}/>
              <h5 className="mt-3 mb-3">{name}</h5>
              <p>{title}</p>
              <p>{qualifications}</p>
              <div className="d-flex mt-3">
                <img className="mr-3" src="/static/images/social/linkedin inverted.png" />
                <img className="mr-3" src="/static/images/social/facebook inverted.png" />
                <img className="mr-3" src="/static/images/social/twitter inverted.png" />
              </div>
              <Link href={`/instructors/${instructorSlug}`}>
                <button type="button" className="btn btn-outline-danger mt-5">
                  <span>View profile</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Instructor.propTypes = {
  name: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  instructorSlug: PropTypes.string.isRequired,
  qualifications: PropTypes.string.isRequired,
}

export default Instructor
