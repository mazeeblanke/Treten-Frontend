import React from 'react';
import PropTypes from 'prop-types';

const CourseHeader = props => {
  return (
    <section style={{ height: props.user.role === 'admin' ? '205px' : null }} className={`student-course-header has-white-bg mt-5-neg pt-5 ${props.className}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 pl-6 pr-6">
            <h3 className="mb-5 course-header__main-text">
              {props.course.title}
            </h3>
            <div className="d-flex justify-content-start">
              <div className="mr-3">
                <img className="mr-2 mt-1 h1" src="/static/images/scholar-grey.png" />
                <span>{props.course.level}</span>
              </div>
              <div>
                <img className="mr-2 mt-0 h09" src="/static/images/users-grey.png" />
                <span>{props.course.learners} learners</span>
              </div>
            </div>
          </div>
          {props.children}
        </div>
      </div>
    </section>
  );
};

CourseHeader.propTypes = {

};

export default CourseHeader;