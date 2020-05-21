import React, { Component } from 'react'
import PersonalDetailsForm from '../../../components/shared/PersonalDetailsForm'
import withProfileLayout from '../../layouts/withProfileLayout'
import withRedirect from '../../layouts/withRedirect'

class Details extends Component {
  render () {
    return (
      <div>
        <h5>Update your personal details</h5>
        <PersonalDetailsForm />
      </div>
    )
  }
}

export default withRedirect(withProfileLayout(Details))
