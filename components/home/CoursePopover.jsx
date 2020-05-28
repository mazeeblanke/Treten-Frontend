import React from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import Display from '../shared/Display'

const CoursePopover = (props) => {
  const {
    course: {
      slug,
      title,
      description,
      learnersCount,
      category: {
        name
      } = {}
    } = {}
  } = props
  return (
    <div style={{ width: 240, minHeight: 280 }}>
      <Display if={!!name}>
        <div className="mr-3 mt-3 mb-3">
          <img
            alt="scholar"
            className="mr-1 text-capitalize"
            src="/images/scholar.png"
          />
          <span className="text-capitalize">
            {name}
          </span>
        </div>
      </Display>
      <h5 className="mb-3 mt-2">{title}</h5>
      <p>
        {description && description.substr(0, 250).replace(/<\/?[^>]+(>|$)/g, '')}
      </p>
      {/* <Display if={!!learnersCount}> */}
      <div className="mb-3">
        <img
          className="mr-1"
          src="/images/users.png"
          alt="users"
        />
        {/* <span>{learnersCount} learners</span> */}
      </div>
      {/* </Display> */}
      <Link href={`/courses/${slug}`}>
        <Button
          className="mb-2"
          style={{ height: 42 }}
          type="danger"
        >
          View course
        </Button>
      </Link>
    </div>
  )
}

CoursePopover.propTypes = {
  course: PropTypes.object.isRequired
}

export default (course) => <CoursePopover course={course} />
