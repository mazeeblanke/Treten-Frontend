import React from 'react'
import PropTypes from 'prop-types'
import CourseVideo from '../course/CourseVideo'

const CourseVideosList = props => {
  return (
    <>
      <hr></hr>
      {
        props.videos.map((video) => (
          <div key={video.title} className="col-md-12 mt-4">
            <div className="row mb-5">
              <div className="col-md-6 mb-4">
                <CourseVideo height="300" video={video} />
              </div>
              <div className="col-md-6 pr-5">
                <h5>{video.title}</h5>
                <p className="">{video.description}</p>
                <div className="d-flex mt-5">
                  <p className="mt-2 mr-4 d-flex align-items-center">
                    <b className="mr-1">Download</b>
                    <img src="/images/arrow-left.png" />
                  </p>
                  <p className="mt-2 d-flex align-items-center">
                    <b className="mr-1">Watch</b>
                    <img src="/images/play.png" />
                  </p>
                </div>
              </div>
            </div>
            <hr></hr>
          </div>
        ))
      }
    </>
  )
}

CourseVideosList.propTypes = {
  videos: PropTypes.object.isRequired
}

export default CourseVideosList
