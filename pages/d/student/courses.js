import Link from 'next/link'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../../../store/actions'
import withRedirect from '../../layouts/withRedirect'
import Display from '../../../components/shared/Display'
import withAdminLayout from '../../layouts/withAdminLayout'
import { getUserDetails } from '../../../store/reducers/user'
import CourseList from '../../../components/admin/CourseList'
import EmptyState from '../../../components/shared/EmptyState'
import { getAllEnrolledCourses } from '../../../store/reducers/enrolledCourses'

class Courses extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourses({
        enrolled: 1,
        scope: 'enrolled'
      })),
    ])
    return {}
  }

  handlePageChange = ({ page = 1 }) => {
    this.props.fetchEnrolledCourses({
      page,
      enrolled: 1,
      scope: 'enrolled',
    })
  }

  render () {
    const {
      user,
      enrolledCourses,
      isLoadingEnrolledCourses,
      enrolledCoursesPagination
    } = this.props
    return (
      <section className="courses has-height-80">
        <Display if={!this.props.enrolledCourses.length}>
          <div className="has-full-height">
            <EmptyState
              emptyText="You have not signed up for any course"
            >
              <Link href="/courses">
                <Button
                  style={{ width: '195px' }}
                  className="ml-3"
                  size="large"
                  type="danger"
                >
                  Explore course catalog
                </Button>
              </Link>
            </EmptyState>
          </div>
        </Display>
        <Display if={this.props.enrolledCourses.length}>
          <div className="container mt-6 pl-6 pr-6">
            <CourseList
              user={user}
              studentView={true}
              courses={enrolledCourses}
              isLoading={isLoadingEnrolledCourses}
              pagination={enrolledCoursesPagination}
              handlePageChange={this.handlePageChange}
            />
          </div>
        </Display>
      </section>
    )
  }
}

Courses.propTypes = {
  user: PropTypes.object.isRequired,
  enrolledCourses: PropTypes.array.isRequired,
  fetchEnrolledCourses: PropTypes.func.isRequired,
  isLoadingEnrolledCourses: PropTypes.bool.isRequired,
  enrolledCoursesPagination: PropTypes.object.isRequired,
}

Courses.headerName = 'My Courses'

const mapstateToProps = (state) => {
  return {
    user: getUserDetails(state),
    enrolledCourses: getAllEnrolledCourses(state),
    isLoadingEnrolledCourses: state.enrolledCourses.isLoading,
    enrolledCoursesPagination: state.enrolledCourses.pagination,
  }
}

export default withRedirect(withAdminLayout(connect(
  mapstateToProps,
  {
    fetchEnrolledCourses: actions.fetchCourses
  }
)(Courses)))
