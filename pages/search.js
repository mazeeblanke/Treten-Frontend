/* eslint-disable */
import Head from 'next/head'
import PropTypes from 'prop-types'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import { connect } from 'react-redux'
import { 
  getSearchCourses, 
  getSearchCoursesSortDirection 
} from '../store/reducers/searchCourses'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import Footer from '../components/shared/Footer'
import Display from '../components/shared/Display'
import { Input, Slider, Select, Button } from 'antd'
import { getUserDetails } from '../store/reducers/user'
import CourseList from '../components/admin/CourseList'
import withMasterLayout from './layouts/withMasterLayout'
import qs from 'query-string'

class Search extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    let extraQueryParams = {}
    if (!req) {
      extraQueryParams = {
        ...qs.parse(location.search)
      }
    }
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourses({
        page: 1,
        pageSize: 8,
        isPublished: 1,
        scope: 'search',
        hasInstructor: 1,
        sort: req ? req.query.sort : extraQueryParams.sort,
        authorId: req ? req.query.authorId : extraQueryParams.authorId,
        category: req ? req.query.category : extraQueryParams.category,
        q: req ? req.query.q : extraQueryParams.q
      })),
    ])
    return {}
  }

  state = {
    searching: false,
    instructorOptions: [],
    courseCategoryOptions: [],
    isFetchingInstructors: false,
    isFetchingCourseCategories: false,
    searchParam: '',
    filters: {
      sort: undefined,
      authorId: undefined,
      category: undefined,
      priceRange: [50, 1000],
      q: ''
    }
  }

  componentDidMount () {
    if (process.browser) {
      const {
        sort,
        authorId,
        category,
        q
      } = qs.parse(location.search)
      // Promise.all([
      //   this.handleInstructorSearch(),
      //   this.handleCategorySearch()
      // ]).then(() => {
      this.setState({
        ...this.state,
        searchParam: q,
        filters: {
          ...this.state.filters,
          sort,
          authorId,
          category,
          q
        }
      })
      // })
    }
  }

  handleCategorySearch = (q) => {
    this.setState({
      isFetchingCourseCategories: true
    })
    this.props.fetchCourseCategories({ q, pageSize: 20 })
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

  handleInstructorSearch = (q) => {
    this.setState({
      isFetchingInstructors: true
    })
    this.props.fetchInstructors({ q, pageSize: 20 })
      .then((res) => {
        this.setState({
          instructorOptions: res.data,
        })
      })
      .finally(() => {
        this.setState({
          isFetchingInstructors: false
        })
      })
  }

  applyFilters = () => {
    const { 
      filters
    } = this.state
    this.setState({
      searching: true
    })
    this.props.fetchCourses({
      ...filters,
      // category: '',
      isPublished: 1,
      scope: 'search',
      hasInstructor: 1,
    })
    .then(() => {
      this.setState({
        searchParam: filters.q
      }, () => this.updateUrl())
    })
    .finally(() => {
      this.setState({
        searching: false
      })
    })
  }

  handlePageChange = ({ 
    page = 1, 
    category, 
    sort = null, 
    authorId=null 
  }) => {
    this.props.fetchCourses({
      page,
      sort,
      authorId,
      category,
      scope: 'search',
    })
  }

  handleCategoryChange = (category) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        category
      }
    })
  }

  updateUrl = () => {
    const queryParams = {
      ...this.state.filters,
      priceRange: undefined
    }
    Router.push(
      `/search?${qs.stringify(queryParams)}`, 
      `/search?${qs.stringify(queryParams)}`, 
      { shallow: true }
    )
  }

  handleInstructorChange = (authorId) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        authorId
      }
    })
  }

  handleTitleChange = (e) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        q: e.target.value
      }
    })
  }

  handleSortChange = (sort) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        sort
      }
    })
  }

  handlePriceChange = (priceRange) => {
    this.setState({
      ...this.state,
      filters: {
        ...this.state.filters,
        priceRange
      }
    })
  }

  render () {
    const {
      user,
      courses,
      isLoading,
      pagination,
    } = this.props
    const {
      filters,
      searchParam,
      instructorOptions,
      courseCategoryOptions,
    } = this.state
    return (
      <>
        <Head>
          <title key="title">
            Treten Academy search results - {filters.q}
          </title>
        </Head>
        <NextSeo
          title={`Treten Academy course search results - ${filters.q}`}
          description={`Search results for ${filters.q}`}
          canonical="https://tretenacademy.com"
          openGraph={{
            url: 'https://tretenacademy.com',
            title: 'Treten Academy - Africa largest virtual lab',
            description: `Search results for ${filters.q}`,
            site_name: 'Treten Academy',
          }}
          twitter={{
            handle: '@tretenacademy',
            site: '@tretenacademy',
            cardType: 'summary_large_image',
          }}
        />
        <section className={`has-white-bg 
          has-full-height 
          ${!searchParam && 'pt-8'}`
        }>
          <div className="container">
            <Display if={!!searchParam}>
              <div className="pt-8 pb-3 text-center">
                <small className="text-center">
                  Your search results for:
                </small>
                {!!searchParam && 
                  <h3 className="text-centercourses__main-text">
                    "{searchParam.toUpperCase()}"
                  </h3>
                }
              </div>
            </Display>
            <div className={`
              row has-light-border 
              justify-content-center 
              mb-5 pt-6 pb-5 search-bar
              `
            }>
              <div className={`col-md-10 pl-4 pr-4`}>
                <div className="row">
                  <div className="col-md-6 col-lg-4 mb-4">
                    <Input 
                      value={filters.q}
                      allowClear={true}
                      onChange={this.handleTitleChange}
                      placeholder="What do you want to learn?" 
                    />
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <Select
                      showArrow={false}
                      allowClear={true}
                      value={filters.sort}
                      onChange={this.handleSortChange}
                      placeholder="Sort by"
                      style={{ width: '100%', height: 50 }}
                    >
                      <Select.Option value={null}>Select sort</Select.Option>
                      <Select.Option value="asc">Asc</Select.Option>
                      <Select.Option value="desc">Desc</Select.Option>
                    </Select>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <Select
                      showSearch
                      size="large"
                      showArrow={false}
                      allowClear={true}
                      filterOption={false}
                      notFoundContent="No match"
                      className="has-full-width"
                      value={filters.category}
                      defaultActiveFirstOption={false}
                      placeholder="Select course category"
                      onSearch={this.handleCategorySearch}
                      onChange={this.handleCategoryChange}
                      style={{ width: '100%', height: 50  }}
                      loading={this.state.isFetchingCourseCategories}
                    >
                      {
                        courseCategoryOptions.map((option) => (
                          <Select.Option key={option.id} value={option.name}>
                            {option.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <Select
                      showSearch
                      size="large"
                      showArrow={false}
                      allowClear={true}
                      filterOption={false}
                      value={filters.authorId}
                      notFoundContent="No match"
                      className="has-full-width"
                      placeholder="Select Instructor"
                      defaultActiveFirstOption={false}
                      style={{ width: '100%', height: 50  }}
                      onSearch={this.handleInstructorSearch}
                      onChange={this.handleInstructorChange}
                      loading={this.state.isFetchingInstructors}
                    >
                      {
                        instructorOptions.map((option) => (
                          <Select.Option 
                            key={option.id} 
                            value={option.name}
                          >
                            {option.name}
                          </Select.Option>
                        ))
                      }
                    </Select>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <Input placeholder="placeholder" disabled/>
                  </div>
                  <div className="col-md-6 col-lg-4 mb-4">
                    <div className="is-flex justify-content-between">
                      <span>Price</span>
                      <span>N{filters.priceRange[0]} - N{filters.priceRange[1]}</span>
                    </div>
                    <Slider 
                      range 
                      onAfterChange={this.handlePriceChange}
                      defaultValue={filters.priceRange} 
                    />
                  </div>
                </div>
              </div>
              <div>
                <Button
                  type="danger"
                  style={{ height: '42px'}}
                  onClick={this.applyFilters}
                  loading={this.state.searching}
                  disabled={this.state.searching}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
            <p className="text-center">{courses.length} result(s) found</p>
          </div>
        </section>
        <section className="courses has-white-bg pt-4 mb-8">
          {/* <hr /> */}
          <div className="container">
            <CourseList
              user={user}
              courses={courses}
              generalView={true}
              isLoading={isLoading}
              pagination={pagination}
              emptyText="No courses found!"
              handlePageChange={this.handlePageChange}
            />
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  user: getUserDetails(state),
  courses: getSearchCourses(state),
  isLoading: state.searchCourses.isLoading,
  pagination: state.searchCourses.pagination,
  getSortDirection: () => {
    return getSearchCoursesSortDirection(state)
  }
})

Search.propTypes = {
  user: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pagination: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
  getSortDirection: PropTypes.func.isRequired,
  fetchCourseCategories: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    fetchCourses: actions.fetchCourses,
    fetchInstructors: actions.fetchInstructors,
    fetchCourseCategories: actions.fetchCourseCategories,
  }
)(withMasterLayout(Search))
