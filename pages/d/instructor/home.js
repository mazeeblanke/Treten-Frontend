import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../../../store/actions'
import AdminLayout from '../../layouts/AdminLayout'
import Display from '../../../components/shared/Display'
// import Link from 'next/link'
import CourseList from '../../../components/admin/CourseList'
import EmptyState from '../../../components/shared/EmptyState'
import { getAllInstructorCourses } from '../../../store/reducers/instructorCourses'
import withRedirect from '../../layouts/withRedirect'

class Home extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchDashboardStats()),
      reduxStore.dispatch(actions.fetchCourses({
        minimal: 1,
        notAssigned: 0,
        pageSize: 4,
        authorId: reduxStore.getState().user.id,
        scope: 'instructor'
      }))
    ])
    return {}
  }

  handlePageChange = ({
    page = 1,
    tab: category,
    sort = null
  }) => {
    this.props.fetchCourses({
      page,
      sort,
      category,
      minimal: 0,
      pageSize: 4,
      notAssigned: 0,
      scope: 'instructor',
      authorId: this.props.user.id,
    })
  }

  render () {
    const {
      stats,
      allCourses,
      isLoadingAllCourses,
      allCoursesPagination,
    } = this.props
    return (
      <AdminLayout headerName="Home">
        <section className="courses has-height-80">
          <div className="container mt-6">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <div className="col-lg-4 col-xl-3 col-sm-12 col-xs-12 mb-4">
                    <div className="card dashboard__card border-0" style={{ width: '19.214rem', height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/prof_cap.png"></img>
                          </div>
                          <div>
                            <p className="m-0">My students</p>
                            <h3>{stats.studentsCount}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-xl-3 col-sm-12 col-xs-12 mb-4">
                    <div className="card dashboard__card border-0" style={{ width: '19.214rem', height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/books.png"></img>
                          </div>
                          <div>
                            <p className="m-0">My courses</p>
                            <h3>{stats.coursesCount}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Display if={!allCourses.length}>
            <div className="container has-height-80">
              <div className="row has-height-80">
                <div className="col-md-12 pl-6 pr-6 has-full-height">
                  <div className="has-full-height">
                    <EmptyState
                      emptyText="You have not been assigned any course yet"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Display>
          <Display if={allCourses.length}>
            <div className="container mt-2">
              <div className="row">
                <div className="col-md-12 pl-6 pr-6">
                  <h5 className="mb-3">My courses</h5>
                </div>
                <div className="col-md-12 pl-6 pr-6">
                  <CourseList
                    isLoading={isLoadingAllCourses}
                    pagination={allCoursesPagination}
                    courses={allCourses}
                    handlePageChange={this.handlePageChange}
                    tab="all"
                  />
                </div>
              </div>
            </div>
          </Display>
        </section>
      </AdminLayout>
    )
  }
}

Home.propTypes = {
  stats: PropTypes.shape({
    studentsCount: PropTypes.number,
    coursesCount: PropTypes.number,
  }).isRequired,
  user: PropTypes.object.isRequired,
  allCourses: PropTypes.array.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  fetchDashboardStats: PropTypes.func.isRequired,
  isLoadingAllCourses: PropTypes.bool.isRequired,
  allCoursesPagination: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    stats: state.dashboard.stats,
    allCourses: getAllInstructorCourses(state),
    isLoadingAllCourses: state.instructorCourses.all.isLoading,
    allCoursesPagination: state.instructorCourses.all.pagination
  }
}

export default connect(mapStateToProps, {
  fetchCourses: actions.fetchCourses,
  fetchDashboardStats: actions.fetchDashboardStats
})(withRedirect(Home))
