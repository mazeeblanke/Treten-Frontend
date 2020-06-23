import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import ReactHtmlParser from 'react-html-parser'
import Footer from '../components/shared/Footer'
import withMasterLayout from './layouts/withMasterLayout'
import { getBlogPost } from '../store/reducers/blogPosts'

class Blog extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await reduxStore.dispatch(actions.fetchBlogPost(
      req ? req.params.blogSlug : location.pathname.split('/').pop()
    ))
    return {}
  }

  render () {
    const { blogPost } = this.props
    return (
      <>
        <section
          style={{
            background:
              `linear-gradient(0deg, rgba(115, 115, 115, 0.3), rgba(0, 0, 0, 0.68)), url(${blogPost.blogImage})`,
            height: '300px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPositionY: 'center'
          }}
        >
          <div className="d-flex flex-column justify-content-center has-full-height">
            <h3 className="blog-post__main-text text-center pt-7 is-white mb-3">
              {blogPost.title}
            </h3>
            <p className="text-center is-smokewhite">{blogPost.author.name}</p>
          </div>
        </section>
        <section>
          <div className="container pt-7 pb-8">
            <div className="row justify-content-center">
              <div className="col-md-8 col-sm-12">
                <p>{blogPost.friendlyPublishedAt}</p>
                {ReactHtmlParser(blogPost.body)}
                {/* <p className="mt-4">Related posts</p>
                <a href="/" className="related-link mb-4 pb-1">
                  My dad once told me, laugh and the world laughs with you
                </a>
                <br />
                <br />
                <a href="/" className="related-link pb-1">
                  My dad once told me, laugh and the world laughs with you
                </a> */}
                {/* <a className"related-link">Checkmate... This thing comes fully loaded.</a> */}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

Blog.propTypes = {
  blogPost: PropTypes.string
}

const mapStateToProps = (state) => ({
  blogPost: getBlogPost(state)
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(Blog))
