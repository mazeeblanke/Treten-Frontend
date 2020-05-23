import React from 'react'
// import PropTypes from 'prop-types'

const Introduction = props => {
  return (
    <section className="whyus-introduction pb-4">
      <h3 className="whyus-introduction__main-text text-center pt-9 mb-6">
        Why us
      </h3>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <img alt="why us logo" src="/images/why-us.png" className="mb-3 has-full-width" />
            <ul className="pl-4 lh-30">
              <li>
                We are the first institute to offer CCIE training and Practice Labs in West Africa. 
              </li>
              <li>
                With a network of certified experts, we match the skills and experience required to give our students the expected learning outcome.
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-6">
            <ul className="pl-4 lh-30">
              <li>
                We recognize the individuality of our students, and our programs are tailored to suit their career objectives, schedule &  preferred learning methods. 
              </li>
              <li>
                Our curriculum is designed to enable multidimensional learning through Online Labs, Scenario-based labs, Simulations, Lab Manuals and Practice Questions which  make learning easy. 
              </li>
              <li>
                We adopt a range of methods in delivery; ranging from physical & virtual classes, bootcamps, one-on-one and on-demand learning that allows learning at your own pace. 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

Introduction.propTypes = {

}

export default Introduction
