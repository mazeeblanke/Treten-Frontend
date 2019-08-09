import PropTypes from 'prop-types';
import React from 'react';

const Experience = props => {
  return (
    <div className="card instructor-experience mb-4 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Experience</h5>
          {
            props.experience.map((_experience) => (
              <div className="_experience mb-2 p-2">
                <div className="d-flex justify-content-sm-between">
                  <h6 className="fw-600">
                    {_experience.company}
                  </h6>
                  <small>
                    {_experience.datePeriod}
                  </small>
                </div>
                <div>
                  <p className="mb-1 is-grey-dark">{ _experience.position }</p>
                  <p className="mb-1 is-grey-dark">{ _experience.summary }</p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
};

Experience.propTypes = {

};

export default Experience;