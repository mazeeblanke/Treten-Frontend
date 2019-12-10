import React from 'react'
// import PropTypes from 'prop-types'

const Facilities = props => {
  return (
    <section className="whyus-facilities has-grey-bg pt-6 pb-5">
      <h3 className="whyus-facilities__main-text text-center mt-7 mb-6">
        Our Facilities
      </h3>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-7">
            <div className="row">
              <div className="col-sm-12 col-md-7">
                <ul className="pl-4 lh-30">
                  <li>Safe and conducive learning environments</li>
                  <li>Uninterrupted power supply</li>
                  <li>24/7 access to our cloud labs</li>
                  <li>On-demand classes</li>
                  <li>Chat with instructors</li>
                  <li>Live classes</li>
                  <li>Student IDs</li>
                  <li>Live online classes</li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-5">
                <ul className="pl-4 lh-30">
                  <li>Practical workbooks</li>
                  <li>Practice questions</li>
                  <li>Parking space for cars</li>
                  <li>Visa support for travels</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-5">
            <img src="/static/images/tech-meeting-flatlay.png" className="has-full-width" />
          </div>
        </div>
      </div>
    </section>
  )
}

Facilities.propTypes = {

}

export default Facilities
