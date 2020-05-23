import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Link from 'next/link'

class Resources extends Component {
  render () {
    return (
      <section className="resources mb-8 mt-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-12 col-md-4 mb-5">
              <div className="card border-0 text-center practice-questions">
                <img
                  src="/images/free practice question.png"
                  className="rounded-circle mt-4"
                  alt="practice questions icon"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0 pb-0">
                    Free Practice Questions
                  </h5>
                  <p>
                    Get free practice questions to aid exam preparation. Little
                    or no prior knowledge is required to understand their
                    context.
                  </p>
                  <Link href="/resources/interview-questions">
                    <p className="has-pointer-cursor">
                      <b>Get now</b>
                      <img
                        alt="get now"
                        style={{ height: '15px', width: '28px' }}
                        className="pl-3"
                        src="/images/arrow-right.png"
                      />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 mb-5">
              <div className="card border-0 text-center interview-questions">
                <img
                  src="/images/free interview questions.png"
                  className="rounded-circle mt-4"
                  alt="free interview questions"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0 pb-0">
                    Free Interview Questions
                  </h5>
                  <p>
                    Get interview questions put together by subject matter
                    experts. Gain 100% confidence at interviews.
                  </p>
                  <Link href="/resources/interview-questions">
                    <p className="has-pointer-cursor">
                      <b>Get now</b>
                      <img
                        alt="arrow right"
                        style={{ height: '15px', width: '28px' }}
                        className="pl-3"
                        src="/images/arrow-right.png"
                      />
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// Resources.propTypes = {}

export default Resources
