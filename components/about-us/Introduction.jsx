// import PropTypes from 'prop-types'
import React from 'react'

const Introduction = props => {
  return (
    <section className="aboutus-introduction mt-3">
      <div className="container pb-4">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-9 align-items-center d-flex flex-column">
            <h3 className="features__main-text">
              About us
            </h3>
            <p className="lh-30 mb-3 has-width-80">
              We are Africa’s largest CISCO Laboratory focused on developing capacity, capability and competence especially
              in the area of Information Technology. We place participants at better positions for employment globally, equip
              them for improved service delivery and build workforces engineered to suit different organizational needs.
              We are bound by four key values Honesty, Excellence, Achievement, Recognition and Team Spirit.
            </p>
          </div>
        </div>
      </div>
      <img className="has-full-width" src="/static/images/aboutusbanner.png" />
    </section>
  )
}

Introduction.propTypes = {

}

export default Introduction
