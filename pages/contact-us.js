import React from 'react'
// import PropTypes from 'prop-types';
// import withMasterLayout from './layouts/withMasterLayout';
import Footer from '../components/shared/Footer'
import ContactUsForm from '../components/contact-us/ContactUsForm'
// import Navbar from '../components/shared/Navbar'
import withMasterLayout from './layouts/withMasterLayout'

const ContactUs = () => (
  <div id="treten">
    {/* <Navbar noBoxShadow /> */}
    <section className="contact-us has-grey-bg">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-5">
            <h3 className="text-center pt-5 pb-3 contact-us__main-text mt-3">Contact us</h3>
            <p className="text-center contact-us__sub-text mb-5">
              You can contact us using the details below or by completing the form.
            </p>
            <div className="row">
              <div className="col-md-6">
                <address className="mb-3 d-flex align-items-start">
                  <img src="/static/images/address.png" className="mr-2 pt-1" alt="address" />
                  <span className="is-grey-dark">
                    Oak Place Plot 14, Nike Art Gallery Road, Ikate, Lekki Phase 1 Lagos, Nigeria
                  </span>
                </address>
                <time className="mb-3 d-flex align-items-start">
                  <img src="/static/images/time.png" className="mr-2 pt-1" alt="time" />
                  <span className="is-grey-dark">9:00 AM - 6:00 PM (Monday - Friday)</span>
                </time>
              </div>
              <div className="col-md-6">
                <a className="mb-3 d-flex align-items-start" href="tel:(+234) 9060 0063 12">
                  <img src="/static/images/phone.png" className="mr-2 pt-1" alt="phone" />
                  <span className="is-grey-dark">(+234) 9060 0063 12</span>
                </a>

                <p className="mb-3 d-flex align-items-start">
                  <img src="/static/images/mail.png" className="mr-2 pt-1" alt="mail" />
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
)

// ContactUs.getInitialProps = (ctx) => {
//   // console.log(ctx.req.url)
//   return {
//     url: ctx.req.url
//   }
// }

// ContactUs.propTypes = {};

export default withMasterLayout(ContactUs)
