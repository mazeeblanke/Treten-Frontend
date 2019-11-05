import React from "react";
import PropTypes from "prop-types";
import Post from "./Post";

const PostList = props => {
  return (
    <section>
      <div className="container">
        <div className="row">
            {props.posts.map(post => (
              <div className="col-md-6">
                <Post isLoadingBlogPosts={props.isLoadingBlogPosts} {...post} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

PostList.propTypes = {};

export default PostList;
