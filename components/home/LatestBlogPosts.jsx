import React from 'react'
import PropTypes from 'prop-types'
import PostList from '../blog/PostList'

const LatestBlogPosts = props => {
  const { isLoading, latestBlogPosts } = props
  return (
    <section className="blog has-grey-bg pt-8 pb-5">
      <h3 className="text-center blog__main-text mt-3">Latest from our blog</h3>
      <div className="container mt-5">
        <div className="row">
          <PostList
            isLoadingBlogPosts={isLoading}
            posts={latestBlogPosts}
          />
        </div>
      </div>
    </section>
  )
}

LatestBlogPosts.propTypes = {
  latestBlogPosts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
}

export default LatestBlogPosts
