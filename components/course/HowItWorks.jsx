import React from 'react'
// import PropTypes from 'prop-types'

const HowItWorks = () => {
  return (
    <section id="howItWorks" className="mt-5 mb-5">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 p-0">
            <div className="how-it-works p-4">
              <h6 className="fw-600">How it works</h6>
              <div className="row">
                <div className="col-sm-12 col-md-6">
                  <img src="/static/images/coursework.png"></img>
                  <h6 className="fw-600 mt-3">Coursework</h6>
                  <p className="lh-30">
                    Each course is like an interactive textbook, featuring pre-recorded videos, quizzes and projects.
                  </p>
                </div>
                <div className="col-sm-12 col-md-6">
                  <img src="/static/images/peers.png" />
                  <h6 className="fw-600 mt-3">Help from your peers</h6>
                  <p className="lh-30">
                    Connect with thousands of other learners and debate ideas, discuss course material, and get help mastering concepts.
                  </p>
                </div>
                <div className="col-sm-12 col-md-6">
                  <img src="/static/images/certificates.png" />
                  <h6 className="fw-600 mt-3">Certificates</h6>
                  <p className="lh-30">
                    Earn official recognition for your work, and share your success with friends, colleagues, and employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// HowItWorks.propTypes = {

// }

export default HowItWorks
