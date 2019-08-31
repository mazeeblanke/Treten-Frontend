import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
// import EmptyState from '../../../components/shared/EmptyState';
import { Button } from 'antd';
import AddCourseForm from '../../../components/admin/AddCourseForm';

class AddCourse extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  saveDraft = () => {

  }

  publish = () => {

  }

  render() {
    return (
      <>
        <section className="admin-course-header has-white-bg mt-5-neg mb-7">
          <div className="container">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row pt-5 pb-5">
                  <div className="col-md-6 d-flex align-items-center mb-3 mt-3">
                    <h3 className="m-0">Add new course</h3>
                  </div>
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mb-3">
                    <Button
                      onClick={this.saveDraft}
                      className="mr-3"
                      style={{ height: '42px', width: '105px' }}
                      type="primary"
                      ghost
                    >
                      Save draft
                    </Button>
                    <Button onClick={this.publish} className="" type="danger" style={{ width: '126px', height: '40px' }} >
                      Publish
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AddCourseForm />
      </>
    );
  }
}

AddCourse.propTypes = {

};

AddCourse.backText = 'Back to courses'

export default withAdminLayout(AddCourse);

// TODO: This component talks directly to the redux store to see if the data for the course is valid,
// then calls/trigers the



