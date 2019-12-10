import Link from 'next/link'
import Head from 'next/head'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { Tabs, Button } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import StarRatings from 'react-star-ratings'
import About from '../components/course/About'
import ReactHtmlParser from 'react-html-parser'
import Footer from '../components/shared/Footer'
import Display from '../components/shared/Display'
import { getCourse } from '../store/reducers/course'
import Reviews from '../components/shared/Testimonials'
import Instructor from '../components/course/Instructor'
import HowItWorks from '../components/course/HowItWorks'
import withMasterLayout from './layouts/withMasterLayout'
import ExpandableBlock from '../components/shared/ExpandableBlock'
import {
  userIsStudent,
  getUserDetails,
  userIsAdmin,
  userIsInstructor
} from '../store/reducers/user'
import EmptyState from '../components/shared/EmptyState'

const { TabPane } = Tabs

class Course extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourse({
        slug: req
          ? req.params.courseSlug
          : location.pathname.split('/').pop(),
      })),
    ])
    return {}
  }

  operations = () => {
    const {
      user,
      course
    } = this.props
    return (
      <div>
        <img src="/static/images/bookmark.png" className="mr-4" alt="bookmark" />
        <Display if={(course.transaction || {}).status === 'success' &&
          !!(course.enrollment || {}).active && userIsStudent(this.props.user)
        }>
          <Link href={'/d/student/courses/' + this.props.course.slug}>
            <Button style={{ width: '195px' }} className="ml-3" size="large" type="danger">
              View Course
            </Button>
          </Link>
        </Display>
        <Display if={(course.transaction || {}).status !== 'success' &&
          !(course.enrollment || {}).active &&
          !userIsAdmin(user) && !userIsInstructor(user)
        }>
          <Link href={`${this.props.course.slug}/enroll`}>
            <Button size="large" type="secondary">
              Enroll now
            </Button>
          </Link>
        </Display>
      </div>
    )
  }

  componentDidMount () {}

  render () {
    const {
      course
    } = this.props
    return (
      <>
        <Head>
          <title key="title">Treten Academy - {course.title}</title>
        </Head>
        <NextSeo
          title={`Treten Academy course - ${course.title}`}
          description={course.description.substr(0, 200).replace(/<\/?[^>]+(>|$)/g, '')}
          canonical="https://tretenacademy.com"
          openGraph={{
            url: 'https://tretenacademy.com',
            title: 'Treten Academy - Africa largest virtual lab',
            description: course.description.substr(0, 200).replace(/<\/?[^>]+(>|$)/g, ''),
            images: [
              {
                url: course.bannerImage,
                width: 800,
                height: 600,
                alt: course.title,
              },
            ],
            site_name: 'Treten Academy',
          }}
          twitter={{
            handle: '@tretenacademy',
            site: '@tretenacademy',
            cardType: 'summary_large_image',
          }}
        />
        <section
          style={{
            backgroundImage:
              `linear-gradient(to left, rgba(34, 40, 41, 1), rgba(34, 40, 41, 0.7)), 
              url('/static/images/course/course-bg.png')`,
            height: '220px'
          }}
          className="has-grey-bg has-full-height"
        >
          <div className="container">
            <h3 className="text-center is-white pt-8 courses__main-text text-capitalize">
              {course.title}
            </h3>
            <div className="row justify-content-center is-white mb-5">
              <div className="mr-3">
                <img
                  className="mr-1 text-capitalize"
                  src="/static/images/scholar.png"
                  alt="scholar"
                />
                <span className="text-capitalize">
                  {course.category && `${course.category.name} Level`}
                </span>
              </div>
              <div>
                <img className="mr-1" src="/static/images/users.png" alt="users" />
                <span>{course.learnersCount} learners</span>
              </div>
            </div>
          </div>
        </section>
        <section className="courses has-white-bg pt-4 mb-8">
          <hr />
          <div className="container">
            <Tabs tabBarExtraContent={this.operations()}>
              <TabPane tab="About this course" key="1">
                <About course={course} />
              </TabPane>
              <TabPane tab="Instructor" key="instructor">
                {course.instructor && <Instructor
                  heading="Lead Instructor"
                  name={course.instructor.name}
                  title={(course.instructor.userable || {}).title}
                  profilePic={course.instructor.profilePic}
                  instructorSlug={(course.instructor.userable || {}).instructorSlug}
                  qualifications={(course.instructor.userable || {}).qualifications}
                />
                }
              </TabPane>
              <TabPane tab="How it works" key="how-it-works">
                <HowItWorks />
              </TabPane>
              <TabPane tab="Course reviews" key="course-reviews">
                <div className="container">
                  <h5 className="fw-600 mt-3">Course reviews</h5>
                </div>
                <Display if={!!course.courseReviews.length}>
                  <Reviews testimonials={course.courseReviews} />
                </Display>
                <Display if={!course.courseReviews.length}>
                  <EmptyState emptyText="No reviews yet"></EmptyState>
                </Display>
              </TabPane>
              <TabPane tab="FAQs" key="bootcamps">
                <div className="container mb-4">
                  <h5 className="mb-6 mt-6">
                    <b>FAQs</b>
                  </h5>
                  <div className="row">
                    <Display if={!!course.faqs.length}>
                      <div className="col-md-6">
                        {course.faqs && course.faqs.slice(0, 8).map((faq, index) => (
                          <ExpandableBlock
                            key={index}
                            expanded={index === 0}
                            left={<span className="text-capitalize">{faq.question}</span>}
                            content={ReactHtmlParser(faq.answer)}
                          />
                        ))}
                      </div>
                      <div className="col-md-6">
                        {course.faqs && course.faqs.slice(9, 17).map(faq => (
                          <ExpandableBlock
                            key={faq.question}
                            left={faq.question}
                            content={ReactHtmlParser(faq.answer)}
                          />
                        ))}
                      </div>
                    </Display>
                    <Display if={!course.faqs.length}>
                      <div className="col-md-12">
                        <EmptyState emptyText="No Faqs yet"></EmptyState>
                      </div>
                    </Display>
                  </div>
                </div>
              </TabPane>
            </Tabs>
            {!!course.relatedCourses.length &&
              <h5 className="fw-600 mt-4">
                You might also be interested in
              </h5>
            }
            <div className="row mt-4">
              {course.relatedCourses.map(_course => (
                <div className="col-sm-12 col-md-3 mb-5" key={_course.title}>
                  <Link href={`/courses/${_course.slug}`}>
                    <div className="card border-0">
                      <img src={_course.banner_image} className="card-img-top" alt={_course.title} />
                      <div className="card-body">
                        <h5 className="card-title">{_course.title}</h5>
                        <StarRatings
                          starDimension="15px"
                          starSpacing="3px"
                          rating={_course.avg_rating}
                          starRatedColor="#E12828"
                          numberOfStars={5}
                          name="rating"
                        />
                        <div className="is-flex is-vcentered mt-2">
                          <img
                            className="mr-2 h28 rounded-circle"
                            src={_course.instructor.profile_pic}
                            alt="s"
                          />
                          <span>{_course.instructor.name}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: getUser(state),
  user: getUserDetails(state),
  course: getCourse(state),
})

Course.propTypes = {
  course: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  fetchCourse: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  {
    fetchCourse: actions.fetchCourse
  }
)(withMasterLayout(Course))
