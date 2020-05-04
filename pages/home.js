import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'antd'
import Echo from 'laravel-echo'
import { NextSeo } from 'next-seo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import Banner from '../components/home/Banner'
import Footer from '../components/shared/Footer'
import Display from '../components/shared/Display'
import Partners from '../components/home/Partners'
import Features from '../components/home/Features'
import Resources from '../components/home/Resources'
import CourseList from '../components/home/CourseList'
import withMasterLayout from './layouts/withMasterLayout'
import Testimonials from '../components/shared/Testimonials'
import { getInstructors } from '../store/reducers/instructor'
import { getPopularCourses } from '../store/reducers/courses'
import { getCoursePaths } from '../store/reducers/coursePaths'
import LatestBlogPosts from '../components/home/LatestBlogPosts'
import { getTestimonials } from '../store/reducers/testimonials'
import { getCertifications } from '../store/reducers/certifications'
import { getLatestBlogPosts } from '../store/reducers/blogPosts'
import MeetTheInstructors from '../components/home/MeetTheInstructors'
import NewsLetterSubscription from '../components/home/NewsLetterSubscription'

class Home extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchInstructors({ pageSize: 8, showActive: 1 })),
      reduxStore.dispatch(actions.fetchLatestBlogPosts()),
      reduxStore.dispatch(actions.fetchPopularCourses()),
      reduxStore.dispatch(actions.fetchTestimonials()),
      reduxStore.dispatch(actions.fetchCoursePaths({
        page: null,
        pageSize: null
      })),
      reduxStore.dispatch(actions.fetchCertifications())
    ])
    return {}
  }

  componentDidMount () {
    window.tretenEcho = new Echo({
      broadcaster: 'socket.io',
      host: `${window.location.hostname}:6001`,
      encrypted: true
      // key: 'your-pusher-channels-key'
    })

    // var socketId = Echo.socketId();
    window.tretenEcho.channel('treten_database_doneChannel').listen('done', () => {
      // console.log(e)
    })
  }

  render () {
    return (
      <>
        <Head>
          <title key="title">Treten Academy - Africa largest virtual lab</title>
        </Head>
        <NextSeo
          title="Treten Academy - Africa largest virtual lab"
          description={
              `We Are Africa’s Largest Virtual Lab Focused On Developing Capacity, 
              Capability And Competence Especially In The Area of Information Technology. 
              We seek to empower professionals with the required skills and training to take 
              them from Zero to Hero
            `}
          canonical="https://tretenacademy.com"
          openGraph={{
            url: 'https://tretenacademy.com',
            title: 'Treten Academy - Africa largest virtual lab',
            description: `
                We Are Africa's Largest Virtual Lab Focused On Developing Capacity, 
                Capability And Competence Especially In The Area of Information Technology. 
                We seek to empower professionals with the required skills and training to take 
                them from Zero to Hero
              `,
            images: [
              {
                url: 'https://tretenacademy.com/static/images/why-us.png',
                width: 800,
                height: 600,
                alt: 'treten academy'
              }
            ],
            site_name: 'Treten Academy'
          }}
          twitter={{
            handle: '@tretenacademy',
            site: '@tretenacademy',
            cardType: 'summary_large_image'
          }}
        />
        <Banner />
        <Partners certifications={this.props.certifications} />
        <Features />
        <CourseList
          cardWidth='276px'
          speedFactor={1.2}
          className="zero-to-hero-courses pt-5 pb-5"
          primaryHeading="Zero to Hero Courses"
          subHeading="Are you just getting started and feeling unsure about where to begin? Our hand-picked courses will set you on a lucrative career path!."
          courses={this.props.coursePaths}
        />
        <CourseList
          cardWidth='276px'
          speedFactor={1.8}
          subHeadingCol="col-md-6"
          className="popular-courses pt-5 pb-7"
          primaryHeading="Our Popular Courses"
          subHeading="The high demand certifications in our industry today"
          courses={this.props.popularCourses}
        />
        <Display if={!!this.props.popularCourses.length}>
          <div className="d-flex justify-content-center pt-4 pb-5 mb-5">
            <Link href="/courses">
              <Button size="large" type="danger">
                View all
              </Button>
            </Link>
          </div>
        </Display>
        <MeetTheInstructors
          instructors={this.props.instructors.all}
          isLoading={this.props.instructors.isLoading}
        />
        <Testimonials
          mainText=" What our students say"
          subText="What our students say about us"
          testimonials={this.props.testimonials}
        />
        <div className="d-flex justify-content-center pt-5 pb-5 mb-5">
          <Link href="/testimonials">
            <Button size="large" type="danger">
              View all testimonials
            </Button>
          </Link>
        </div>
        <LatestBlogPosts
          latestBlogPosts={this.props.latestBlogPosts.all}
          isLoading={this.props.latestBlogPosts.isLoading}
        />
        <NewsLetterSubscription />
        <Resources />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = state => ({
  instructors: {
    ...state.instructor,
    all: getInstructors(state)
  },
  latestBlogPosts: {
    all: getLatestBlogPosts(state),
    isLoading: state.blogPosts.latestBlogPosts.isLoading
  },
  popularCourses: getPopularCourses(state),
  testimonials: getTestimonials(state),
  coursePaths: getCoursePaths(state),
  certifications: getCertifications(state)
})

Home.propTypes = {
  instructors: PropTypes.object.isRequired,
  latestBlogPosts: PropTypes.object.isRequired,
  popularCourses: PropTypes.array.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
  fetchPopularCourses: PropTypes.func.isRequired,
  fetchLatestBlogPosts: PropTypes.func.isRequired,
  getTestimonials: PropTypes.func.isRequired,
  testimonials: PropTypes.array.isRequired,
  coursePaths: PropTypes.array.isRequired,
  fetchCoursePaths: PropTypes.func.isRequired,
  fetchCertifications: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  {
    fetchInstructors: actions.fetchInstructors,
    fetchCertifications: actions.fetchCertifications,
    fetchPopularCourses: actions.fetchPopularCourses,
    fetchLatestBlogPosts: actions.fetchLatestBlogPosts,
    getTestimonials,
    fetchCoursePaths: actions.fetchCoursePaths
  }
)(withMasterLayout(Home))
