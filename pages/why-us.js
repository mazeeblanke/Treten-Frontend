import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import withMasterLayout from './layouts/withMasterLayout'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'
import Introduction from '../components/why-us/Introduction'
import Facilities from '../components/why-us/Facilities'

class WhyUs extends Component {
  static async getInitialProps () {
    return {}
  }

  render () {
    return (
      <>
        <Head>
          <title key="title">Treten Academy - Why us</title>
        </Head>
        <Introduction />
        <Facilities />
        <section className="whyus-extra mt-8">
          <div className="container pt-4">
            <div className="row">
              <div className="col-sm-12 has-dark-bg has-border-radius-20 pb-5">
                <h3 className="whyus-extra__main-text text-center mt-7 mb-2 is-white">
                  Value proposition
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <p className="is-smokewhite">
                      We go far beyond a simple customization strategy. Our programs are not only
                      customized to fulfill your requirements, but are also personalized to meet the
                      developmental needs of each training participant. The detailed attention that
                      we give to all our clients ensure that they receive a training program
                      tailored perfectly to their specific position and job function needs. Our
                      dynamic learning concept provides an integrated learning approach for you. It
                      brings together key elements for effective learning such as self-learning,
                      collaborative learning, and private/group learning. Combining the
                      “personalization of your learning experience” and our “assessment tools” as
                      well as our flexible learning platforms, our team will develop a training plan
                      that suits your needs. One of such programs is our:
                    </p>
                  </div>
                </div>

                <h3 className="whyus-extra__main-text text-center mt-3 mb-2 is-white">
                  Zero to Hero Program
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <p className="is-smokewhite">
                      This is a program designed for novices; albeit, it requires that you at least
                      know what a computer system is, and how to operate one. It is designed for
                      participants who have interest but have little or no knowledge about ICT
                      security. We will transform your interest into a profession and ensure you
                      have fun alongside.
                    </p>
                    <p className="is-smokewhite">
                      Participants will begin with Entry Level Courses (Python, Bash Scripting,
                      Juniper JNCIA, CCENT ICND1) all the way up to Expert Level Courses (CCIE
                      Routing and Switching, CCIE Security and CCIE Service Provider).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="whyus-extra-2 mt-8 mb-8">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-md-6 mb-4">
                <div className="card border-0">
                  <div className="card-body pl-4 pr-4 pt-4">
                    <img src="/static/images/aim.png" alt="aim logo" />
                    <h5 className="card-title is-blue mt-3">Our Aim</h5>
                    <p className="card-text lh-30">
                      Our aim is to alleviate poverty, reduce the rate of unemployment in Africa and
                      build a strong and competent community of professionals through trainings and
                      networking.
                    </p>
                    <p className="lh-30">
                      Participants will be
                      <b>Nigerian trained, Internationally certified</b>
                      and
                      <b>Globally relevant</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 mb-4">
                <div className="card border-0">
                  <div className="card-body pl-4 pr-4 pt-4">
                    <img src="/static/images/promise.png" alt="promise logo" />
                    <h5 className="card-title is-blue mt-3">Our Promise</h5>
                    <p className="card-text lh-30">
                      As part of our commitment to the largely unemployed youths of the country, you
                      will be empowered to develop competencies, employable skills and build
                      entrepreneurial spirits, that you may become better equipped to contribute
                      productively to the society while carving out respectable and rewarding
                      careers for yourself.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = () => ({
  // user: getUser(state),
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(WhyUs))
