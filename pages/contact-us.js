import withMasterLayout from '../pages/layouts/withMasterLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/shared/Footer';
import ContactUsForm from '../components/contact-us/ContactUsForm';
import Navbar from '../components/shared/Navbar';

class ContactUs extends Component {
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

  }

  componentWillUpdate(nextProps, nextState) {

  }

  componentDidUpdate(prevProps, prevState) {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div id="treten">
        <Navbar noBoxShadow />
        <section className="contact-us has-grey-bg">
          <div className="container">
            <div className="row justify-content-center mb-5">
              <div className="col-md-5">
                <h3 className="text-center pt-5 pb-3 contact-us__main-text mt-3">
                  Contact us
                </h3>
                <p className="text-center contact-us__sub-text mb-5">
                  You can contact us using the details below or by completing the form.
                </p>
                <div className="row">
                  <div className="col-md-6">
                    <address className="mb-3 d-flex align-items-start">
                      <img src="/static/images/address.png" className="mr-2 pt-1" />
                      <span className="is-grey-dark">
                        Oak Place Plot 14, Nike Art Gallery Road,
                        Ikate, Lekki Phase 1
                        Lagos, Nigeria
                      </span>
                    </address>
                    <time className="mb-3 d-flex align-items-start">
                      <img src="/static/images/time.png" className="mr-2 pt-1" />
                      <span className="is-grey-dark">9:00 AM - 6:00 PM (Monday - Friday)</span>
                    </time>
                  </div>
                  <div className="col-md-6">
                    <a className="mb-3 d-flex align-items-start" href="tel:(+234) 9060 0063 12">
                      <img src="/static/images/phone.png" className="mr-2 pt-1" />
                      <span className="is-grey-dark">(+234) 9060 0063 12</span>
                    </a>

                    <p className="mb-3 d-flex align-items-start">
                      <img src="/static/images/mail.png" className="mr-2 pt-1" />
                      <span className="is-grey-dark">info@tretennetworks.com</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <ContactUsForm />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

ContactUs.propTypes = {

};

export default ContactUs;