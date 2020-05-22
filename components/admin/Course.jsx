import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Display from '../shared/Display'
import StarRatings from 'react-star-ratings'
import Img from 'react-image'
import { truncate } from '../../lib/helpers'
import { Tooltip } from 'antd'
// import { userIsAdmin } from '../../store/reducers/user'
// import { Avatar } from 'antd'
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

const Course = (props) => {
  const { course, isLoading, generalView, studentView } = props
  const url = generalView
    ? `/courses/${course.slug}`
    : studentView
      ? `/d/student/courses/${course.slug}`
      : `/d/admin/courses/${course.slug}`
  return (
    <Link href={url}>
      <div className="col-sm-12 col-md-6 col-lg-3 mb-5">
        <div>
          <div className="card border-0">
            <Display if={!isLoading}>
              {/* <img
                src={course.bannerImage}
                className="card-img-top"
                alt={course.title}
              /> */}
              <Img
                style={{ maxHeight: '164px', height: '164px', width: '280px' }}
                decode={false}
                src={[course.bannerImage, '/images/courses/noimageavailable.png']}
              />
            </Display>
            <Display if={isLoading}>
              <div className="card-img-top">
                <Skeleton height="100%" />
              </div>
            </Display>
            <div className="card-body">
              <h5 className="card-title text-truncate">
                <Display if={!isLoading}>
                  <Tooltip title={course.title}>
                    <span>{course.title}</span>
                  </Tooltip>  
                </Display>
                <Display if={isLoading}>
                  <Skeleton width={70} />
                </Display>
              </h5>
              <Display if={!isLoading && !generalView}>
                {(studentView) && (
                  <h6 className="mb-3 mt-1 font-weight-light text-capitalize">
                    {course.modeOfDelivery}
                  </h6>
                )}
                {(!studentView && !!course.category) && (
                  <h6 className="mb-3 mt-1 font-weight-light text-capitalize">
                    {(course.category || {}).name}
                  </h6>
                )}
                <Link href={url}>
                  <h6>
                    <b>View Course</b>
                    <img
                      className="ml-2"
                      src="/images/arrow-right.png"
                    />
                  </h6>
                </Link>
              </Display>
              {(!isLoading && generalView) && (
                <>
                  <StarRatings
                    starDimension="15px"
                    starSpacing="3px"
                    rating={course.avgRating}
                    starRatedColor="#E12828"
                    numberOfStars={5}
                    name="rating"
                  />
                  <div className="is-flex is-vcentered mt-3">
                    <img
                      className="mr-2 h28 rounded-circle"
                      src={course.instructor.gravatar}
                      alt={course.instructor.name}
                      style={{ width: '28px' }}
                    />
                    <span>{course.instructor.name}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

Course.propTypes = {
  user: PropTypes.object,
  course: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  generalView: PropTypes.bool.isRequired,
  studentView: PropTypes.bool.isRequired,
}

Course.defaultProps = {
  generalView: false,
  studentView: false,
}

export default Course
