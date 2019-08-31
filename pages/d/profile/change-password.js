import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withProfileLayout from '../../layouts/withProfileLayout';
import ChangePasswordForm from '../../../components/student/ChangePasswordForm';

class ChangePassword extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <h5>Change account password</h5>
        <ChangePasswordForm />
      </div>
    );
  }
}

ChangePassword.propTypes = {

};


export default withProfileLayout(ChangePassword);