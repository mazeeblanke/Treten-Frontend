import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { Button, Form } from 'antd'
import { connect } from 'react-redux'
import withAuthLayout from './layouts/withAuthLayout'
import Display from '../components/shared/Display'
import * as actions from '../store/actions'
import RegisterForm from '../components/auth/EnrollRegisterForm'
import LoginForm from '../components/auth/EnrollLoginForm'
import Link from 'next/link'
import { userIsAdmin, userIsInstructor } from '../store/reducers/user'
import notifier from 'simple-react-notifier'

const Cookies = require('js-cookie')

const sliderSettings = {
  dots: true,
  infinite: false,
  arrows: false,
  slidesToShow: 3.6,
  slidesToScroll: 1
}

class Enroll extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourse({
        slug: req.params.courseSlug,
        userId: reduxStore.getState().user.id
      }))
    ])
    return {}
  }

  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      auth: 'register',
      plan: null,
      price: null,
      courseId: null,
      courseBatchId: null,
      availableDate: null,
      amount: null,
      description: null,
      invoiceId: null,
      status: 'pending',
      transactionId: null
    }
  }

  componentWillMount () {
    const { course: { enrollment }, isLoggedIn } = this.props
    if (enrollment && enrollment instanceof Object) {
      this.setState({
        plan: enrollment.plan,
        price: enrollment.price || enrollment.amount,
        amount: enrollment.amount,
        courseId: enrollment.courseId || this.props.course.id,
        courseBatchId: enrollment.batchId || enrollment.courseBatchId,
        availableDate: enrollment.availableDate,
        transactionId: enrollment.transactionId,
        invoiceId: enrollment.invoiceId,
        step: isLoggedIn && enrollment.batchId && enrollment.transactionId ? 3 : 1
      })
    }
  }

  moveToStep = step => {
    this.setState({
      step
    })
  };

  setPlan = plan => {
    this.setState({
      plan,
      price: '',
      courseId: '',
      courseBatchId: '',
      availableDate: ''
    })
  };

  setAuth (auth) {
    this.setState({
      auth
    })
  }

  setAvailableDate = entry => {
    this.setState({
      availableDate: entry.startDate,
      price: entry.price || entry.amount,
      courseId: entry.courseId,
      courseBatchId: entry.batchId
    })
  }

  initiateEnrollment = () => {
    this.props.enroll({
      plan: this.state.plan,
      availableDate: this.state.availableDate,
      courseId: this.state.courseId,
      courseBatchId: this.state.courseBatchId
    }).then((res) => {
      const data = res.data.data
      this.setState({
        price: data.price || data.amount,
        description: data.description,
        invoiceId: data.invoiceId,
        status: data.status,
        transactionId: data.transactionId
      })
      this.moveToStep(this.props.isLoggedIn ? 3 : 2)
    }).catch((err) => {
      const error = err.response.data || {}
      notifier.error(error.message)
      if (error.course && error.course instanceof Object) {
        this.props.updateCourse(error.course)
      }
    })
  }

  render () {
    const {
      currentPath,
      course,
      user
    } = this.props
    const {
      price,
      courseId,
      courseBatchId,
      availableDate,
      amount,
      description,
      invoiceId,
      transactionId
    } = this.state
    return (
      <section className="auth has-white-bg has-min-full-vh pb-5 enroll">
        <Display if={userIsAdmin(user) || userIsInstructor(user)}>
          <p>Not permitted to enroll!</p>
        </Display>
        <Display if={
          (course.transaction || {}).status === 'success' &&
          !!(course.enrollment || {}).active && !userIsAdmin(user) &&
          !userIsInstructor(user)
        }>
          <section style={{ height: '75vh' }}>
            <div className={`
              d-flex flex-column 
              justify-content-center 
              align-items-center has-full-height`
            }>
              <img src="images/confirmation.png" />
              <p className="lh-30 mt-3 mb-3 text-center">
                You have enrolled for this course
              </p>
              <Link href={`/d/student/courses/${course.slug}`}>
                <Button
                  style={{ width: '195px' }}
                  className="ml-3"
                  size="large"
                  type="danger"
                >
                  View Course
                </Button>
              </Link>
            </div>
          </section>
        </Display>
        <Display if={
          (course.transaction || {}).status !== 'success' &&
          !(course.enrollment || {}).active &&
          !userIsAdmin(user) && !userIsInstructor(user)
        }>
          <form method="POST" action="/t/pay" acceptCharset="UTF-8">
            <input type="hidden" name="_token" id="csrf-token" value={Cookies.get('XSRF-TOKEN')} />
            <input type="hidden" name="email" value={user.email} />
            <input type="hidden" name="orderID" value={invoiceId} />
            <input type="hidden" name="amount" value={price * 100} />
            <input type="hidden" name="quantity" value="1" />
            <input type="hidden" name="metadata" value={JSON.stringify({
              courseId,
              userId: user && user.id,
              courseBatchId,
              availableDate,
              amount,
              description,
              invoiceId,
              transactionId
            })} />
            <input
              type="hidden"
              name="reference"
              value={transactionId}
            />
            <input
              type="hidden"
              name="key"
              value="sk_test_b9d577adf41c379aac00e295930cc1e6937760df"
            />
            <div className="container pt-5 has-full-height">
              <div className="row justify-content-center has-full-height">
                <div
                  style={{
                    borderLeft: '2px solid #F0F1F3',
                    height:
                      this.state.step === 3 && !this.props.isLoggedIn
                        ? '240px'
                        : this.state.step === 3 && this.props.isLoggedIn
                          ? '140px'
                          : this.props.isLoggedIn
                            ? '600px'
                            : this.state.step === 2 && this.state.auth === 'register'
                              ? '830px'
                              : this.state.step === 2 && this.state.auth === 'login'
                                ? '590px'
                                : '710px'
                  }}
                  className="col-md-8 col-lg-6"
                >
                  <div className={`step first ${this.state.step >= 1 ? 'active' : ''} pb-5 pl-4`}>
                    <div
                      className="wrapper pl-4 pr-4"
                      style={{ height: this.state.step === 1 ? '530px' : '60px', overflow: 'hidden' }}
                    >
                      <div className="d-flex has-full-width justify-content-sm-between align-items-center h60">
                        <h5
                          className="mr-4"
                          style={{
                            color: this.state.step < 1 ? '#D3D4D8' : null,
                            fontWeight: this.state.step < 1 ? '400' : '600'
                          }}
                        >
                          Select your preferred mode of learning
                        </h5>
                        <div>
                          <Display if={this.state.step === 1}>
                            <span className="minimize" />
                          </Display>
                          <Display if={this.state.step !== 1}>
                            <span
                              style={{ color: this.state.step < 1 ? '#D3D4D8' : null }}
                              onClick={() => this.moveToStep(1)}
                              className="expand"
                            >
                              +
                            </span>
                          </Display>
                        </div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <Display
                            if={Object.keys(course.availableModesOfDelivery).includes('on site')}
                          >
                            <div
                              onClick={() => this.setPlan('on site')}
                              className={`
                                  d-flex flex-column
                                  plan text-center
                                  justify-content-center
                                  p-3 ${this.state.plan === 'on site' ? 'selected' : ''}`}
                            >
                              <h6 className="fw-600">On site</h6>
                              <p>Learn in person at our training facility</p>
                              <hr />
                              {this.state.price && this.state.plan === 'on site' && <h3>N{this.state.price}</h3>}
                            </div>
                          </Display>
                        </div>
                        <div className="col-md-4">
                          <Display if={Object.keys(course.availableModesOfDelivery).includes('remote')}>
                            <div
                              onClick={() => this.setPlan('remote')}
                              className={`
                                  d-flex flex-column
                                  plan text-center
                                  justify-content-center
                                  p-3 ${this.state.plan === 'remote' ? 'selected' : ''}`}
                            >
                              <h6 className="fw-600">Remote</h6>
                              <p>Learn online from wherever you are</p>
                              <hr />
                              {this.state.price && this.state.plan === 'remote' && <h3>N{this.state.price}</h3>}
                            </div>
                          </Display>
                        </div>
                        <div className="col-md-4">
                          <Display if={Object.keys(course.availableModesOfDelivery).includes('on demand')}>
                            <div
                              onClick={() => this.setPlan('on demand')}
                              className={`
                                  d-flex flex-column
                                  plan text-center
                                  justify-content-center
                                  p-3 ${this.state.plan === 'on demand' ? 'selected' : ''}`}
                            >
                              <h6 className="fw-600">On demand</h6>
                              <p>Gain instant access to the course online</p>
                              <hr />
                              {this.state.price && this.state.plan === 'on demand' && <h3>N{this.state.price}</h3>}
                            </div>
                          </Display>
                        </div>
                      </div>
                      {this.state.plan &&
                        <>
                          <h6 className="fw-600 mt-4 pt-1">When would you like to start?</h6>
                          <p>Showing next available starting dates</p>
                          <div className="mt-4">
                            <Slider {...sliderSettings}>
                              {
                                course.availableModesOfDelivery[this.state.plan].map((entry, index) => (
                                  <div className="" key={entry}>
                                    <div
                                      onClick={() => this.setAvailableDate(entry)}
                                      className={`avaliable-date ${
                                        this.state.courseBatchId === entry.batchId ? 'selected' : ''
                                        }`}
                                    >
                                      <p
                                        style={{ width: '120px' }}
                                        className="m-0 p-2">{entry.startDate}
                                        <small>({entry.batchId})</small>
                                      </p>
                                    </div>
                                  </div>
                                ))
                              }
                            </Slider>
                          </div>
                        </>
                      }
                      <div className="d-flex justify-content-center mt-5 mb-3">
                        <Button
                          disabled={!this.state.plan || !this.state.availableDate}
                          onClick={this.initiateEnrollment}
                          size="large"
                          type="danger"
                        >
                          Proceed
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Display if={!this.props.isLoggedIn}>
                    <div className={`step ${this.state.step >= 2 ? 'active' : null} pb-5 pl-4`}>
                      <div
                        className="wrapper pl-4 pr-4"
                        style={{
                          [this.state.step === 2 && 'minHeight']:
                            this.state.step === 2 && this.state.auth === 'register'
                              ? '650px'
                              : this.state.step === 2 && this.state.auth === 'login'
                                ? '425px'
                                : '60px',
                          [this.state.step !== 2 && 'height']: 60,
                          overflow: 'hidden'
                        }}
                      >
                        <div className="d-flex has-full-width justify-content-between align-items-center h60">
                          <h5
                            style={{
                              color: this.state.step < 2 ? '#D3D4D8' : null,
                              fontWeight: this.state.step < 2 ? '400' : '600'
                            }}
                          >
                            Register or log in to your account
                          </h5>
                          <div>
                            <Display if={this.state.step === 2}>
                              <span className="minimize" />
                            </Display>
                            <Display if={this.state.step !== 2}>
                              <span
                                style={{ color: this.state.step < 2 ? '#D3D4D8' : null }}
                                onClick={() => this.moveToStep(2)}
                                className="expand"
                              >
                                +
                              </span>
                            </Display>
                          </div>
                        </div>
                        <h6>Register</h6>
                        <Display if={this.state.auth === 'register'}>
                          <p>
                            Already have an account?
                            <a className="pl-2 has-pointer-cursor" onClick={() => this.setAuth('login')}>Log in </a>
                          </p>
                        </Display>
                        <Display if={this.state.auth === 'login'}>
                          <p>
                            Dont have an account?
                            <a className="pl-2 has-pointer-cursor" onClick={() => this.setAuth('register')}> Register </a>
                          </p>
                        </Display>
                        <p className="mt-4 is-grey-light divider">Continue with</p>

                        <div className="d-flex mb-3">
                          <Button
                            type="primary"
                            htmlType="submit"
                            href={`/t/auth/linkedin?redirect=${currentPath}`}
                            className="linkedin-btn mr-3"
                          >
                            <img className="mr-2" src="images/social/linkedin icon.png" />
                            <span className="is-white">LinkedIn</span>
                          </Button>

                          <Button
                            type="primary"
                            htmlType="submit"
                            href={`/t/auth/facebook?redirect=${currentPath}`}
                            className="facebook-btn"
                          >
                            <img className="mr-2" src="images/social/facebook icon.png" />
                            <span className="is-white">Facbook</span>
                          </Button>
                        </div>
                        <p className="is-grey-light divider">Or</p>
                        <Display if={this.state.auth === 'login'}>
                          <LoginForm proceed={this.initiateEnrollment} login={this.props.login} />
                        </Display>
                        <Display if={this.state.auth === 'register'}>
                          <RegisterForm proceed={this.initiateEnrollment} register={this.props.register} />
                          <p>By registering, you agree to our Terms and Conditions and Policies</p>
                        </Display>
                      </div>
                    </div>
                  </Display>
                  <div className={`step ${this.state.step >= 3 ? 'active' : null} pl-4`}>
                    <div className="wrapper pl-4 pr-4" style={{ height: '60px', overflow: 'hidden' }}>
                      <div className="d-flex has-full-width justify-content-between align-items-center h60">
                        <h5 style={{ color: this.state.step < 3 ? '#D3D4D8' : null }}>Make payment</h5>
                        <div>
                          <Button
                            htmlType="submit"
                            disabled={this.state.step < 3}
                            size="large"
                            type={this.state.step === 3 ? 'danger' : null}
                          >
                            Pay now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Display>
      </section>
    )
  }
}

Enroll.propTypes = {
  user: PropTypes.object.isRequired,
  currentPath: PropTypes.string.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  course: PropTypes.object.isRequired,
  enroll: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  updateCourse: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  course: state.course,
  user: state.user
})

const WrappedEnrollForm = Form.create({ name: 'login' })(
  connect(
    mapStateToProps,
    {
      enroll: actions.enroll,
      login: actions.login,
      register: actions.register,
      updateCourse: actions.updateCourse
    }
  )(Enroll)
)

export default withAuthLayout(WrappedEnrollForm)
