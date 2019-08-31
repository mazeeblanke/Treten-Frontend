import React from 'react';
import PropTypes from 'prop-types';
import Instructor from '../instructor/Instructor';
import Certifications from '../instructor/Certifications';
import Education from '../instructor/Education';
import Experience from '../instructor/Experience';

const CourseInstructor = props => {
  return (
    <div className="row mt-4">
      <div className="col-md-3 mb-4">
        <Instructor width="100%" hasBorder { ...props.instructor } />
      </div>
      <div className="col-md-4 mb-4">
        <Certifications certifications={props.instructor.certifications} />
      </div>
      <div className="col-md-4 mb-4">
        <Education education={props.instructor.education} />
      </div>
      <div className="col-md-7 mb-6">
        <Experience experience={props.instructor.experience} />
      </div>
    </div>
  );
};

CourseInstructor.propTypes = {

};

export default CourseInstructor;