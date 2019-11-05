import React from "react";
import PropTypes from "prop-types";
import Display from "../shared/Display";

import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false
});

const Post = props => {
  return (
    <div
      class="card blog-item  mb-3 border-0 mb-6"
      style={{ maxWidth: "615px" }}
    >
      <Display if={true}>
        <div class="row no-gutters align-items-center">
          <div class="col-sm-12 col-md-12 col-lg-6 blog-image__container">
            {!props.isLoadingBlogPosts ? (
              <img
                src={`${props.blog_image}`}
                class="card-img"
                alt="Best learning environment"
              />
            ) : (
							<div class="card-img">
								<Skeleton height="100%" />
							</div>
            )}
          </div>
          <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card-body">
              <p className="mb-3">
                {!props.isLoadingBlogPosts ? (
                  props.friendly_published_at
                ) : (
                  <Skeleton width={70} />
                )}
              </p>
              <h5 class="card-title">
                {!props.isLoadingBlogPosts ? props.title : <Skeleton width={150}/>}{" "}
              </h5>
              <p class="card-text">
                {!props.isLoadingBlogPosts ? (
                  props.content_summary
                ) : (
                  <Skeleton width={250} count={3} />
                )}
              </p>
              <p className="is-flex align-items-center">
                <b className="mr-3">
                  {!props.isLoadingBlogPosts ? "Read more" : <Skeleton width={50} />}
                </b>
                <img src="/static/images/arrow-right.png" />
              </p>
            </div>
          </div>
        </div>
      </Display>
    </div>
  );
};

Post.propTypes = {};

export default Post;
