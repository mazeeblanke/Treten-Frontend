import 'element-theme-default'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Tabs, Select } from 'antd'
import {
  getAllAdminCourses,
  getExpertAdminCourses,
  getAssociateAdminCourses,
  getProfessionalAdminCourses,
  getAdminCoursesSortDirection
} from '../../../store/reducers/adminCourses'
import * as actions from '../../../store/actions'
import AdminLayout from '../../layouts/AdminLayout'
import withRedirect from '../../layouts/withRedirect'
import CourseList from '../../../components/admin/CourseList'
import { getUserDetails } from '../../../store/reducers/user'

const { TabPane } = Tabs
const { Option } = Select

class Courses extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourses({
        page: 1,
        pageSize: 8,
        category: 'all'
      }))
    ])
    return {}
  }

  state = {
    sort: ''
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
    this.props.setTabSortDirection({ category, sort })
    this.props.fetchCourses({
      page,
      category,
      sort
    })
  }

  handleActiveTabChange = (tab) => {
    this.props.handleActiveTabChange({
      tab,
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
      <AdminLayout
        action={
          <Button
            onClick={() => Router.push('/d/admin/add-course')}
            style={{ width: '105px', height: '40px' }}
            type="danger"
          >
            Add New
          </Button>
        }
        headerName="Home"
      >
        <section className="courses has-height-80 mt-5-neg">
          <div className="container pt-7">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <Tabs
                  activeKey={activeTab}
                  onTabClick={this.handleActiveTabChange}
                  tabBarExtraContent={this.operations()}
                >
                  <TabPane tab="All courses" key="all">
                    <CourseList
                      user={user}
                      tab="all"
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
                      courses={expertCourses}
                      isLoading={isLoadingExpertCourses}
                      pagination={expertCoursesPagination}
                      handlePageChange={this.handlePageChange}
                    />
                  </TabPane>
                  {/* <TabPane tab="Bootcamps" key="5">
                      Content of tab 3
                  </TabPane> */}
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    )
  }
}

Courses.propTypes = {
  user: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  allCourses: PropTypes.array.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  expertCourses: PropTypes.array.isRequired,
  getSortDirection: PropTypes.func.isRequired,
  associateCourses: PropTypes.array.isRequired,
  isLoadingAllCourses: PropTypes.bool.isRequired,
  setTabSortDirection: PropTypes.func.isRequired,
  professionalCourses: PropTypes.array.isRequired,
  handleActiveTabChange: PropTypes.func.isRequired,
  isLoadingExpertCourses: PropTypes.bool.isRequired,
  allCoursesPagination: PropTypes.object.isRequired,
  expertCoursesPagination: PropTypes.object.isRequired,
  isLoadingAssociateCourses: PropTypes.bool.isRequired,
  associateCoursesPagination: PropTypes.object.isRequired,
  isLoadingProfessionalCourses: PropTypes.bool.isRequired,
  professionalCoursesPagination: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    user: getUserDetails(state),
    allCourses: getAllAdminCourses(state),
    activeTab: state.adminCourses.activeTab,
    expertCourses: getExpertAdminCourses(state),
    associateCourses: getAssociateAdminCourses(state),
    isLoadingAllCourses: state.adminCourses.all.isLoading,
    professionalCourses: getProfessionalAdminCourses(state),
    allCoursesPagination: state.adminCourses.all.pagination,
    isLoadingExpertCourses: state.adminCourses.expert.isLoading,
    expertCoursesPagination: state.adminCourses.expert.pagination,
    isLoadingAssociateCourses: state.adminCourses.associate.isLoading,
    associateCoursesPagination: state.adminCourses.associate.pagination,
    isLoadingProfessionalCourses: state.adminCourses.professional.isLoading,
    professionalCoursesPagination: state.adminCourses.professional.pagination,
    getSortDirection: (tab) => {
      return getAdminCoursesSortDirection(state, tab)
    }
  }
}

export default connect(mapStateToProps, {
  fetchCourses: actions.fetchCourses,
  setTabSortDirection: actions.setTabSortDirection,
  handleActiveTabChange: actions.handleActiveTabChange
})(withRedirect(Courses))
