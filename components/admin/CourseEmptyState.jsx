import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import Display from '../../components/shared/Display'
import EmptyState from '../../components/shared/EmptyState'

const CourseEmptyState = (props) => {
  const {
    courses,
    emptyText,
    isLoading
  } = props
  return (
    <Display if={!courses.length || isLoading}>
      <div className="pt-9" style={{ height: '50vh' }}>
        {
          !isLoading &&
          <EmptyState
            emptyText={emptyText || 'No courses yet'}
          />
        }
        {isLoading && !courses.length && <div className="is-flex justify-content-center pt-9">
          <Icon type="loading" style={{ fontSize: '42px' }}/>
        </div>}
      </div>
    </Display>
  )
}

CourseEmptyState.propTypes = {
  emptyText: PropTypes.string,
  courses: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default CourseEmptyState
