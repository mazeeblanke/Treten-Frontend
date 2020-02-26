import CourseForm from '../../../components/admin/CourseForm'
import withAdminLayout from '../../layouts/withAdminLayout'
import * as actions from '../../../store/actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import withCourseForm from '../../layouts/withCourseForm'
import withRedirect from '../../layouts/withRedirect'

/* eslint-disable */
class AddCourse extends Component {
  render () {
    return (
      <>
        <section className="admin-course-header has-white-bg mt-5-neg mb-7">
          <div className="container">
            <div className="row">
              <div className="col-md-12 pl-5 pr-5">
                <div className="row pt-5 pb-5">
                  <div className="col-md-6 d-flex align-items-center mb-3 mt-3">
                    <h3 className="m-0">Add new course</h3>
                  </div>
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mb-3">
                    <Button
                      loading={this.props.isSaving}
                      disabled={this.props.isSaving}
                      onClick={this.props.saveDraft}
                      className="mr-3"
                      style={{ height: '42px', width: '105px' }}
                      type="primary"
                      ghost
                    >
                      Save draft
                    </Button>
                    <Button
                      loading={this.props.isPublishing}
                      disabled={this.props.isPublishing}
                      onClick={this.props.publish}
                      className=""
                      type="danger"
                      style={{ width: '126px', height: '40px' }}
                    >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CourseForm
          errors={this.props.errors}
          addFaq={this.props.addFaq}
          setForm={this.props.setForm}
          prevStep={this.props.prevStep}
          nextStep={this.props.nextStep}
          modulesRef={this.props.modulesRef}
          currentTab={this.props.currentTab}
          courseForm={this.props.courseForm}
        />
      </>
    )
  }
}

AddCourse.propTypes = {
  saveCourse: PropTypes.func.isRequired
}

AddCourse.backText = 'Back to courses'

export default withRedirect(withAdminLayout((connect(null, {
  saveCourse: actions.saveCourse
})(withCourseForm(AddCourse)))))
