import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import EmptyState from '../../../components/shared/EmptyState';
import { Button, Tabs } from 'antd';
import Display from '../../../components/shared/Display';
import Link from 'next/link';
import CourseSchedule from '../../../components/student/CourseSchedule';
import CourseHeader from '../../../components/student/CourseHeader';
import CourseMaterials from '../../../components/student/CourseMaterials';
import CourseInstructor from '../../../components/student/CourseInstructor';
const TabPane = Tabs.TabPane;

const courseTypes = [ 'remote', 'on-demand', 'onsite' ];

class Course extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    course: {
      title: 'Course title goes here, and it just keeps going',
      level: 'Professional level',
      type: 'remote',
      learners: '250',
      startDate: 'Monday, 01 Aug 2019',
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
        ],
      },
      content:{
        availableDate: 'Monday, 01 Aug 2019',
        videos: [
          {
            videoUrl: '',
            poster: '/static/images/videos/video1.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/static/images/videos/video2.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/static/images/videos/video3.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
        ]
      },
      materials: [
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
      ]
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

  }

  render() {
    return (
      <>
        <CourseHeader course={this.state.course} />
        <section className="student-course-dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <Tabs defaultActiveKey="Schedule">
                  <TabPane tab="Schedule" key="Schedule">
                    <CourseSchedule course={this.state.course} />
                  </TabPane>
                  <TabPane tab="Course materials" key="Course materials">
                    <CourseMaterials course={this.state.course} />
                  </TabPane>
                  <TabPane tab="Instructor" key="Instructor">
                    <CourseInstructor instructor={this.state.course.instructor} />
                  </TabPane>
                  <TabPane tab="Review course" key="Review course">Content of Tab Pane 3</TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

Course.propTypes = {

};

Course.backText = 'Back to courses'

export default withAdminLayout(Course);