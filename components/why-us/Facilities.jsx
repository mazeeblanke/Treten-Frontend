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
                  <li>Conducive environment</li>
                  <li>24/7 Lab Access.</li>
                  <li>On-demand classes</li>
                  <li>Dedicated Lab Technicians</li>
                  <li>Classroom Trainings</li>
                  <li>Virtual Classrooms</li>
                  <li>Practice workbooks & questions</li>
                  <li>Travel Visa Support</li>
                </ul>
              </div>
              <div className="col-sm-12 col-md-5">
                <ul className="pl-4 lh-30">
                  <li>Networking Community</li>
                  <li>Learning Management System</li>
                  <li>Study rooms</li>
                  <li>Career-driven curriculum</li>
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
