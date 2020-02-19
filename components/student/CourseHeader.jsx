import { userIsAdmin } from '../../store/reducers/user'
import notifier from 'simple-react-notifications'
import { Button, Menu, Icon, Modal } from 'antd'
import Display from '../shared/Display'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { ROUTES } from '../../lib/constants'

const { confirm } = Modal

const CourseHeader = props => {
  const {
    user,
    course,
    children,
    className,
    deleteCourse
  } = props

  const [loading, setLoading] = useState(false)

  const handleDelete = () => {
    showConfirm(
      'Are you sure you want to delete this course ?',
      () => {
        setLoading(true)
        deleteCourse({
          id: course.id
        }).then((res) => {
          notifier.success('Successfully deleted')
          window.location = ROUTES.ADMIN_DASHBOARD_COURSES
          setLoading(false)
        })
        .catch((err) => {
          if (err.response.status === 404)
          {
            notifier.error('ERROR! Already deleted course')
            window.location = ROUTES.ADMIN_DASHBOARD_COURSES
          } else {
            notifier.error('ERROR! Unable to delete course')
          }
          setLoading(false)
      })}
    )
  }

  const showConfirm = (content, handleOk, handleCancel) => {
    confirm({
      content,
      onOk () {
        handleOk && handleOk()
      },
      onCancel () {
        handleCancel && handleCancel()
      },
    })
  }

  const actionMenu = (
    <Menu>
    </Menu>
  )
  return (
    <section
      style={{
        height: userIsAdmin(user)
          ? '205px'
          : null
      }}
      className={`
        student-course-header 
        has-white-bg mt-5-neg 
        pt-5 ${className}`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 pl-6 pr-6">
            <div className="d-flex justify-content-md-between">
              <h3 className="mb-5 course-header__main-text text-capitalize">
                {course.title}
              </h3>
              <div className="d-flex">
                <div>
                  <Display if={!!course.isPublished}>
                    <div className="tag is-success p-4 pl-6 pr-6 no-radius">
                      <Icon
                        style={{ fontSize: '23px' }}
                        type="check-circle"
                      />
                      <span className="ml-2">
                        Active
                      </span>
                    </div>
                  </Display>
                  <Display if={!course.isPublished}>
                    <div
                      style={{ width: '170px' }}
                      className="tag is-warning p-4 no-radius">
                      <Icon style={{ fontSize: '23px' }} type="warning" />
                      <span className="ml-2">Not Active</span>
                    </div>
                  </Display>
                </div>
                {
                  userIsAdmin(user) && (
                    <Button
                      loading={loading}
                      size="large"
                      onClick={handleDelete}
                      overlay={actionMenu}
                    >
                      {!loading && <Icon style={{ fontSize: '22px' }} type="delete" />}
                    </Button>
                  )
                }
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <div className="mr-3">
                <img
                  className="mr-1 mt-1 h1"
                  src="/static/images/scholar-grey.png"
                />
                <span className="text-capitalize">
                  {course.category.name}
                </span>
              </div>
              <div>
                <img
                  className="mr-1 mt-0 h09"
                  src="/static/images/users-grey.png"
                />
                <span>{course.learnersCount} learner(s)</span>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

CourseHeader.propTypes = {
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
}

export default CourseHeader
