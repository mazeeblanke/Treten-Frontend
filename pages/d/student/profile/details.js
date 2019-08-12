import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withProfileLayout from '../../../layouts/withProfileLayout';
import PersonalDetailsForm from '../../../../components/student/PersonalDetailsForm';

class Details extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h5>Update your personal details</h5>
        <PersonalDetailsForm />
      </div>
    );
  }
}

Details.propTypes = {

};

export default withProfileLayout(Details);