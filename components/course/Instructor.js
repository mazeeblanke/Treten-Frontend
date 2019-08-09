import React from 'react';
import PropTypes from 'prop-types';

const Instructor = props => {
  return (
    <section className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 p-0">
            <div className="course-instructor p-5">
              <h5 className="fw-600 mb-4 mt-1">Instructor</h5>
              <img className="rounded-circle" src={props.profile_pic} />
              <h5 className="mt-3 mb-3">{props.fullname}</h5>
              <p>{props.title}</p>
              <p>{props.qualifications}</p>
              <div className="d-flex mt-3">
                <img className="mr-3" src="/static/images/social/linkedin inverted.png" />
                <img className="mr-3" src="/static/images/social/facebook inverted.png" />
                <img className="mr-3" src="/static/images/social/twitter inverted.png" />
              </div>
              <button type="button" class="btn btn-outline-danger mt-5">
                <span>View profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Instructor.propTypes = {

};

export default Instructor;