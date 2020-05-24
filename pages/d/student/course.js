import React, { Component } from 'react'
import withAdminLayout from '../../layouts/withAdminLayout'
import { Tabs } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions'
import CourseSchedule from '../../../components/student/CourseSchedule'
import CourseHeader from '../../../components/student/CourseHeader'
import PropTypes from 'prop-types'
import CourseMaterials from '../../../components/student/CourseMaterials'
import CourseInstructor from '../../../components/student/CourseInstructor'
import CourseReviewForm from '../../../components/student/CourseReviewForm'
import InstructorReviewForm from '../../../components/student/InstructorReviewForm'
import withRedirect from '../../layouts/withRedirect'
import { getCourse } from '../../../store/reducers/course'
import { getUserDetails } from '../../../store/reducers/user'
const TabPane = Tabs.TabPane

class Course extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourse({
        slug: req ? req.params.courseSlug : location.pathname.split('/').pop(),
        enrolled: 1
      }))
    ])
    return {}
  }

  state = {
    course: {
      title: 'Course title goes here, and it just keeps going',
      level: 'Professional',
      type: 'remote',
      learners: '250',
      category: {
        name: 'wewew'
      },
      startDate: 'Monday, 01 Aug 2019',
      instructor: {
        profile_pic: '/images/instructors/instructor1lg.png',
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
          }
        ],
        certifications: [
          {
            title: 'Certification title',
            logo: '/images/certifications/cisco.png',
            datePeriod: 'Apr 2017 - present'
          },
          {
            title: 'Certification title',
            logo: '/images/certifications/microsoft.png',
            datePeriod: 'Apr 2017 - present'
          },
          {
            title: 'Certification title',
            logo: '/images/certifications/microsoft.png',
            datePeriod: 'Apr 2017 - present'
          }
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
          }
        ]
      },
      content: {
        availableDate: 'Monday, 01 Aug 2019',
        videos: [
          {
            videoUrl: '',
            poster: '/images/videos/video1.png',
            title: 'This is where the title of this course content goes, and if longer, extends this way. See?',
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/images/videos/video2.png',
            title: 'This is where the title of this course content goes, and if longer, extends this way. See?',
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/images/videos/video3.png',
            title: 'This is where the title of this course content goes, and if longer, extends this way. See?',
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          }
        ]
      },
      materials: [
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team'
        }
      ]
    }
  }

  render () {
    const {
      user,
      course,
      addCourseReview,
      editCourseReview,
      addInstructorReview,
      editInstructorReview
    } = this.props
    return (
      <>
        <CourseHeader {...this.props} course={course} />
        <section className="student-course-dashboard mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <Tabs defaultActiveKey="Schedule">
                  <TabPane tab="Schedule" key="Schedule">
                    <CourseSchedule timetable={course.timetable} />
                  </TabPane>
                  <TabPane tab="Course materials" key="Course materials">
                    <CourseMaterials resources={course.resources} />
                  </TabPane>
                  <TabPane tab="Instructors" key="Instructors">
                    <CourseInstructor instructors={course.timetable} />
                  </TabPane>
                  <TabPane tab="Review Instructor" key="Review Instructor">
                    <InstructorReviewForm
                      course={course}
                      user={user}
                      editInstructorReview={editInstructorReview}
                      addInstructorReview={addInstructorReview}
                    />
                  </TabPane>
                  <TabPane tab="Review course" key="Review course">
                    <CourseReviewForm
                      course={course}
                      user={user}
                      editCourseReview={editCourseReview}
                      addCourseReview={addCourseReview}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

Course.propTypes = {
  user: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  addCourseReview: PropTypes.func.isRequired,
  editCourseReview: PropTypes.func.isRequired,
  addInstructorReview: PropTypes.func.isRequired,
  editInstructorReview: PropTypes.func.isRequired
}

Course.backText = 'Back to courses'

const mapStateToProps = (state) => {
  return {
    course: getCourse(state),
    user: getUserDetails(state)
    // batches: getBatches(state)
  }
}

export default withRedirect(withAdminLayout(
  connect(
    mapStateToProps,
    {
      fetchCourse: actions.fetchCourse,
      addCourseReview: actions.addCourseReview,
      editCourseReview: actions.editCourseReview,
      addInstructorReview: actions.addInstructorReview,
      editInstructorReview: actions.editInstructorReview
    }
  )(Course)
))
