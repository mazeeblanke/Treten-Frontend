import React, { Component } from 'react'
import TutorDetailsForm from '../../../components/shared/TutorDetailsForm'
import withProfileLayout from '../../layouts/withProfileLayout'
import withRedirect from '../../layouts/withRedirect'

class TutorDetails extends Component {
  render () {
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
    )
  }
}

export default withRedirect(withProfileLayout(TutorDetails))
