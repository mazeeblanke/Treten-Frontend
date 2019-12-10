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
              To become the global leader in ICT trainings for individuals, Corporate Bodies and Tertiary Institutions.
            </p>

            <h3 className="aboutus-goals__main-text pt-3">
              Our mission
            </h3>
            <ul className="pl-4 lh-30">
              <li>Form strategic and mutually beneficial partnerships with you.</li>
              <li>Evolve and position ourselves as an international class progressive, cost effective and student friendly institution.</li>
              <li>Constantly push boundaries and offer the highest quality of resources to our family of students and post graduate community.</li>
              <li>Develop and engage local talents, while leveraging our state-of-the-art technology in producing globally relevant professionals.</li>
            </ul>

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
