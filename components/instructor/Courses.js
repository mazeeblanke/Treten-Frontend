import React from 'react';
import PropTypes from 'prop-types';

const Courses = props => {
  return (
    <div className="card instructor-experience mb-9  mt-2 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Courses</h5>
          {
            props.courses.map((course) => (
              <div className="course mb-2 p-2">
                <div className="d-flex justify-content-sm-between">
                  <h6 className="fw-600">
                    {course.title}
                  </h6>
                  <span className="is-red">
                    view
                  </span>
                </div>
                <p>{course.level}</p>
                <div>
                  <p className="mb-1 is-grey-dark">{ course.excerpt }</p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
};

Courses.propTypes = {

};

export default Courses;