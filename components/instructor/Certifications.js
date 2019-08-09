import React from 'react';
import PropTypes from 'prop-types';

const Certifications = props => {
  return (
    <div className="card instructor-certifications mb-4 pb-1">
      <div className="card-body pb-4">
        <h5 className="card-title mb-3 p-2">Certifications</h5>
          {
            props.certifications.map((certification) => (
              <div className="certification d-flex justify-content-sm-between mb-3 p-2">
                <div>
                  <h6 className="fw-600">
                    {certification.title}
                  </h6>
                  <small>
                    {certification.datePeriod}
                  </small>
                </div>
                <div>
                  <img src={certification.logo} />
                </div>
              </div>
            ))
          }
      </div>
    </div>
  );
};

Certifications.propTypes = {

};

export default Certifications;