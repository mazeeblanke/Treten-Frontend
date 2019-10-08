import InstructorForm from '../components/auth/InstructorForm';
import withAuthLayout from '../pages/layouts/withAuthLayout';
import Display from "../components/shared/Display";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button } from 'antd';

class Auth extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    return (
      <section className="become-an-instructor has-min-full-vh pb-5">
        <div className="container pt-3 has-full-height">
          <h3 className="text-center mt-3 pb-1 mb-4">Become an Instructor</h3>
          <div className="row justify-content-center has-full-height">
            <div className="col-md-4 pl-5 pr-5 auth__wrapper">
              <div className="auth__container">
                <Display if={true}>
                  <h5 className="text-center fw-600 mb-5 mt-5">Complete the form below</h5>
                  <InstructorForm />
                </Display>
                <Display if={false}>
                  <div className="d-flex justify-content-center flex-sm-direction align-items-center confirmation">
                    <div className="d-flex align-items-center flex-column justify-content-center">
                      <img className="mb-2" src="/static/images/confirmation.png" />
                      <p className="text-center pl-5 pr-5">Thanks for your interest! We will be in touch with you shortly.</p>
                    </div>
                  </div>
                </Display>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Auth.propTypes = {

};

export default withAuthLayout(Auth);