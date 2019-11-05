import React, { Component } from "react";
import PropTypes from "prop-types";

import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false
});

const Blog = props => {
  return (
    <section className="blog has-grey-bg pt-8 pb-5">
      <h3 className="text-center blog__main-text mt-3">Latest from our blog</h3>
      <div className="container mt-5">
        <div className="row">
          {props.latestBlogPosts.map(latestBlogPost => (
            <div className="col-sm-12 col-md-6" key={latestBlogPost.title}>
              <div className="card mb-3 border-0" style={{ maxWidth: "615px" }}>
                <div className="row no-gutters align-items-center">
                  <div className="col-sm-12 col-md-12 col-lg-6 blog-image__container">
                    {!props.isLoading ? (
                      <img
                        src={latestBlogPost.blog_image}
                        className="card-img"
                        alt={latestBlogPost.title}
                      />
                    ) : (
											<div className="card-img" >
												<Skeleton height="100%" />
											</div>
                    )}
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="card-body">
                      {!props.isLoading ? (
                        <p className="mb-3">
                          {latestBlogPost.friendly_published_at}
                        </p>
                      ) : (
                        <Skeleton width={80} />
                      )}
                      <h5 className="card-title">
                        {!props.isLoading ? (
                          <span>{latestBlogPost.title}</span>
                        ) : (
                          <Skeleton />
                        )}
                      </h5>
                      <p className="card-text">
                        {!props.isLoading ? (
                          <span>{latestBlogPost.content_summary}</span>
                        ) : (
                          <Skeleton />
                        )}
                      </p>
                      <p>
                        {!props.isLoading ? <b>Read more</b> : <Skeleton width={45} />}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Blog.propTypes = {};

export default Blog;
