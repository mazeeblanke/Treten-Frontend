import React from 'react';
import PropTypes from 'prop-types';

const CourseHeader = props => {
  return (
    <section className="student-course-header">
      <div className="container">
        <div className="row">
          <div className="col-md-12 pl-6 pr-6">
            <h3 className="pt-8 pb-2 course-header__main-text">
              {props.course.title}
            </h3>
            <div className="d-flex justify-content-start mb-5">
              <div className="mr-3">
                <img className="mr-2" src="/static/images/scholar-grey.png" />
                <span>{props.course.level}</span>
              </div>
              <div>
                <img className="mr-2" src="/static/images/users-grey.png" />
                <span>{props.course.learners} learners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

CourseHeader.propTypes = {

};

export default CourseHeader;