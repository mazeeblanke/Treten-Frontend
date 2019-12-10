import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import PropTypes from 'prop-types'
// import { Button } from 'antd'
import * as actions from '../store/actions'
import Footer from '../components/shared/Footer'
import withMasterLayout from './layouts/withMasterLayout'
// import Testimonials from '../components/shared/Testimonials'
import { getTestimonials } from '../store/reducers/testimonials'

class Testimonials extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchTestimonials({
        pageSize: 100
      })),
    ])
    return {}
  }

  constructor (props) {
    super(props)
    this.state = {
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
        }
      ]
    }
  }

  render () {
    const {
      testimonials
    } = this.props
    return (
      <>
        <Head>
          <title key="title">Treten Academy - Testimonials</title>
        </Head>
        <section className="testimonials mt-2 pb-2">
          <h3 className="text-center testimonials__main-text pt-5">What our students say</h3>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <p className="text-center testimonials__sub-text pb-4">
                  Flatland culture star stuff harvesting star light two ghostly white figures in
                  coveralls and helmets are soflty dancing vanquish the impossible invent the
                  universe.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              {testimonials.map(testimonial => (
                <div
                  className="testimonial mb-5 col-md-4 col-sm-12"
                  key={testimonial.name}
                >
                  <div className="card border-0">
                    <div className="card-body">
                      <p className="card-title testimonial__text mb-0 pb-0">{testimonial.reviewText}</p>
                      <div className="d-flex align-items-center mt-3 pt-2 mb-3">
                        <img
                          alt="hh"
                          className="mr-2 h45 rounded-circle"
                          src={testimonial.profilePic}
                        />
                        <div className="d-flex justify-content-center flex-column">
                          <h6 className="testimonial__title mb-0 pb-0">
                            {testimonial.name}
                          </h6>
                          <p className="mb-0">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="row justify-content-center mb-7">
              <Button size="large" type="danger">
                See more
              </Button>
            </div> */}
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: getUser(state),
  testimonials: getTestimonials(state)
})

Testimonials.propTypes = {
  getTestimonials: PropTypes.func.isRequired,
  testimonials: PropTypes.array.isRequired
}

export default connect(
  mapStateToProps,
  {
    getTestimonials: actions.getTestimonials
  }
)(withMasterLayout(Testimonials))
