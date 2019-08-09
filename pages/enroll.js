import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button, Input, Form } from 'antd';
import withAuthLayout from '../pages/layouts/withAuthLayout';
import Display from '../components/shared/Display';
import RegisterForm from '../components/auth/EnrollRegisterForm';
import LoginForm from '../components/auth/EnrollLoginForm';
import { connect } from 'react-redux';

const { TabPane } = Tabs;

class Enroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      plan: 'onsite',
      availableDate: '',
      auth: 'register'
    }
  }

  moveToStep = (step) => {
    this.setState({
      step
    })
  }

  setPlan = (plan) => {
    this.setState({
      plan
    })
  }

  setAuth (auth) {
    this.setState({
      auth
    })
  }

  setAvailableDate = (availableDate) => {
    this.setState({
      availableDate
    })
  }

// height of 60
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <section className="auth has-white-bg has-min-full-vh pb-5">
        <div className="container pt-5 has-full-height">
          <div className="row justify-content-center has-full-height">
            <div
              style={{
                borderLeft: '2px solid #F0F1F3',
                height: this.state.step === 3 && !this.props.isLoggedIn
                  ? '240px'
                  : ( this.state.step === 3 && this.props.isLoggedIn
                      ? '140px'
                      : ( this.props.isLoggedIn
                          ? '600px'
                          : ( this.state.step === 2 && this.state.auth === 'register'
                              ? '830px'
                              : ( this.state.step === 2 && this.state.auth === 'login'
                                  ? '590px'
                                  : '710px'
                                )
                            )
                        )
                    )
              }}
              className="col-md-8 col-lg-6"
            >
                <div className={`step first ${this.state.step >= 1 ? 'active' : '' } pb-5 pl-4`} >
                  <div
                    className="wrapper pl-4 pr-4"
                    style={{ height: this.state.step === 1 ? '530px' : '60px', overflow: 'hidden' }}>
                    <div className="d-flex justify-content-sm-between align-items-center h60">
                      <h5 style={{
                        color: this.state.step < 1 ? '#D3D4D8' : null,
                        fontWeight: this.state.step < 1 ? '400' : '600'
                      }}>
                        Select your preferred mode of learning
                      </h5>
                      <div>
                        <Display if={this.state.step === 1}>
                          <span className="minimize"></span>
                        </Display>
                        <Display if={this.state.step !== 1 }>
                          <span
                            style={{ color: this.state.step < 1 ? '#D3D4D8' : null }}
                            onClick={() => this.moveToStep(1) } className="expand">+</span>
                        </Display>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div
                          onClick={() => this.setPlan('onsite')}
                          className={`
                            d-flex flex-column
                            plan text-center
                            justify-content-center
                            p-3 ${this.state.plan === 'onsite' ? 'selected' : '' }`
                          }
                        >
                          <h6 className="fw-600">On site</h6>
                          <p>Learn in person at our training facility</p>
                          <hr></hr>
                          <h3>N250,000</h3>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          onClick={() => this.setPlan('remote')}
                          className={`
                            d-flex flex-column
                            plan text-center
                            justify-content-center
                            p-3 ${this.state.plan === 'remote' ? 'selected' : '' }`
                          }>
                          <h6 className="fw-600">Remote</h6>
                          <p>Learn online from wherever you are</p>
                          <hr></hr>
                          <h3>N250,000</h3>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          onClick={() => this.setPlan('ondemand')}
                          className={`
                            d-flex flex-column
                            plan text-center
                            justify-content-center
                            p-3 ${this.state.plan === 'ondemand' ? 'selected' : '' }`
                          }
                        >
                          <h6 className="fw-600">On demand</h6>
                          <p>Gain instant access to the course online</p>
                          <hr></hr>
                          <h3>N250,000</h3>
                        </div>
                      </div>
                    </div>
                    <h6 className="fw-600 mt-4 pt-1">When would you like to start?</h6>
                    <p>Showing next available starting dates</p>
                    <div className="row mt-4">
                      <div className="col-md-3">
                        <div
                          onClick={() => this.setAvailableDate('12/4/2018')}
                          className={`avaliable-date ${this.state.availableDate === '12/4/2018' ? 'selected' : '' }`}>
                          <p className="m-0 p-2">12 May 2019</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div
                          onClick={() => this.setAvailableDate('12/5/2018')}
                          className={`avaliable-date ${this.state.availableDate === '12/5/2018' ? 'selected' : '' }`}>
                          <p className="m-0 p-2">1 June 2019</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div
                          onClick={() => this.setAvailableDate('12/6/2018')}
                          className={`avaliable-date ${this.state.availableDate === '12/6/2018' ? 'selected' : '' }`}>
                          <p className="m-0 p-2">2 July 2019</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div
                          onClick={() => this.setAvailableDate('12/7/2018')}
                          className={`avaliable-date ${this.state.availableDate === '12/7/2018' ? 'selected' : '' }`}>
                          <p className="m-0 p-2">12 April 2019</p>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center mt-5 mb-3">
                      <Button onClick={() => this.moveToStep( this.props.isLoggedIn ? 3: 2)} size="large" type="danger">Proceed</Button>
                    </div>
                  </div>
                </div>
                <Display if={!this.props.isLoggedIn}>
                  <div className={`step ${this.state.step >= 2 ? 'active' : null } pb-5 pl-4`}>
                    <div className="wrapper pl-4 pr-4" style={{
                        height: this.state.step === 2 && this.state.auth === 'register'
                          ? '650px'
                          :(
                            this.state.step === 2 && this.state.auth === 'login'
                              ? '425px'
                              : '60px'
                            ),
                        overflow: 'hidden'
                      }}>
                      <div className="d-flex justify-content-sm-between align-items-center h60">
                        <h5 style={{
                          color: this.state.step < 2 ? '#D3D4D8' : null,
                          fontWeight: this.state.step < 2 ? '400' : '600'
                        }}>
                          Register or log in to your account
                        </h5>
                        <div>
                          <Display if={this.state.step === 2}>
                            <span className="minimize"></span>
                          </Display>
                          <Display if={this.state.step !== 2 }>
                            <span
                              style={{ color: this.state.step < 2 ? '#D3D4D8' : null }}
                              onClick={() => this.moveToStep(2) }
                              className="expand">+</span>
                          </Display>
                        </div>
                      </div>
                      <h6>Register</h6>
                      <Display if={this.state.auth === 'register' }>
                        <p>Already have an account? <a onClick={() => this.setAuth('login')}>Log in </a></p>
                      </Display>
                      <Display if={this.state.auth === 'login' }>
                        <p>Don't have an account? <a onClick={() => this.setAuth('register')}> Register </a></p>
                      </Display>
                      <p className="mt-4 is-grey-light divider">
                        Continue with
                      </p>

                      <div className="d-flex mb-3">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="linkedin-btn mr-3">
                          <img className="mr-2" src="/static/images/social/linkedin icon.png" />
                          LinkedIn
                        </Button>

                        <Button
                          type="primary"
                          htmlType="submit"
                          className="facebook-btn">
                            <img className="mr-2" src="/static/images/social/facebook icon.png" />
                          Facbook
                        </Button>
                      </div>
                      <p className="is-grey-light divider">Or</p>
                      <Display if={this.state.auth === 'login' }>
                        <LoginForm proceed={() => this.moveToStep(3)}  />
                      </Display>
                      <Display if={this.state.auth === 'register' }>
                        <RegisterForm proceed={() => this.moveToStep(3)} />
                        <p>By registering, you agree to our Terms and Conditions and Policies</p>
                      </Display>
                    </div>
                  </div>
                </Display>
                <div className={`step ${this.state.step >= 3 ? 'active' : null } pl-4`}>
                  <div className="wrapper pl-4 pr-4" style={{ height: '60px', overflow: 'hidden' }}>
                    <div className="d-flex justify-content-sm-between align-items-center h60">
                      <h5 style={{ color: this.state.step < 3 ? '#D3D4D8' : null }}>
                        Make payment
                      </h5>
                      <div>
                        <Button
                          disabled={
                            this.state.step < 3 ? true : false
                          }
                          size="large"
                          type={this.state.step === 3 ? 'danger' : null }
                      >Pay now</Button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Enroll.propTypes = {

};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

const WrappedEnrollForm = Form.create({ name: 'login' })(
  connect(mapStateToProps, {})(Enroll)
);

export default withAuthLayout(WrappedEnrollForm);