import React from 'react'
import PropTypes from 'prop-types'
import CourseVideo from './CourseVideo'
import ReactHtmlParser from 'react-html-parser'
import Display from '../shared/Display'

const About = props => {
  const {
    course
  } = props
  return (
    <div className="container course-about">
      <div className="row p-5 align-items-start course-about__container mt-9 mb-8">
        <div className="col-sm-12 col-md-6">
          <h6 className="fw-600 mb-3">About this course</h6>
          <div className="mb-4">
            {ReactHtmlParser(course.description)}
          </div>
          <div className="row">
            <Display if={!!(course.certificationBy || {}).value}>
              <div className="col-md-4">
                <h6 className="fw-600">Certification by</h6>
                <img src={`/static/images/${(course.certificationBy || {}).value}`}></img>
              </div>
            </Display>
            <div className="col-md-4">
              <h6 className="fw-600">Course syllabus</h6>
              <button type="button" className="btn btn-outline-danger mb-3">
                <img className="mr-2" src="/static/images/download.png"></img>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <CourseVideo video={{}} />
        </div>
      </div>
    </div>
  )
}

About.propTypes = {
  course: PropTypes.object.isRequired
}

export default About
