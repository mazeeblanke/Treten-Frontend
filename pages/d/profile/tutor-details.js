import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonalTutorDetailsForm from '../../../components/shared/PersonalTutorDetailsForm';
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
        {/* <div className="row"> */}
         <PersonalTutorDetailsForm />
        {/* </div> */}


      </div>
    );
  }
}

TutorDetails.propTypes = {

};

export default withProfileLayout(TutorDetails);