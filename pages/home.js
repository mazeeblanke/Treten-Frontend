import React, {Component} from 'react';
import NewsLetterSubscription from '../components/home/NewsLetterSubscription';
import MeetTheInstructors from '../components/home/MeetTheInstructors';
import withMasterLayout from '../pages/layouts/withMasterLayout';
import Testimonials from '../components/shared/Testimonials';
import Resources from '../components/home/Resources';
import Features from '../components/home/Features';
import Partners from '../components/home/Partners';
import Courses from '../components/home/Courses';
import Footer from '../components/shared/Footer';
import Head from 'next/head';
import Banner from '../components/home/Banner';
import * as actions from '../store/actions';
import Blog from '../components/home/Blog';
import { connect } from 'react-redux';
import { Button } from 'antd';
import Link from 'next/link';

import Echo from "laravel-echo";
import { getInstructors } from '../store/reducers/instructor';
import { getLatestBlogPosts } from '../store/reducers/blogPosts';

class Home extends Component {

  static async getInitialProps ({ reduxStore }) {
    // const isServer = !!req
    await Promise.all([
      reduxStore.dispatch(actions.fetchInstructors({ pageSize: 8 })),
      reduxStore.dispatch(actions.fetchLatestBlogPosts())
    ]);
    return {}
  }

  state = {
    testimonials: [
      {
        text: `Yeah, but John, if The Pirates of the
        Caribbean breaks down, the pirates don’t eat the tourists.
        Yes, Yes, without the oops! Is this my espresso machine?
        Wh-what is-h-how did you get my espresso machine?
        They're using our own satellites against us. Hey,
        you know how I'm, like, always trying to save the planet?`,
        student: {
          profile_pic: '/static/images/instructors/instructor2.png',
          fullname: 'Clarisa Ward',
          profile_text: 'Network Engineer, Microsoft'
        }
      },
      {
        text: `Yeah, but John, if The Pirates of the
        Caribbean breaks down, the pirates don’t eat the tourists.
        Yes, Yes, without the oops! Is this my espresso machine?
        Wh-what is-h-how did you get my espresso machine?
        They're using our own satellites against us. Hey,
        you know how I'm, like, always trying to save the planet?`,
        student: {
          profile_pic: '/static/images/instructors/instructor2.png',
          fullname: 'Nnomthi Phillips',
          profile_text: 'Cyber Security Ninja, CBN'
        }
      },
      {
        text: `Yeah, but John, if The Pirates of the
        Caribbean breaks down, the pirates don’t eat the tourists.
        Yes, Yes, without the oops! Is this my espresso machine?
        Wh-what is-h-how did you get my espresso machine?
        They're using our own satellites against us. Hey,
        you know how I'm, like, always trying to save the planet?`,
        student: {
          profile_pic: '/static/images/instructors/instructor4.png',
          fullname: 'Adewale McDavids',
          profile_text: 'Network Engineer, Paystack'
        }
      },
      {
        text: `Yeah, but John, if The Pirates of the
        Caribbean breaks down, the pirates don’t eat the tourists.
        Yes, Yes, without the oops! Is this my espresso machine?
        Wh-what is-h-how did you get my espresso machine?
        They're using our own satellites against us. Hey,
        you know how I'm, like, always trying to save the planet?`,
        student: {
          profile_pic: '/static/images/instructors/instructor2.png',
          fullname: 'Adewale McDavids',
          profile_text: 'Network Engineer, Paystack'
        }
      },
    ],
    popularCourses: [
      {
        instructor: {
          name: "Tim Cook",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course1.png"
      },
      {
        instructor: {
          name: "Tim Berners-Lee",
          profile_pic: "/static/images/instructors/instructor2.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course2.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course5.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course5.png"
      },
    ],
    zeroToHeroCourses: [
      {
        instructor: {
          name: "Tim Cook",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course1.png"
      },
      {
        instructor: {
          name: "Tim Berners-Lee",
          profile_pic: "/static/images/instructors/instructor2.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course2.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course5.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course5.png"
      },
    ]
  }

  componentDidMount () {
    window.tretenEcho = new Echo({
      broadcaster: 'socket.io',
      host: window.location.hostname + ":6001",
      encrypted: true
      // key: 'your-pusher-channels-key'
    });

    // var socketId = Echo.socketId();
    window.tretenEcho.channel(`treten_database_doneChannel`)
    .listen('done', (e) => {
        console.log(e);
    });
  }

  render () {
    return (
      <>
        <Head>
          <title key="title">Treten Academy - Africa's largest virtual lab</title>
        </Head>
        <Banner />
        <Partners />
        <Features />
        <Courses
          className="zero-to-hero-courses pt-5 mb-5"
          primaryHeading="Zero to Hero Courses"
          subHeading="Are you just getting started and feeling unsure about where
          to begin? Our Zero to Hero Courses give you a powerful headstart."
          courses={this.state.zeroToHeroCourses}
        />
        <Courses
          subHeadingCol="col-md-6"
          className="popular-courses pt-5 pb-7"
          primaryHeading="Our Popular Courses"
          subHeading="Flatland culture star stuff harvesting star light two ghostly white
          figures in coveralls and helmets are soflty dancing vanquish the impossible invent the universe."
          courses={this.state.popularCourses}
        />
        <div className="d-flex justify-content-center pt-4 pb-5 mb-5">
          <Link href="/courses">
            <Button size="large" type="danger">
              View all
            </Button>
          </Link>
        </div>
        <MeetTheInstructors
          instructors={this.props.instructors.all}
          isLoading={this.props.instructors.isLoading}
        />
        <Testimonials
          mainText=" What our students say"
          subText="Flatland culture star stuff harvesting star light two ghostly
          white figures in coveralls and helmets are soflty dancing vanquish
          the impossible invent the universe.."
          testimonials={this.state.testimonials}
        />
        <div className="d-flex justify-content-center pt-5 pb-5 mb-5">
          <Link href="/testimonials">
            <Button size="large" type="danger">
              View all testimonials
            </Button>
          </Link>
        </div>
        <Blog latestBlogPosts={this.props.latestBlogPosts.all} isLoading={this.props.latestBlogPosts.isLoading} />
        <NewsLetterSubscription />
        <Resources />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    instructors: {
      ...state.instructor,
      all: getInstructors(state)
    },
    latestBlogPosts: {
      all: getLatestBlogPosts(state),
      isLoading: state.blogPosts.latestBlogPosts.isLoading
    }
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(Home));