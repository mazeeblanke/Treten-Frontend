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
              Treten Academy is a leading training institute focused on creating value and building capacity in the area of Information Technology. We position individuals for global employability, and equip work-forces with the skills required to meet organizational needs. At Treten, we are bound by 3ve core values: Trust, Innovation, Collaboration, Honesty & Excellence. 
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
