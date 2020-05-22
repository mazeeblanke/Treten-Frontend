import Head from 'next/head'
// import PropTypes from 'prop-types';
// import { Tabs, Button } from 'antd';
// import { connect } from 'react-redux';
import React, { Component } from 'react'
// import Auth from '../components/shared/Auth'
import { Animated } from 'react-animated-css'
import Footer from '../components/shared/Footer'
import Display from '../components/shared/Display'
import withMasterLayout from './layouts/withMasterLayout'
import InstructorForm from '../components/auth/InstructorForm'

class BecomeAnInstructor extends Component {
  state = {
    submittedForm: false
  }

  handleSuccessfullSubmittion = () => {
    this.setState({
      submittedForm: true
    })
  }

  render () {
    const {
      submittedForm
    } = this.state
    return (
      <>
        <Head>
          <title key="title">Treten Academy - Become an instructor</title>
        </Head>
        <section className="become-an-instructor has-min-full-vh pb-5">
          <div className="container pt-3 has-full-height">
            <h3 className="text-center mt-3 pb-1 mb-4">Become an Instructor</h3>
            <div className="row justify-content-center has-full-height">
              <div className="col-md-4 pl-5 pr-5 auth__wrapper">
                <div className="auth__container">
                  <Display if={!submittedForm}>
                    <h5 className="text-center fw-600 mb-5 mt-5">Complete the form below</h5>
                    <Animated
                      animationIn="fadeIn"
                      animationOut="slideInUp"
                      isVisible={!submittedForm}
                    >
                      <InstructorForm
                        onSuccessfullSubmittion={this.handleSuccessfullSubmittion}
                      />
                    </Animated>
                  </Display>
                  <Display if={submittedForm}>
                    <div className="d-flex justify-content-center flex-sm-direction align-items-center confirmation">
                      <div className="d-flex align-items-center flex-column justify-content-center">
                        <Animated
                          animationIn="bounceIn"
                          animationOut="slideInUp"
                          isVisible={submittedForm}
                        >
                          <img className="mb-2" src="images/confirmation.png" />
                        </Animated>
                        <Animated
                          animationIn="slideInUp"
                          animationOut="fadeOut"
                          isVisible={submittedForm}
                        >
                          <p className="text-center pl-5 pr-5">
                            Thanks for your interest! We will be in touch with you shortly.
                          </p>
                        </Animated>
                      </div>
                    </div>
                  </Display>
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

BecomeAnInstructor.propTypes = {}

export default withMasterLayout(BecomeAnInstructor)
