import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const columns = [
  {
    title: "Course",
    dataIndex: "course",
  },
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => {
      return <span className="tag is-success">{text}</span>
    }
  },
  {
    title: "Date and time",
    dataIndex: "date"
  },
];

const students = [
  {
    profile_pic: '/static/images/instructors/instructor1.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor2.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor3.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor4.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor1.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor2.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor3.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
  {
    profile_pic: '/static/images/instructors/instructor4.png',
    fullname: 'Sheldor Cooper',
    email: 'sheldorcooper@gmail.com',
  },
]

const LatestEnrollments = props => {
  return (
    <div className="col-md-12 col-xl-6 newstudents mb-6">
      <div className="card dashboard__card border-0 has-full-height">
        <div className="card-body" style={{ padding: "2.2rem 2.2rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="m-0"><b>New Students</b></h5>
            <img src="/static/images/refresh.png" />
          </div>
          <div className="">
            <div className="row">
              {
                students.map((student, index) => (
                  <div className="col-md-6" style={{ borderRight: index % 2 === 0 ? '1px solid #e8e8e8' : null  }}>
                    <div className="d-flex align-items-center mt-3 pt-2 mb-4">
                      <img className="mr-2 h45 profile_pic" src={student.profile_pic} />
                      <div className="d-flex justify-content-center flex-column">
                        <h6 className="testimonial__title mb-0 pb-0">{student.fullname}</h6>
                        <p className="mb-0">{student.email}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LatestEnrollments.propTypes = {};

export default LatestEnrollments;
