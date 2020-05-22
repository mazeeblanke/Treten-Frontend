import React from 'react'
import PropTypes from 'prop-types'
import Display from '../shared/Display'
import Link from 'next/link'
import dynamic from 'next/dynamic'
// import ReactHtmlParser from 'react-html-parser'
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

const Post = props => {
  const {
    title,
    blogImage,
    contentSummary,
    isLoadingBlogPosts,
    friendlyPublishedAt,
    blogSlug
  } = props
  return (
    <Link href={`/blog/${blogSlug}`}>
      <div
        className="card blog-item  mb-3 border-0 mb-6"
        style={{ maxWidth: '615px' }}
      >
        <Display if={true}>
          <div className="row no-gutters align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-6 blog-image__container">
              <Display if={!isLoadingBlogPosts}>
                <img
                  src={`${blogImage}`}
                  className="card-img"
                  alt="Best learning environment"
                />
              </Display>
              <Display if={isLoadingBlogPosts}>
                <div className="card-img">
                  <Skeleton height="100%" />
                </div>
              </Display>
            </div>

            <div className="col-sm-12 col-md-12 col-lg-6">
              <div className="card-body">
                <p className="mb-3">
                  <Display if={!isLoadingBlogPosts}>{friendlyPublishedAt}</Display>
                  <Display if={isLoadingBlogPosts}>
                    <Skeleton width={70} />
                  </Display>
                </p>
                <h5 className="card-title">
                  {!isLoadingBlogPosts ? title : <Skeleton width={150} />}
                </h5>
                <p className="card-text">
                  {/* <Display if={!isLoadingBlogPosts}>{ReactHtmlParser(contentSummary)}</Display> */}
                  <Display if={!isLoadingBlogPosts}>{contentSummary.replace(/<\/?[^>]+(>|$)/g, '')}</Display>
                  <Display if={isLoadingBlogPosts}>
                    <Skeleton width={250} count={3} />
                  </Display>
                </p>
                <p className="is-flex align-items-center">
                  <b className="mr-3">
                    {!isLoadingBlogPosts ? 'Read more' : <Skeleton width={50} />}
                  </b>
                  <img src="/images/arrow-right.png" />
                </p>
              </div>
            </div>
          </div>
        </Display>
      </div>
    </Link>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  blogSlug: PropTypes.string.isRequired,
  blogImage: PropTypes.string.isRequired,
  contentSummary: PropTypes.string.isRequired,
  isLoadingBlogPosts: PropTypes.bool.isRequired,
  friendlyPublishedAt: PropTypes.string.isRequired,
}

export default Post
