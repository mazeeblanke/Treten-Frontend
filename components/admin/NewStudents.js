import React from "react";
import { Icon } from "antd";
import PropTypes from "prop-types";

import dynamic from "next/dynamic";
const Skeleton = dynamic(() => import("react-loading-skeleton"), {
  ssr: false
});

const LatestEnrollments = props => {
  return (
    <div className="col-md-12 col-xl-6 newstudents mb-6">
      <div className="card dashboard__card border-0 has-full-height">
        <div className="card-body" style={{ padding: "2.2rem 2.2rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0">
              <b>New Students</b>
            </h5>
            <Icon
              onClick={props.refreshNewStudents}
              type="sync"
              spin={props.isRefreshingNewStudents}
            />
            {/* <img  src="/static/images/refresh.png" /> */}
          </div>
          <div className="">
            <div className="row">
              {props.newStudents.map((student, index) => (
                <div
                  className="col-md-6"
                  style={{
                    borderRight: index % 2 === 0 ? "1px solid #e8e8e8" : null
                  }}
                >
                  <div className="d-flex align-items-center mt-3 pt-2 mb-4">
                    {!props.isRefreshingNewStudents ? (
                      <img
                        className="mr-2 h45 profile_pic"
                        src={student.profile_pic}
                      />
                    ) : (
											<>
                      	<Skeleton circle={true} height={45} width={45} />
												{"    "}
											</>
                    )}
                    <div className="d-flex justify-content-center flex-column">
                      <h6 className="testimonial__title mb-0 pb-0">
                        {!props.isRefreshingNewStudents ? (
                          <span>{student.name}</span>
                        ) : (
                          <Skeleton />
                        )}
                      </h6>

                      <p className="mb-0">
                        {!props.isRefreshingNewStudents ? (
                          <span>{student.email}</span>
                        ) : (
                          <Skeleton height={8} width={140} />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LatestEnrollments.propTypes = {};

export default LatestEnrollments;
