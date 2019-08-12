import React from 'react';
import PropTypes from 'prop-types';
import Display from '../../components/shared/Display';

const Instructor = props => {
  let classes = ["card text-center mb-6"];
  props.hasBorder
    ? classes.push('')
    : classes.push('has-box-shadow border-0')

  return (
    <div className="instructor" key={props.fullname}>
      <div className={classes.join(' ')}>
        <img src={props.profile_pic} className="rounded-circle mt-4" alt={props.fullname} />
        <div className="card-body">
          <h5 className="card-title instructor__fullname mb-0 pb-0">{props.fullname}</h5>
          <h6 className="instructor__title mb-0 pb-0">{props.title}</h6>
          <p>{props.qualifications}</p>
          <Display if={props.social_links}>
            <div className="container social-links">
              <div className="row justify-content-center">
                <div className="col-sm-2">
                  <img src="/static/images/social/linkedin inverted.png" />
                </div>
                <div className="col-sm-2">
                  <img src="/static/images/social/facebook inverted.png" />
                </div>
                <div className="col-sm-2">
                  <img src="/static/images/social/twitter inverted.png" />
                </div>
              </div>
            </div>
          </Display>
        </div>
      </div>
    </div>
  );
};

Instructor.propTypes = {

};

export default Instructor;