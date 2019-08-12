import InstructorList from '../components/instructor/InstructorList';
import withMasterLayout from './layouts/withMasterLayout';
import Footer from '../components/shared/Footer';
import * as actions from '../store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MeetTheInstructor extends Component {

  state = {
    instructors: [
      {
        fullname: 'Mohammed Hassan',
        profile_pic: '/static/images/instructors/instructor1lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Timothy Holloway',
        profile_pic: '/static/images/instructors/instructor2lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Cynthia Oluwabusola',
        profile_pic: '/static/images/instructors/instructor3lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Beverly Onunyere',
        profile_pic: '/static/images/instructors/instructor4lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Mohammed Hassan',
        profile_pic: '/static/images/instructors/instructor1lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Timothy Holloway',
        profile_pic: '/static/images/instructors/instructor3lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Cynthia Oluwabusola',
        profile_pic: '/static/images/instructors/instructor2lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
      {
        fullname: 'Beverly Onunyere',
        profile_pic: '/static/images/instructors/instructor4lg.png',
        title: 'Title of instructor goes here',
        qualifications: "Instructor qualifications go here. Hey, you know how I'm, like, always trying to save the planet?"
      },
    ],
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
        <InstructorList instructors={this.state.instructors} />
        <Footer />
      </>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}


export default connect(mapStateToProps, actions)(withMasterLayout(MeetTheInstructor));