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
        <section className="whyus-extra mt-8 mb-8">
          <div className="container pt-4">
            <div className="row">
              <div className="col-sm-12 has-dark-bg has-border-radius-20 pb-5">
                <h3 className="whyus-extra__main-text text-center mt-7 mb-2 is-white">
                  Value proposition
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <p className="is-smokewhite">
                      Treten Academy trains individuals and organizations in the high demand ICT skills of today. We equip people with the competencies that accelerate their careers, and our corporate training places organizations at the forefront of digital innovation in their industry. 

                      At Treten, we go beyond a general customization strategy by ensuring our training is tailored to the specific position and job requirements of our students. Our programs are designed to meet the career goals of every trainee. 
                      
                      We prioritize innovation and provide an unmatched learning experience that leverages emerging technologies of our industry. 
                    </p>
                  </div>
                </div>

                <h3 className="whyus-extra__main-text text-center mt-3 mb-2 is-white">
                  Zero to Hero Program
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-7">
                    <p className="is-smokewhite">
                      Do you want to begin a lucrative IT career, but don’t know how to start? The Zero to Hero program is exactly what you need. 
                    </p>
                    <p className="is-smokewhite">
                      The courses for our Zero to Hero program have been carefully selected to position participants for careers in high-demand IT roles after completion. Students can go on to fill the following roles in an enterprise environment : DevOps Engineer, CyberSecurity Expert, Cloud Solutions Architects
                    </p>
                    <p className="is-smokewhite">
                      Ideal candidates for this program are professionals looking to switch careers, and tech-savvy job seekers who desire to start a career in IT. The program covers intermediate level certifications like: Python, CCNA, CCENT, ICND1 to expert level courses like: CCIE, DevOps
                    </p>
                    <p className="is-smokewhite">
                      Within a few weeks, our Zero to Hero Program will transform you from a novice to a certified IT expert with the high demand skills in today’s job market. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="whyus-extra-2 mt-8 mb-8">
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
        </section> */}
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
