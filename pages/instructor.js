import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Certifications from '../components/instructor/Certifications'
import withMasterLayout from './layouts/withMasterLayout'
import Experience from '../components/instructor/Experience'
import Instructor from '../components/instructor/Instructor'
import Education from '../components/instructor/Education'
import Courses from '../components/instructor/Courses'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'
import { getInstructor } from '../store/reducers/instructor'

class InstructorProfile extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await reduxStore.dispatch(actions.fetchInstructor(req.params.instructorSlug))
    return {}
  }

  render () {
    return (
      <>
        <section className="instructor-profile pt-9 pb-2">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-3">
                <Instructor width="100%" wrapperBorder {...this.props.instructor} />
              </div>
              <div className="col-sm-12 col-md-9">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <Certifications
                      certifications={this.props.instructor.userable.certifications}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Experience experience={this.props.instructor.userable.workExperience} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Education education={this.props.instructor.userable.education} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Courses courses={this.props.instructor.courses} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

InstructorProfile.propTypes = {
  instructor: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  instructor: getInstructor(state)
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(InstructorProfile))
