import withMasterLayout from "../pages/layouts/withMasterLayout";
import Footer from "../components/shared/Footer";
import * as actions from "../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import PostList from "../components/blog/PostList";
import { Pagination } from "antd";
import { getBlogPosts } from "../store/actions/blogPosts";

class Blog extends Component {
  static async getInitialProps({ reduxStore }) {
    await reduxStore.dispatch(actions.fetchBlogPosts());
    // console.log(reduxStore.getState())
    return {};
  }

  state = {};

  handlePageChange = page => {
    this.props.fetchBlogPosts({
      page
    });
  };

  render() {
    return (
      <>
        <h3 className="blog__main-text text-center pt-9 mb-6">Blog</h3>
        <PostList
          isLoadingBlogPosts={this.props.blogPosts.isLoadingBlogPosts}
          posts={this.props.blogPosts.all}
        />
        {/* {!this.props.blogPosts.isLoadingBlogPosts ? ( */}
          <div className="is-flex justify-content-center pb-5 blog-pagination">
            <Pagination
              {...this.props.blogPosts.pagination}
							onChange={this.handlePageChange}
							disabled={this.props.blogPosts.isLoadingBlogPosts}
            />
          </div>
        {/* ) : null} */}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    blogPosts: {
      ...state.blogPosts,
      all: getBlogPosts(state)
    }
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(withMasterLayout(Blog));
