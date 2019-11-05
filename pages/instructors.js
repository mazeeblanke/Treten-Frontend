import InstructorList from '../components/instructor/InstructorList';
import withMasterLayout from './layouts/withMasterLayout';
import Footer from '../components/shared/Footer';
import * as actions from '../store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getInstructors } from '../store/reducers/instructor';

class MeetTheInstructor extends Component {

  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(actions.fetchInstructors({ pageSize: 8 }));
    return {}
  }

  state = {
  }

  render() {
    return (
      <>
        <section className="meet-the-instructors mt-2 pb-2">
          <h3 className="text-center instructors__main-text pt-5">
            Meet our Instructors
          </h3>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <p className="text-center instructors__sub-text pb-4">
                  Our facilitators are successful Industry experts who not only possess
                  commendable years of experience but are also amongst the top 60,000+
                  recognized CCIE experts across the globe.
                </p>
              </div>
            </div>
          </div>
        </section>
        <InstructorList isLoading={this.props.instructors.isLoading} instructors={this.props.instructors.all} />
        <Footer />
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    instructors: {
      ...state.instructor,
      all: getInstructors(state)
    },
  }
}


export default connect(mapStateToProps)(withMasterLayout(MeetTheInstructor));