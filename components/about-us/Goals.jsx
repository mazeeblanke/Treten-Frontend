import React from 'react'
// import PropTypes from 'prop-types'

const Goals = props => {
  return (
    <section className="aboutus-goals pt-7 pb-7">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">

            <h3 className="aboutus-goals__main-text">
              Our vision
            </h3>
            <p className="lh-30">
              To be the global leader in accelerating careers through ICT Training for individuals, organizations & academic institutions.
            </p>

            <h3 className="aboutus-goals__main-text pt-3">
              Our mission
            </h3>
            <div className="lh-30">
              To be recognized as a people-centric institution producing globally qualifed professionals by leveraging innovative technology in offering the best learning experience to students who are part of our community. 
            </div>

          </div>
          <div className="col-md-5 offset-md-1 p-6">
            <img src="/static/images/aboutus-goals.png" />
          </div>
        </div>
      </div>
    </section>
  )
}

Goals.propTypes = {

}

export default Goals
