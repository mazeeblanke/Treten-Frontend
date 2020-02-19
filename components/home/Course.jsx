import React from 'react'
import Img from 'react-image'
import PropTypes from 'prop-types'
import { Tooltip, Popover } from 'antd'
import StarRatings from 'react-star-ratings'
import TextTruncate from 'react-text-truncate'

const Course = (props) => {
  const {
    course: {
      avgRating,
      instructor: {
        profilePic,
        name: instructorName
      } = {},
      description,
      bannerImage,
      title,
      name,
    } = {},
    course,
    cardWidth,
    setPathCourses
  } = props
  return (
    <div
      onClick={() => setPathCourses(course)}
      style={{ width: cardWidth }}
      className="card border-0"
    >
      <Img
        alt={title || name}
        style={{ maxHeight: '134px' }}
        decode={false}
        src={[
          bannerImage,
          '/static/images/courses/noimageavailable.png'
        ]}
      />
      <div className="card-body">
        <h5 className="card-title">
          <Tooltip title={title || name}>
            <TextTruncate
              line={1}
              text={title || name}
            />
          </Tooltip>
        </h5>
        {/* {!title && <p>
          <Tooltip title={description}>
            <TextTruncate
              line={1}
              text={description}
            />
          </Tooltip>
        </p>
        } */}
        {!!avgRating && <StarRatings
          starDimension="15px"
          starSpacing="3px"
          rating={avgRating}
          starRatedColor="#E12828"
          numberOfStars={5}
          name='rating'
        />
        }
        <div className="is-flex is-vcentered mt-2">
          <img
            className="mr-2 h28 rounded-circle"
            src={profilePic}
          />
          <span>{instructorName}</span>
        </div>
      </div>
    </div>
  )
}

Course.propTypes = {
  cardWidth: PropTypes.string,
  course: PropTypes.object.isRequired,
  setPathCourses: PropTypes.func.isRequired,
}

export default Course