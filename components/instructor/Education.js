import React from 'react';
import PropTypes from 'prop-types';

const Education = props => {
  return (
    <div className="card instructor-education mb-2 mb-3 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Education</h5>
          {
            props.education.map((_education) => (
              <div className="_education mb-3 p-2">
                <div className="d-flex justify-content-sm-between">
                  <h6 className="fw-600">
                    {_education.institutionName}
                  </h6>
                  <small className="ml-3">
                    {_education.datePeriod}
                  </small>
                </div>
                <div>
                  <p className="mb-1 is-grey-dark">{ _education.qualification }</p>
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
};

Education.propTypes = {

};

export default Education;