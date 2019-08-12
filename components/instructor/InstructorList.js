import React from 'react';
import PropTypes from 'prop-types';
import Instructor from './Instructor';

const InstructorList = props => {
  return (
    <section className="pb-4">
      <div className="container">
        <div className="row">
          {
            props.instructors.map((instructor) => (
              <div key={instructor.title} className="col-sm-12 col-md-6 col-lg-3">
                <Instructor { ...instructor } />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

InstructorList.propTypes = {

};

export default InstructorList;