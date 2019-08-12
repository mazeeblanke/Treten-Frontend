import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Features extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    return (
      <section className="features mt-5 pb-5">
        <div className="container">
          <h3 className="text-center features__main-text">
            Features
          </h3>
          <div className="row justify-content-center mb-5">
            <div className="col-md-7 pl-4 pr-4">
              <p className="lh-30 text-center">
                The only home we've ever known vastness is bearable only through love
                galaxies Rig Veda permanence of the stars extraordinary claims require extraordinary evidence.
              </p>
            </div>
          </div>
          <div className="row is-hcentered">
            <div className="col-sm-12 col-md-6 pb-5">
              <div className="card mb-3" style={{ maxWidth: '615px' }}>
                <div className="row no-gutters align-items-center">
                  <div className="col-md-12 col-lg-6">
                    <img src="/static/images/features/intensive_pratical_classes.png" className="card-img" alt="intensive pratical classes" />
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="card-body">
                      <img src="/static/images/intensive_practical_classes.svg" />
                      <h5 className="card-title pt-3">Intensive Practical Classes</h5>
                      <p className="card-text">
                        Our courses are designed so you can master the best professional skills through
                        intensive practical classes focused on helping you master the required skill
                        for your new profession.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="card mb-3" style={{ maxWidth: '615px' }}>
                  <div className="row no-gutters align-items-center">
                    <div className="col-md-12 col-lg-6">
                      <img src="/static/images/features/247_access_lab.png" className="card-img" alt="247 access lab" />
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="card-body">
                        <img src="/static/images/234_access_lab.svg" />
                        <h5 className="card-title pt-3">24/7 Lab Access</h5>
                        <p className="card-text">
                          Our labs are well equiped with modern technology tools to help you master what your
                          instructors teach you in class. As our student, you have full access to this lab 24/7.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            <div className="col-sm-12 col-md-6">
              <div className="card mb-3" style={{ maxWidth: '615px' }}>
                <div className="row no-gutters align-items-center">
                  <div className="col-md-12 col-lg-6">
                    <img src="/static/images/features/best_learning_environment.png" className="card-img" alt="Best learning environment" />
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="card-body">
                      <img src="/static/images/best_learning_environ.svg" />
                      <h5 className="card-title pt-3">Best Learning Environment</h5>
                      <p className="card-text">
                        We know learning should be a fun experience and so we have set up a very conducive
                        environment for your learning at Treten Academy to be fun and enjoyable.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="card mb-3" style={{ maxWidth: '615px' }}>
                <div className="row no-gutters align-items-center">
                  <div className="col-md-12 col-lg-6">
                    <img src="/static/images/features/certified_experts.png" className="card-img" alt="Certified experts" />
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="card-body">
                      <img src="/static/images/certified_experts.svg" />
                      <h5 className="card-title pt-3">Certified Experts</h5>
                      <p className="card-text">
                        Your satisfaction is our top priority and so we have bring together professional and well trained instructors to help you reach your goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Features.propTypes = {};

export default Features