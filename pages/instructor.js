import Certifications from '../components/instructor/Certifications';
import withMasterLayout from './layouts/withMasterLayout';
import Experience from '../components/instructor/Experience';
import Instructor from '../components/instructor/Instructor';
import Education from '../components/instructor/Education';
import Courses from '../components/instructor/Courses';
import Footer from '../components/shared/Footer';
import * as actions from '../store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class InstructorProfile extends Component {

  state = {
    instructor: {
      profile_pic: '/static/images/instructors/instructor1lg.png',
      fullname: 'Instructor name here',
      title: 'Title of instructor goes here',
      qualifications: "Bio here. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? God help us, we're in the hands of engineers.",
      social_links: {
        facebook: 'wehjwe',
        linkedin: 'ewewi',
        twitter: 'ejkerjk'
      },
      experience: [
        {
          company: 'Microsoft',
          datePeriod: 'Apr 2017 - present',
          position: 'Lead Trainer',
          summary: 'Did he just throw my cat out of the window? You really think you can fly that thing? Jaguar shark!'
        },
        {
          company: 'Dell Technology',
          datePeriod: 'Dec 2017 - Jan 2018',
          position: 'Technology Associate',
          summary: 'Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.'
        },
      ],
      certifications: [
        {
          title: 'Certification title',
          logo: '/static/images/certifications/cisco.png',
          datePeriod: 'Apr 2017 - present'
        },
        {
          title: 'Certification title',
          logo: '/static/images/certifications/microsoft.png',
          datePeriod: 'Apr 2017 - present'
        },
        {
          title: 'Certification title',
          logo: '/static/images/certifications/microsoft.png',
          datePeriod: 'Apr 2017 - present'
        },
      ],
      courses: [
        {
          title: 'CCNA R&S',
          level: 'Expert',
          excerpt: 'Brief course description goes here. Did he just throw my cat out of the window? You really think you can fly that thing? Jaguar shark! '
        }
      ],
      education: [
        {
          institutionName: 'Name of institution',
          qualification: 'Qualification obtained from institution',
          datePeriod: 'Apr 2009 - Sept 2014'
        },
        {
          institutionName: 'Name of institution',
          qualification: 'Qualification obtained from institution',
          datePeriod: 'Apr 2009 - Sept 2014'
        },
        {
          institutionName: 'Name of institution',
          qualification: 'Qualification obtained from institution',
          datePeriod: 'Apr 2009 - Sept 2014'
        },
      ]
    }
  }

  render() {
    return (
      <>
        <section className="instructor-profile mt-6 pb-2">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-3">
                <Instructor width="100%" hasBorder { ...this.state.instructor } />
              </div>
              <div className="col-sm-12 col-md-9">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <Certifications certifications={this.state.instructor.certifications} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Experience experience={this.state.instructor.experience} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Education education={this.state.instructor.education} />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <Courses courses={this.state.instructor.courses} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
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


export default connect(mapStateToProps, actions)(withMasterLayout(InstructorProfile));