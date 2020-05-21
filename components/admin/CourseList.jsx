import React from 'react'
import Course from './Course'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import CourseEmptyState from './CourseEmptyState'
import PaginationNav from '../shared/PaginationNav'
import Display from '../shared/Display'

const CourseList = (props) => {
  const {
    tab,
    user,
    courses,
    isLoading,
    emptyText,
    pagination,
    generalView,
    studentView,
    handlePageChange,
  } = props
  return (
    <>
      <div className="row mt-4">
        {courses.map((course) => (
          <Course
            user={user}
            key={course.id}
            course={course}
            isLoading={isLoading}
            studentView={studentView}
            generalView={generalView}
          />
        ))}
        <div className="col-md-12">
          <CourseEmptyState
            courses={courses}
            emptyText={emptyText}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Display if={!!courses.length}>
        <div className="is-flex justify-content-start pb-5 blog-pagination">
          <Pagination
            showLessItems
            {...pagination}
            disabled={isLoading}
            itemRender={PaginationNav}
            onChange={(page) => handlePageChange({ page, tab })}
          />
        </div>
      </Display>
    </>
  )
}

CourseList.propTypes = {
  user: PropTypes.object,
  generalView: PropTypes.bool,
  studentView: PropTypes.bool,
  tab: PropTypes.string,
  emptyText: PropTypes.string,
  courses: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  handlePageChange: PropTypes.func.isRequired,
}

export default CourseList
