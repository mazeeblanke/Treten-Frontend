import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TutorDetailsForm from '../../../components/shared/TutorDetailsForm';
import withProfileLayout from '../../layouts/withProfileLayout';


class TutorDetails extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <h5>Update your tutor profile</h5>
          <div className="d-flex align-items-center">
            <p className="m-0 mr-3">View profile</p>
            <img src="/static/images/arrow-right.png"></img>
          </div>
        </div>
         <TutorDetailsForm />
      </div>
    );
  }
}

TutorDetails.propTypes = {

};

export default withProfileLayout(TutorDetails);