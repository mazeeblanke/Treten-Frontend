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
            <img src="/static/images/why-us.png" className="mb-3 has-full-width" />
            <ul className="pl-4 lh-30">
              <li>
                We are Africa’s Largest CISCO Lab with our Institute being the first to fully
                offer CCIE courses and certification locally in the whole of Africa.
              </li>
              <li>
                Our Learning interventions are designed to provide blended learning across all
                learning tactics – Online Labs, Online training, Boot-Camps, Practicals, Simulated
                Scenarios, Free Practice Questions and Lab Manuals
              </li>
            </ul>
          </div>
          <div className="col-sm-12 col-md-6">
            <ul className="pl-4 lh-30">
              <li>
                Our network of recognized consultants allow us match the skills and experiences
                of the facilitator with the required learning outcome.
              </li>
              <li>
                We pride ourselves in our versatility and ability to tailor a program to suit our client’s
                objectives- We take into cognizance the pace of the learning of our participant, diversity in
                demographics, advancements in technology and delivery appeal to different generations – from the
                younger generation to the more seasoned groups – to guide our design and delivery.
              </li>
              <li>
                Our curriculums meet global standards and are also tailored to suit local needs. Our courses are
                professionally presented and well-paced with materials that make the learning easier.
              </li>
              <li>
                We have effective facilitators who are successful industry professionals, and possess the
                required certifications. We do not give what we don’t have.
              </li>
              <li>
                Beyond the skill, we teach the business behind the skill.
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
