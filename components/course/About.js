import React from 'react';
import PropTypes from 'prop-types';
import CourseVideo from './CourseVideo';

const About = props => {
  return (
    <div className="container course-about">
      <div className="row p-5 align-items-center course-about__container mt-9 mb-8">
        <div className="col-sm-12 col-md-6">
          <h6 className="fw-600 mb-3">About this course</h6>
          <p className="mb-4">
            The CCNA Service Provider certification is for service provider network engineers,
            technicians, and support personnel who want to configure and implement robust baseline
            Cisco Service Provider IP next-generation networks.
          </p>
          <p className="mb-4">
            Cisco Certified Network Associate Service Provider (CCNA SP) certification is for service provider
            network engineers, technicians and designers who focus on the latest in Service Provider industry
            core networking technologies and trends. With the ability to configure, implement, and troubleshoot
            baseline Cisco Service Provider Next-Generation networks, CCNA SP certified individuals deploy,
            maintain and improve carrier-grade network infrastructures.
          </p>
          <div className="row">
            <div className="col-md-4">
              <h6 className="fw-600">Certification by</h6>
              <img src="/static/images/certifications/cisco.png"></img>
            </div>
            <div className="col-md-4">
              <h6 className="fw-600">Course syllabus</h6>
              <button type="button" class="btn btn-outline-danger mb-3">
                <img className="mr-2" src="/static/images/download.png"></img>
                <span>Download</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <CourseVideo video={} />
        </div>
      </div>
    </div>
  );
};

About.propTypes = {

};

export default About;