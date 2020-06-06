import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { fetchDashboardStats, refreshNewStudents } from '../../../store/actions'
import AdminLayout from '../../layouts/AdminLayout'
import withRedirect from '../../layouts/withRedirect'
import NewStudents from '../../../components/admin/NewStudents'
import DashboardCard from '../../../components/shared/DashboardCard'
import LatestEnrollments from '../../../components/admin/LatestEnrollments'
import { getNewStudents, getIsRefreshingNewStudents } from '../../../store/reducers/dashboard'

class Home extends Component {
  static async getInitialProps ({ reduxStore, res }) {
    await Promise.all([
      reduxStore.dispatch(fetchDashboardStats()),
      reduxStore.dispatch(refreshNewStudents())
    ])
    return {}
  }

  refreshNewStudents = () => {
    if (!this.props.isRefreshingNewStudents) {
      this.props.refreshNewStudents()
    }
  }

  render () {
    const {
      stats,
      newStudents,
      latestEnrollments,
      refreshNewStudents,
      isRefreshingNewStudents
    } = this.props
    return (
      <AdminLayout headerName="Home">
        <section className="courses admin-home has-height-80">
          <div className="container mt-6">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <div className="col-md-6 col-xl-3 mb-4">
                    <DashboardCard
                      statCount={stats.studentsCount}
                      image="/images/admin/prof_cap.png"
                      title="Student count"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <DashboardCard
                      statCount={stats.instructorsCount}
                      image="/images/admin/instructor_count.png"
                      title="Instructor count"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <DashboardCard
                      statCount={stats.coursesCount}
                      image="/images/admin/books.png"
                      title="Course count"
                    />
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <DashboardCard
                      statCount={stats.activeClassesCount}
                      image="/images/admin/active-classes.png"
                      title="Active classes"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <LatestEnrollments latestEnrollments={latestEnrollments} />
                  <NewStudents
                    isRefreshingNewStudents={isRefreshingNewStudents}
                    refreshNewStudents={refreshNewStudents}
                    newStudents={newStudents}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    )
  }
}

Home.propTypes = {
  stats: PropTypes.shape({
    coursesCount: PropTypes.number,
    studentsCount: PropTypes.number,
    instructorsCount: PropTypes.number,
    activeClassesCount: PropTypes.number
  }).isRequired,
  user: PropTypes.object.isRequired,
  newStudents: PropTypes.array.isRequired,
  latestEnrollments: PropTypes.array.isRequired,
  refreshNewStudents: PropTypes.func.isRequired,
  isRefreshingNewStudents: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  latestEnrollments: state.dashboard.latestEnrollments,
  isRefreshingNewStudents: getIsRefreshingNewStudents(state),
  newStudents: getNewStudents(state),
  stats: state.dashboard.stats,
  user: state.user
})

export default connect(
  mapStateToProps,
  {
    refreshNewStudents
  }
)(withRedirect(Home))
