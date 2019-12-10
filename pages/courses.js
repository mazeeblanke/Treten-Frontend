import PropTypes from 'prop-types'
import { Tabs, Select } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import Footer from '../components/shared/Footer'
import withMasterLayout from './layouts/withMasterLayout'
import {
  getAllGeneralCourses,
  getExpertGeneralCourses,
  getAssociateGeneralCourses,
  getProfessionalGeneralCourses,
  getGeneralCoursesSortDirection,
} from '../store/reducers/generalCourses'
import CourseList from '../components/admin/CourseList'
import { getUserDetails } from '../store/reducers/user'

const { TabPane } = Tabs
const { Option } = Select

class Courses extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourses({
        page: 1,
        pageSize: 8,
        isPublished: 1,
        category: 'all',
        scope: 'general',
        hasInstructor: 1,
      })),
    ])
    return {}
  }

  operations = () => {
    const { getSortDirection, activeTab } = this.props
    return (
      <div className="d-none d-sm-none d-md-block">
        <span className="mr-3">
          <b>Sort By:</b>
        </span>
        <Select
          value={getSortDirection(activeTab)}
          onChange={(value) => this.handlePageChange({
            tab: activeTab,
            sort: value
          })
          }
          placeholder="Sort by"
          style={{ width: 150 }}
        >
          <Option value=''>...</Option>
          <Option value="asc">Asc</Option>
          <Option value="desc">Desc</Option>
        </Select>
      </div>
    )
  }

  handlePageChange = ({ page = 1, tab: category, sort = null }) => {
    if (!sort) sort = this.props.getSortDirection(category)
    this.props.setTabSortDirection({ category, sort, scope: 'general' })
    this.props.fetchCourses({
      page,
      sort,
      category,
      isPublished: 1,
      hasInstructor: 1,
      scope: 'general',
    })
  }

  handleActiveTabChange = (tab) => {
    this.props.handleActiveTabChange({
      tab,
      scope: 'general',
      isPublished: 1,
      hasInstructor: 1,
      sort: this.props.getSortDirection(tab)
    })
  }

  render () {
    const {
      user,
      activeTab,
      allCourses,
      expertCourses,
      associateCourses,
      professionalCourses,
      isLoadingAllCourses,
      allCoursesPagination,
      isLoadingExpertCourses,
      expertCoursesPagination,
      isLoadingAssociateCourses,
      associateCoursesPagination,
      isLoadingProfessionalCourses,
      professionalCoursesPagination
    } = this.props
    return (
      <>
        <section className="has-grey-bg has-full-height">
          <div className="container">
            <h3 className="text-center pt-8 courses__main-text">Courses</h3>
            <div className="row justify-content-center mb-5">
              <div className="col-md-7 pl-4 pr-4">
                <p className="lh-30 fs-16 text-center">
                  Flatland culture star stuff harvesting star light two ghostly white figures in
                  coveralls and helmets are soflty dancing vanquish the impossible invent the
                  universe.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="courses has-white-bg pt-4 mb-8">
          <hr />
          <div className="container">
            <Tabs
              activeKey={activeTab}
              onTabClick={this.handleActiveTabChange}
              tabBarExtraContent={this.operations()}
            >
              <TabPane tab="All courses" key="all">
                <CourseList
                  user={user}
                  tab="all"
                  generalView={true}
                  courses={allCourses}
                  isLoading={isLoadingAllCourses}
                  pagination={allCoursesPagination}
                  handlePageChange={this.handlePageChange}
                />
              </TabPane>
              <TabPane tab="Associate level" key="associate">
                <CourseList
                  user={user}
                  tab="associate"
                  generalView={true}
                  courses={associateCourses}
                  isLoading={isLoadingAssociateCourses}
                  pagination={associateCoursesPagination}
                  handlePageChange={this.handlePageChange}
                />
              </TabPane>
              <TabPane tab="Professional level" key="professional">
                <CourseList
                  user={user}
                  tab="professional"
                  generalView={true}
                  courses={professionalCourses}
                  isLoading={isLoadingProfessionalCourses}
                  handlePageChange={this.handlePageChange}
                  pagination={professionalCoursesPagination}
                />
              </TabPane>
              <TabPane tab="Expert level" key="expert">
                <CourseList
                  tab="expert"
                  user={user}
                  generalView={true}
                  courses={expertCourses}
                  isLoading={isLoadingExpertCourses}
                  pagination={expertCoursesPagination}
                  handlePageChange={this.handlePageChange}
                />
              </TabPane>
            </Tabs>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: getUserDetails(state),
  allCourses: getAllGeneralCourses(state),
  activeTab: state.generalCourses.activeTab,
  expertCourses: getExpertGeneralCourses(state),
  associateCourses: getAssociateGeneralCourses(state),
  isLoadingAllCourses: state.generalCourses.all.isLoading,
  professionalCourses: getProfessionalGeneralCourses(state),
  allCoursesPagination: state.generalCourses.all.pagination,
  isLoadingExpertCourses: state.generalCourses.expert.isLoading,
  expertCoursesPagination: state.generalCourses.expert.pagination,
  isLoadingAssociateCourses: state.generalCourses.associate.isLoading,
  associateCoursesPagination: state.generalCourses.associate.pagination,
  isLoadingProfessionalCourses: state.generalCourses.professional.isLoading,
  professionalCoursesPagination: state.generalCourses.professional.pagination,
  getSortDirection: (tab) => {
    return getGeneralCoursesSortDirection(state, tab)
  }
})

Courses.propTypes = {
  user: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  allCourses: PropTypes.array.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  expertCourses: PropTypes.array.isRequired,
  getSortDirection: PropTypes.func.isRequired,
  associateCourses: PropTypes.array.isRequired,
  setTabSortDirection: PropTypes.func.isRequired,
  isLoadingAllCourses: PropTypes.bool.isRequired,
  professionalCourses: PropTypes.array.isRequired,
  handleActiveTabChange: PropTypes.func.isRequired,
  isLoadingExpertCourses: PropTypes.bool.isRequired,
  allCoursesPagination: PropTypes.object.isRequired,
  expertCoursesPagination: PropTypes.object.isRequired,
  isLoadingAssociateCourses: PropTypes.bool.isRequired,
  associateCoursesPagination: PropTypes.object.isRequired,
  isLoadingProfessionalCourses: PropTypes.bool.isRequired,
  professionalCoursesPagination: PropTypes.object.isRequired,
}

export default connect(
  mapStateToProps,
  {
    fetchCourses: actions.fetchCourses,
    setTabSortDirection: actions.setTabSortDirection,
    handleActiveTabChange: actions.handleActiveTabChange,
  }
)(withMasterLayout(Courses))
