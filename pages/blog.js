import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import withMasterLayout from './layouts/withMasterLayout'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'
import PostList from '../components/blog/PostList'
import { getBlogPosts } from '../store/actions/blogPosts'
import PaginationNav from '../components/shared/PaginationNav'

class Blog extends Component {
  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(actions.fetchBlogPosts())
    return {}
  }

  handlePageChange = page => {
    this.props.fetchBlogPosts({
      page
    }).then(() => {
      window.scrollTo(0, 0)
    })
  };

  render () {
    return (
      <>
        <h3 className="blog__main-text text-center pt-9 mb-6">Blog</h3>
        <PostList
          isLoadingBlogPosts={this.props.blogPosts.isLoadingBlogPosts}
          posts={this.props.blogPosts.all}
        />
        <div className="is-flex justify-content-center pb-5 blog-pagination">
          <Pagination
            {...this.props.blogPosts.pagination}
            itemRender={PaginationNav}
            onChange={this.handlePageChange}
            disabled={this.props.blogPosts.isLoadingBlogPosts}
          />
        </div>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  blogPosts: {
    ...state.blogPosts,
    all: getBlogPosts(state)
  }
})

Blog.propTypes = {
  blogPosts: PropTypes.object.isRequired,
  fetchBlogPosts: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  { fetchBlogPosts: actions.fetchBlogPosts }
)(withMasterLayout(Blog))
