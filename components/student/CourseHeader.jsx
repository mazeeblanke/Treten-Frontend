import { userIsAdmin } from '../../store/reducers/user'
import notifier from 'simple-react-notifications'
import { Dropdown, Menu, Icon } from 'antd'
import Display from '../shared/Display'
import PropTypes from 'prop-types'
import React from 'react'
import { ROUTES } from '../../lib/constants'

const CourseHeader = props => {
  const {
    user,
    course,
    children,
    className,
    deleteCourse
  } = props

  const handleDelete = () => {
    deleteCourse({
      id: course.id
    }).then((res) => {
      notifier.success(res.message)
      window.location = ROUTES.ADMIN_DASHBOARD_COURSES
    })
    .catch((err) => {
      if (err.response.status === 404)
      {
        notifier.error('ERROR! Already deleted course')
        window.location = ROUTES.ADMIN_DASHBOARD_COURSES
      } else {
        notifier.error('ERROR! Unable to delete course')
      }
    })
  }

  const actionMenu = (
    <Menu>
      <Menu.Item key="1">
        <Icon type="user" />
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="user" />
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        <Icon type="user" />
        3rd item
      </Menu.Item>
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
                    <Dropdown.Button
                      size="large"
                      onClick={handleDelete}
                      overlay={actionMenu}
                    >
                      <Icon style={{ fontSize: '22px' }} type="delete" />
                    </Dropdown.Button>
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
