import React from "react";
import PropTypes from "prop-types";
import Display from "../../components/shared/Display";
import Link from 'next/link'
import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false
});

const Instructor = props => {
  let classes = ["card text-center mb-6"];
  props.hasBorder ? classes.push("has-border") : classes.push("has-box-shadow border-0");
  return (
    <div
      className={`instructor mb-5 ${props.wrapperBorder ? 'has-border' : ''}`}
      style={{ height: "290px", maxHeight: "290px", background: "white" }}
    >
      <Link href={`/instructors/${props.userable.instructor_slug}`}>
        <div className={`${classes.join(" ")}`}>
          {!props.isLoading ? (
            <img
              src={props.profile_pic}
              className="rounded-circle mt-4"
              alt={props.name}
            />
          ) : (
            <div className="mt-4">
              <Skeleton circle={true} height={100} width={100} />{" "}
            </div>
          )}
          <div className="card-body">
            {!props.isLoading ? (
              <h5 className="card-title instructor__fullname mb-0 pb-0">
                {props.name}
              </h5>
            ) : (
              <div>
                <Skeleton width={130} />
              </div>
            )}
            {!props.isLoading ? (
              <h6 className="instructor__title mb-0 pb-0 text-capitalize">
                {props.userable.title}
              </h6>
            ) : (
              <div>
                <Skeleton width={90} />
              </div>
            )}
            {!props.isLoading ? (
              <p>{props.userable.qualifications}</p>
            ) : (
              <div>
                <Skeleton width={180} />
              </div>
            )}
            <Display if={props.social_links}>
              <div className="container social-links">
                <div className="d-flex justify-content-center">
                  <img src="/static/images/social/linkedin inverted.png" />
                  <img
                    className=""
                    src="/static/images/social/facebook inverted.png"
                  />
                  <img
                    className=""
                    src="/static/images/social/twitter inverted.png"
                  />
                </div>
              </div>
            </Display>
          </div>
        </div>
      </Link>
    </div>
  );
};

Instructor.propTypes = {};

export default Instructor;
