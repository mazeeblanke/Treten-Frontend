import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Button } from 'antd';
import withAuthLayout from '../pages/layouts/withAuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';

const { TabPane } = Tabs;

class Auth extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <section className="auth has-grey-bg has-min-full-vh pb-5">
        <div className="container pt-5 has-full-height">
          <div className="row justify-content-center has-full-height">
            <div className="col-md-5 auth__wrapper">
              <div className="auth__container">
                <Tabs className="has-full-height" type="card">


                  <TabPane className="has-full-height register pr-7 pl-7" tab="Register" key="register">
                    <h4 className="register__main-text text-center mt-2">Register to get your student account</h4>
                    <p className="register__sub-text text-center">
                      Your student account is your portal to all things:
                      your classroom, projects, forums, career resources, and more!
                    </p>

                    <p className="mt-4 is-grey-light divider">
                      Continue with
                    </p>

                    <div className="row justify-content-md-between">
                      <div className="col-md-6 mb-3">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="linkedin-btn has-full-width">
                          <img className="mr-2" src="/static/images/social/linkedin icon.png" />
                          LinkedIn
                        </Button>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="facebook-btn has-full-width">
                            <img className="mr-2" src="/static/images/social/facebook icon.png" />
                          Facbook
                        </Button>
                      </div>
                    </div>
                    <p className="is-grey-light divider">Or</p>
                    <RegisterForm />
                    <p className="auth__note">
                      By registering, you agree to our Terms and Conditions and Policies
                    </p>
                  </TabPane>


                  <TabPane className="has-full-height login  pr-7 pl-7" tab="Login" key="login">
                    <h4 className="register__main-text text-center mt-2">Welcome back. Log in to your account</h4>
                    <p className="register__sub-text text-center">
                      Your student account is your portal to all things: your classroom,
                      projects, forums, career resources, and more!
                    </p>
                    <p className="mt-4 is-grey-light divider">
                      Continue with
                    </p>

                    <div className="d-flex justify-content-md-between mb-3">
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="linkedin-btn">
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
                    <LoginForm />
                  </TabPane>


                </Tabs>
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