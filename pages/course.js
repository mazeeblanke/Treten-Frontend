import { Tabs, Button, Select } from 'antd';
import React, { Component } from 'react';
import StarRatings from "react-star-ratings";
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import withMasterLayout from '../pages/layouts/withMasterLayout';
import Footer from '../components/shared/Footer';
import About from '../components/course/About';
import Reviews from '../components/shared/Testimonials';
import Instructor from '../components/course/Instructor';
import HowItWorks from '../components/course/HowItWorks';
import Link from 'next/link';
import ExpandableBlock from '../components/shared/ExpandableBlock';
const { TabPane } = Tabs;
const { Option } = Select;

const operations = (
  <div>
    <img src="/static/images/bookmark.png" className="mr-4"></img>
    <Link href="/enroll">
      <Button size="large" type="secondary">Enroll now</Button>
    </Link>
  </div>
);

class Course extends Component {

  static async getInitialProps (ctx) {
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    return {}
  }

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
    },
    faqs: [
      {
        question: 'This is where the question being asked goes? ',
        answer: `What do they got in there? King Kong?
        God creates dinosaurs. God destroys dinosaurs.
        God creates Man. Man destroys God. Man creates Dinosaurs.
        Must go faster. What do they got in there? King Kong?
        You know what? It is beets. I've crashed into a beet truck.`
      },
      {
        question: 'This is where the question being asked goes? ',
        answer: `What do they got in there? King Kong?
        God creates dinosaurs. God destroys dinosaurs.
        God creates Man. Man destroys God. Man creates Dinosaurs.
        Must go faster. What do they got in there? King Kong?
        You know what? It is beets. I've crashed into a beet truck.`
      },
      {
        question: 'This is where the question being asked goes? ',
        answer: `What do they got in there? King Kong?
        God creates dinosaurs. God destroys dinosaurs.
        God creates Man. Man destroys God. Man creates Dinosaurs.
        Must go faster. What do they got in there? King Kong?
        You know what? It is beets. I've crashed into a beet truck.`
      },
      {
        question: 'This is where the question being asked goes? ',
        answer: `What do they got in there? King Kong?
        God creates dinosaurs. God destroys dinosaurs.
        God creates Man. Man destroys God. Man creates Dinosaurs.
        Must go faster. What do they got in there? King Kong?
        You know what? It is beets. I've crashed into a beet truck.`
      },
      {
        question: 'This is where the question being asked goes? ',
        answer: `What do they got in there? King Kong?
        God creates dinosaurs. God destroys dinosaurs.
        God creates Man. Man destroys God. Man creates Dinosaurs.
        Must go faster. What do they got in there? King Kong?
        You know what? It is beets. I've crashed into a beet truck.`
      },
    ],
    courses: [
      {
        instructor: {
          name: "Tim Cook",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
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
        banner_image: "/static/images/courses/course4.png"
      },
    ],
    reviews: [
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
  }

  componentDidMount () {
  }


  render () {
    return (
      <>
        <section style={{
            backgroundImage: "linear-gradient(to left, rgba(34, 40, 41, 1), rgba(34, 40, 41, 0.7)), url('/static/images/course/course-bg.png')",
            height: '220px'
          }} className="has-grey-bg has-full-height">
          <div className="container">
            <h3 className="text-center is-white pt-8 courses__main-text">
              Course title goes here, and it just keeps going
            </h3>
            <div className="row justify-content-center is-white mb-5">
              <div className="mr-3">
                <img className="mr-1" src="/static/images/scholar.png" />
                <span>Professional level</span>
              </div>
              <div>
                <img className="mr-1" src="/static/images/users.png" />
                <span>250 learners</span>
              </div>
            </div>
          </div>
        </section>
        <section className="courses has-white-bg pt-4 mb-8">
          <hr />
          <div className="container">
            <Tabs tabBarExtraContent={operations}>
              <TabPane tab="About this course" key="1">
                <About />
              </TabPane>
              <TabPane tab="Instructor" key="instructor">
                <Instructor { ...this.state.instructor } />
              </TabPane>
              <TabPane tab="How it works" key="how-it-works">
                <HowItWorks />
              </TabPane>
              <TabPane tab="Course reviews" key="course-reviews">
                <div className="container">
                  <h5 className="fw-600 mt-3">Course reviews</h5>
                </div>
                <Reviews
                  testimonials={this.state.reviews}
                 />
              </TabPane>
              <TabPane tab="FAQs" key="bootcamps">
                <div className="container mb-4">
                  <h5 className="mb-6 mt-6">
                    <b>FAQs</b>
                  </h5>
                  <div className="row">
                    <div className="col-md-6">
                      {
                        this.state.faqs.map((faq, index) => (
                          <ExpandableBlock
                            key={index}
                            expanded={index === 0 ? true : false}
                            left={faq.question}
                            content={<p>{faq.answer}</p>}
                          />
                        ))
                      }
                    </div>
                    <div className="col-md-6">
                      {
                        this.state.faqs.slice(3).map((faq, index) => (
                          <ExpandableBlock
                            key={index}
                            left={faq.question}
                            content={<p>{faq.answer}</p>}
                          />
                        ))
                      }
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
            <h5 className="fw-600 mt-4">You might also be interested in</h5>
            <div className="row mt-4">
              {
                this.state.courses.map((course) => (
                  <div className="col-sm-12 col-md-3 mb-5" key={course.title}>
                    <div class="card border-0">
                      <img src={course.banner_image} class="card-img-top" alt={course.title} />
                      <div class="card-body">
                        <h5 class="card-title">{course.title}</h5>
                        <StarRatings
                          starDimension="15px"
                          starSpacing="3px"
                          rating={course.rating}
                          starRatedColor="#E12828"
                          changeRating={() => {}}
                          numberOfStars={5}
                          name='rating'
                        />
                        <div className="is-flex is-vcentered mt-2">
                          <img className="mr-2 h28 rounded-circle" src={course.instructor.profile_pic} />
                          <span>{course.instructor.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(Course));