import React, { Component } from 'react'
import withProfileLayout from '../../layouts/withProfileLayout'
import ChangePasswordForm from '../../../components/student/ChangePasswordForm'
import withRedirect from '../../layouts/withRedirect'

class ChangePassword extends Component {
  render () {
    return (
      <div>
        <h5>Change account password</h5>
        <ChangePasswordForm />
      </div>
    )
  }
}

export default withRedirect(withProfileLayout(ChangePassword))
