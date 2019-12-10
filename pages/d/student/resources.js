import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Button, Select, Modal } from 'antd'
import * as actions from '../../../store/actions'
import notifier from 'simple-react-notifications'
import AdminLayout from '../../layouts/AdminLayout'
import { convertToFormData } from '../../../lib/helpers'
import Display from '../../../components/shared/Display'
import EmptyState from '../../../components/shared/EmptyState'
import ResourcesForm from '../../../components/shared/ResourcesForm'
import {
  getResources,
  resourcesIsLoading,
  getResourcesPagination,
  getResourcesCategoryId,
  getResourcesSortDirection,
} from '../../../store/reducers/resources'
import ResourcesList from '../../../components/resources/ResourcesList'
import withRedirect from '../../layouts/withRedirect'
import { userIsInstructor } from '../../../store/reducers/user'

const { Option } = Select

class Resources extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchResources({
        authorId: reduxStore.getState().user.id
      }))
    ])
    return {}
  }

  state = {
    resourcesForm: {
      title: null,
      courseId: null,
      file: null,
      isLoading: false
    },
    courseOptions: [],
    courseCategoryOptions: [],
    isShowingAddResourcesForm: false,
    isFetchingCourseCategories: false,
  }

  handlePageChange = ({ page = 1, categoryId = null, sort = null }) => {
    this.props.fetchResources({
      page,
      categoryId,
      sort,
      authorId: this.props.user.id
    })
  }

  handleSortChange = (sort) => {
    const { pagination, categoryId, setSortDirection, user } = this.props
    setSortDirection(sort)
    this.handlePageChange({
      pageSize: pagination.pageSize,
      page: pagination.page,
      authorId: user.id,
      categoryId,
      sort
    })
  }

  handleCategoryChange = (categoryId) => {
    const { setCategoryId, pagination, user, sort } = this.props
    setCategoryId(categoryId)
    this.handlePageChange({
      pageSize: pagination.pageSize,
      page: pagination.page,
      authorId: user.id,
      categoryId,
      sort
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({
      resourcesForm: {
        ...this.state.resourcesForm,
        isLoading: true
      }
    })
    const resourceForm = convertToFormData(this.state.resourcesForm)
    this.props.addResource(resourceForm)
      .then(() => {
        this.setState({
          isShowingAddResourcesForm: false,
          resourcesForm: {
            title: null,
            courseId: null,
            file: null,
            isLoading: false
          }
        })
        notifier.success('Successfully added resource')
      })
      .catch(() => {
        this.setState({
          resourcesForm: {
            ...this.state.resourcesForm,
            isLoading: false
          }
        })
        notifier.error('ERROR! Unable to add the resource')
      })
  }

  addNew = () => {
    this.setState({
      isShowingAddResourcesForm: true
    })
  }

  closeModal = () => {
    this.setState({
      isShowingAddResourcesForm: false
    })
  }

  searchCourses = (searchQuery) => {
    this.props.searchCourses({
      q: searchQuery,
      notAssigned: userIsInstructor(this.props.user) ? 0 : null,
      // minimal: 0,
      authorId: userIsInstructor(this.props.user) ? this.props.user.id : null
    }).then(({ data }) => {
      this.setState({
        courseOptions: data.data
      })
    })
  }

  setResourcesForm = ({ name, value }) => {
    this.setState({
      resourcesForm: {
        ...this.state.resourcesForm,
        [name]: value
      }
    })
  }

  onSearch = (query) => {
    this.setState({
      isFetchingCourseCategories: true
    })
    this.props.fetchCourseCategories({ q: query })
      .then((res) => {
        this.setState({
          courseCategoryOptions: res.data,
        })
      })
      .finally(() => {
        this.setState({
          isFetchingCourseCategories: false
        })
      })
  }

  renderResourcesView () {
    const {
      user,
      sort,
      resources,
      isLoading,
      pagination,
      categoryId,
    } = this.props
    return (
      <AdminLayout headerName="Resources" action={
        <Display if={
          user.role === 'instructor' ||
            user.role === 'admin'
        }>
          <Button
            style={{ width: '102px', height: '42px' }}
            type="danger"
            onClick={this.addNew}
          >
            Add new
          </Button>
        </Display>
      }>
        <section className="student-resources has-full-height">
          <div className="has-white-bg">
            <div className="container mt-5-neg">
              <div className="row has-border-bottom">
                <div className="col-md-12 pr-6 pl-6">
                  <div className="student-resources__menu-bar row justify-content-sm-between">
                    <div className="col-sm-12 col-lg-3 col-md-4 mt-4 mb-4">
                      <Select
                        showSearch
                        size="large"
                        showArrow={false}
                        allowClear={true}
                        value={categoryId}
                        filterOption={false}
                        style={{ width: 250 }}
                        onSearch={this.onSearch}
                        notFoundContent="No match"
                        className="has-full-width"
                        defaultActiveFirstOption={false}
                        onChange={this.handleCategoryChange}
                        loading={this.state.isFetchingCourseCategories}
                      >
                        <Option value={null} selected disabled>Select course category</Option>
                        {
                          this.state.courseCategoryOptions.map((option) => (
                            <Option key={option.id} value={option.id}>
                              {option.name}
                            </Option>
                          ))
                        }
                      </Select>
                    </div>
                    <div className={`
                      col-sm-12 col-lg-4 
                      ol-md-5 offset-md-3 
                      d-flex justify-content-md-end 
                      align-items-center mt-4 mb-4
                    `}>
                      <span className="mr-3">
                        <b>Sort By:</b>
                      </span>
                      <Select
                        style={{ width: 120 }}
                        onChange={this.handleSortChange}
                        value={sort}
                      >
                        <Option value="asc">Asc</Option>
                        <Option value="desc">Desc</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container has-height-85">
            {!resources.length && (
              <div className="row has-full-height">
                <div className="col-md-12 pr-6 pl-6">
                  <EmptyState emptyText="No resources found" />
                </div>
              </div>
            )}
            <ResourcesList
              sort={sort}
              resources={resources}
              isLoading={isLoading}
              categoryId={categoryId}
              pagination={pagination}
              // downloadResource={downloadResource}
              handlePageChange={this.handlePageChange}
            />
          </div>
        </section>
      </AdminLayout>
    )
  }

  render () {
    return (
      <>
        {this.renderResourcesView()}
        {this.state.isShowingAddResourcesForm && (
          <Modal
            centered
            footer={null}
            width="464px"
            height="514px"
            onCancel={this.closeModal}
            wrapClassName="batch-form-modal"
            visible={this.state.isShowingAddResourcesForm}
            title={
              <div className="d-flex align-items-center justify-content-between">
                <h5>Add new resource</h5>
              </div>
            }
          >
            <ResourcesForm
              handleSubmit={this.handleSubmit}
              searchCourses={this.searchCourses}
              showBatchForm={this.showBatchForm}
              resourcesForm={this.state.resourcesForm}
              setResourcesForm={this.setResourcesForm}
              courseOptions={this.state.courseOptions}
            />
          </Modal>
        )}
      </>
    )
  }
}

Resources.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string,
    id: PropTypes.number,
    userableId: PropTypes.string,
  }).isRequired,
  categoryId: PropTypes.number,
  sort: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resources: PropTypes.array.isRequired,
  addResource: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  searchCourses: PropTypes.func.isRequired,
  setCategoryId: PropTypes.func.isRequired,
  fetchResources: PropTypes.func.isRequired,
  setSortDirection: PropTypes.func.isRequired,
  fetchCourseCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    resources: getResources(state),
    isLoading: resourcesIsLoading(state),
    sort: getResourcesSortDirection(state),
    pagination: getResourcesPagination(state),
    categoryId: getResourcesCategoryId(state)
  }
}

export default connect(mapStateToProps, {
  addResource: actions.addResource,
  searchCourses: actions.searchCourses,
  fetchResources: actions.fetchResources,
  setCategoryId: actions.setResourcesCategoryId,
  setSortDirection: actions.setResourcesSortDirection,
  fetchCourseCategories: actions.fetchCourseCategories,
})(withRedirect(Resources))
