import React from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

const PostList = props => {
  const { posts, isLoadingBlogPosts } = props
  return (
    <section>
      <div className="container">
        <div className="row">
          {posts.map(post => (
            <div key={post.id} className="col-md-6">
              <Post
                title={post.title}
                blogImage={post.blogImage}
                blogSlug={post.blogSlug}
                contentSummary={post.contentSummary}
                isLoadingBlogPosts={isLoadingBlogPosts}
                friendlyPublishedAt={post.friendlyPublishedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  isLoadingBlogPosts: PropTypes.bool.isRequired,
}

export default PostList
