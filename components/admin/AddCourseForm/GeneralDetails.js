import React from 'react';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { Select, Input } from 'antd';
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const GeneralDetails = props => {
  return (
    <div className="container mt-7">
      <div className="row">
        <div className="col-md-6 mb-5">
          <label htmlFor="Select Category">
            <b>Course category</b>
          </label>
          <Select
            value={props.courseForm.category}
            onChange={(e) => {props.setForm('category', e)}}
            size="large"
            placeholder="Select course category"
            className="has-full-width mt-3 is-transparent-bg"
          >
            <Select.Option value="good">good</Select.Option>
          </Select>
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="Select Category" className="mb-3">
            <b>Course title</b>
          </label>
          <Input
            value={props.courseForm.title}
            className="mt-3 is-transparent-bg"
            allowClear
            size="large"
            type="text"
            placeholder="Enter course title"
            onChange={(e) => {props.setForm('title', e.target.value)}}
          />
        </div>
        <div className="col-md-12">
          <label htmlFor="about course">
            <b>About this course</b>
          </label>
          <ReactQuill
            className="mt-3"
            placeholder="Go into details about what this course is about"
            value=""
            onChange={(e) => {props.setForm('description', e)}}
            height={700}
          />
        </div>
      </div>
    </div>
  );
};

GeneralDetails.propTypes = {

};

export default GeneralDetails;