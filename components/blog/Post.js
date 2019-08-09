import React from 'react';
import PropTypes from 'prop-types';

const Post = props => {
  return (
    <div class="card blog-item  mb-3 border-0 mb-6" style={{ maxWidth: '615px' }}>
      <div class="row no-gutters align-items-center">
        <div class="col-sm-12 col-md-12 col-lg-6 blog-image__container">
          <img
            src={props.image}
            class="card-img"
            alt="Best learning environment"
          />
        </div>
        <div class="col-sm-12 col-md-12 col-lg-6">
          <div class="card-body">
            <p className="mb-3">{props.date}</p>
            <h5 class="card-title">{props.title}</h5>
            <p class="card-text">
              {props.content_summary}
            </p>
            <p className="is-flex align-items-center">
              <b className="mr-3">Read more</b>
              <img src="/static/images/arrow-right.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {

};

export default Post;