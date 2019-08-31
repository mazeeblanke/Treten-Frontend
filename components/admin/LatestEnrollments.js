import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

const columns = [
  {
    title: "Course",
    dataIndex: "course",
    width: 80,
    key: 5,
    fixed: 'left',
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 100,
    key: 1
  },
  {
    title: "Status",
    dataIndex: "status",
    width: 100,
    key: 2,
    render: (text) => {
      return <span className="tag is-success">{text}</span>
    }
  },
  {
    title: "Date and time",
    dataIndex: "date",
    // fixed: 'right',
    key: 3,
    width: 200
  },
];

const LatestEnrollments = props => {
  return (
    <div className="col-md-12 col-xl-6 mb-6">
      <div className="card dashboard__card border-0">
        <div className="card-body" style={{ padding: "2rem 2rem" }}>
          <h5 className="mb-4"><b>Latest enrollments</b></h5>
          <Table pagination={false} scroll={{ x: 500 }}  columns={columns} dataSource={props.latestEnrollments} />
        </div>
      </div>
    </div>
  );
};

LatestEnrollments.propTypes = {};

export default LatestEnrollments;
