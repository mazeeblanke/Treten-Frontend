import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PersonalDetailsForm from '../../../components/shared/PersonalDetailsForm';
import withProfileLayout from '../../layouts/withProfileLayout';


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