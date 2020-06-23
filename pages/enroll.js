import Link from 'next/link'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import * as actions from '../store/actions'
import { redirectTo } from '../lib/helpers'
import Display from '../components/shared/Display'
import withAuthLayout from './layouts/withAuthLayout'
import LearningMode from '../components/enroll/LearningMode'
import PaystackForm from '../components/enroll/PaystackForm'
import { userIsAdmin, userIsInstructor } from '../store/reducers/user'
import AvailableBatchList from '../components/enroll/AvailableBatchList'

class Enroll extends Component {
  static async getInitialProps ({ reduxStore, req, res, asPath }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourse({
        slug: req.params.courseSlug,
        userId: reduxStore.getState().user.id
      }))
    ])
    const user = reduxStore.getState().user
    if (!user || !user.role) {
      redirectTo('/enroll/register?return='+asPath, { 
        res, 
        status: 302
      })
    }
    return {}
  }

  constructor (props) {
    super(props)
    this.state = {
      step: 1,
      plan: null,
      price: null,
      amount: null,
      loading: false,
      invoiceId: null,
      status: 'pending',
      description: null,
      courseBatchId: null,
      availableDate: null,
      transactionId: null,
      courseId: props.course.id,
    }
  }

  moveToStep = step => {
    const canMaximizeStep = (this.isFirstStep() && this.state.plan) || this.isSecondStep() || this.isThirdStep()
    canMaximizeStep && this.setState({
      step
    })
  };

  setPlan = plan => {
    this.setState({
      plan,
    })
  }

  setAvailableDate = entry => {
    this.setState({
      courseId: entry.courseId,
      courseBatchId: entry.batchId,
      availableDate: entry.startDate,
      price: entry.price || entry.amount,
    })
  }

  initiateEnrollment = () => {
    this.setState({
      loading: true
    }, () => {
      this.props.enroll({
        plan: this.state.plan,
        courseId: this.state.courseId,
        availableDate: this.state.availableDate,
        courseBatchId: this.state.courseBatchId
      }).then((res) => {
        const data = res.data.data
        this.setState({
          loading: false,
          status: data.status,
          invoiceId: data.invoiceId,
          description: data.description,
          price: data.price || data.amount,
          transactionId: data.transactionId,
        }, () => {
          document.getElementById('enrollForm').submit()
        })
      }).catch((err) => {
        const error = err.response.data || {}
        this.setState({
          loading: false
        })
        if (error.course && error.course instanceof Object) {
          this.props.updateCourse(error.course)
        }
      })
    })
  }

  checkStep = step => step === this.state.step

  isFirstStep = () => this.state.step === 1

  isSecondStep = () => this.state.step === 2

  isThirdStep = () => this.state.step === 3

  activeStepStyles = (step) => {
    return 'step pb-5 pl-4 ' + (this.state.step >= step ? 'active' : '')
  }

  shouldNotEnroll = () => {
    return userIsAdmin(this.props.user) || 
    userIsInstructor(this.props.user)
  }

  stepTextStyle = (step) => {
    return {
      color: this.state.step < step ? '#D3D4D8' : null,
      fontWeight: this.state.step < step ? '400' : '600'
    }
  }

  hasEnrolled = () => {
    const {
      user,
      course,
    } = this.props
    return (course.transaction || {}).status === 'success' &&
    !!(course.enrollment || {}).active && !userIsAdmin(user) &&
    !userIsInstructor(user)
  }

  showStepNav = (step) => {
    return (
      <>
        <Display if={this.state.step === step}>
          <span className="minimize" />
        </Display>
        <Display if={this.state.step !== step}>
          <span
            style={{ color: this.state.step < step ? '#D3D4D8' : null }}
            onClick={() => this.moveToStep(step)}
            className="expand"
          >
            +
          </span>
        </Display>
      </>
    )
  }

  showAdminCourseLink = (course) => {
    return (
      <section style={{ height: '75vh' }}>
        <div className={`
          d-flex flex-column 
          justify-content-center 
          align-items-center has-full-height`
        }>
          <img alt="confirmation" src="/images/confirmation.png" />
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
    )
  }

  render () {
    const {
      course,
      user
    } = this.props
    const {
      price,
      amount,
      courseId,
      invoiceId,
      description,
      courseBatchId,
      availableDate,
      transactionId
    } = this.state

    return (
      <section className="auth has-white-bg has-min-full-vh pb-5 enroll">

        <Display if={this.shouldNotEnroll()}>
          <p>Not permitted to enroll!</p>
        </Display>

        <Display if={this.hasEnrolled()}>
          {this.showAdminCourseLink(course)}
        </Display>

        <Display if={!this.hasEnrolled()}>
          <form id="enrollForm" method="POST" action="/t/pay" acceptCharset="UTF-8">
            <PaystackForm 
              user={user}
              price={price}
              amount={amount}
              courseId={courseId}
              invoiceId={invoiceId}
              description={description}
              courseBatchId={courseBatchId}
              availableDate={availableDate}
              transactionId={transactionId}
            />
            <div className="container pt-5 has-full-height">
              <div className="row justify-content-center has-full-height">
                <div className="col-md-8 col-lg-6">

                  <div className={`${this.activeStepStyles(1)}`}>
                    <div className={`wrapper pl-4 pr-4 ${!this.isFirstStep() ? 'h-60' : ''}`}>
                      <div className="d-flex has-full-width justify-content-sm-between align-items-center h60">
                        <h5 className="mr-4" style={this.stepTextStyle(1)}>
                          Select your preferred mode of learning
                        </h5>
                        <div>{this.showStepNav(1)}</div>
                      </div>
                      <div className="row mt-3">
                        <div className="col-md-4">
                          <LearningMode
                            availableModesOfDelivery={course.availableModesOfDelivery} 
                            selected={this.state.plan === 'on site'}
                            classTitle='Onsite Class'
                            setPlan={this.setPlan}
                            type='on site'
                          />
                        </div>
                        <div className="col-md-4">
                          <LearningMode 
                            availableModesOfDelivery={course.availableModesOfDelivery}
                            selected={this.state.plan === 'remote'}
                            classTitle='Remote Class'
                            setPlan={this.setPlan}
                            type='remote'
                          />
                        </div>
                        <div className="col-md-4">
                          <LearningMode 
                            availableModesOfDelivery={{}}
                            selected={this.state.plan === 'on demand'}
                            classTitle='On Demand'
                            setPlan={this.setPlan}
                            type='on-demand'
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mt-4 mb-3">
                        <Button
                          className="enroll__button"
                          disabled={!this.state.plan}
                          onClick={() => this.moveToStep(2)}
                          size="large"
                          type="danger"
                        >
                          Proceed
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={`${this.activeStepStyles(2)}`}>
                    <div
                      className="wrapper pl-4 pr-4"
                      style={{
                        [this.state.step === 2 && 'minHeight']: 240,
                        [this.state.step !== 2 && 'height']: 60,
                        overflow: 'hidden'
                      }}
                    >
                      <div className="d-flex has-full-width justify-content-between align-items-center h60">
                        <h5 style={this.stepTextStyle(2)}>
                          Choose a class batch
                        </h5>
                        <div>{this.showStepNav(2)}</div>
                      </div>
                      <AvailableBatchList
                        plan={this.state.plan}
                        selectedBatchId={this.state.courseBatchId}
                        setAvailableDate={this.setAvailableDate}
                        deliveryModes={course.availableModesOfDelivery[this.state.plan]}
                      />
                      <div className="d-flex justify-content-center mt-5 mb-3">
                        <Button
                          className="enroll__button"
                          disabled={!this.state.availableDate}
                          onClick={() => this.moveToStep(3)}
                          size="large"
                          type="danger"
                        >
                          Proceed
                        </Button>
                      </div>
                    </div> 
                  </div>

                  <div className={`${this.activeStepStyles(3)}`}>
                    <div className={`h60 has-full-width wrapper ${this.state.step < 3 ? 'pl-4 pr-4' : ''}`}>
                      <div className="d-flex has-full-width justify-content-between align-items-center h60">
                        <Display if={this.state.step < 3}>
                          <h5 className="text-center" style={this.stepTextStyle(3)}>
                            Proceed to make payment
                          </h5>
                        </Display>  
                        <Display if={this.state.step >=  3}>
                          <Button
                            style={{ width: '100%', background: '#009245', color: 'white' }}
                            className="h60"
                            onClick={this.initiateEnrollment}
                            disabled={this.state.step < 3 || this.state.loading}
                            loading={this.state.loading}
                            size="large"
                          >
                            Proceed to make payment
                          </Button> 
                        </Display>
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
  enroll: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateCourse: PropTypes.func.isRequired,
  currentPath: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
  course: state.course,
  isLoggedIn: state.auth.isLoggedIn,
})

const WrappedEnrollForm = Form.create({ name: 'login' })(
  connect(
    mapStateToProps,
    {
      enroll: actions.enroll,
      updateCourse: actions.updateCourse
    }
  )(Enroll)
)

export default withAuthLayout(WrappedEnrollForm)
