import React from 'react';
import PropTypes from 'prop-types';
import  Dropzone from 'react-dropzone';
import { Select, Input } from 'antd';

const CourseDetails = props => {
  return (
    <div className="container mt-7">
      <div className="row">
        <div className="col-md-6 mb-5">
          <label htmlFor="duration"  className="mb-3">
            <b>Duration</b>
          </label>
          <Input
            value={props.courseForm.duration}
            className="mt-3 is-transparent-bg"
            allowClear
            size="large"
            type="number"
            min={0}
            placeholder="Number of weeks till completion"
            onChange={(e) => props.setForm('duration', e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="institution">
            <b>Institution</b>
          </label>
          <Select
            value={props.courseForm.institution}
            onChange={(e) => props.setForm('institution', e)}
            size="large"
            placeholder="Select institution"
            className="has-full-width mt-3 is-transparent-bg"
          >
            <Select.Option value="good">good</Select.Option>
          </Select>
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="certification-by">
            <b>Certification by</b>
          </label>
          <Select
            onChange={(e) => {props.setForm('certificationBy', e)}}
            size="large"
            placeholder="Select"
            className="has-full-width mt-3 is-transparent-bg"
          >
            <Select.Option value="good">good</Select.Option>
          </Select>
        </div>
        <div className="col-md-6 mb-5">
          <label htmlFor="price"  className="mb-3">
            <b>Price (optional)</b>
          </label>
          <Input
            className="mt-3 is-transparent-bg"
            allowClear
            size="large"
            type="number"
            min={0}
            placeholder="Enter price"
            onChange={(e) => {props.setForm('price', e.target.value)}}
          />
        </div>
        <div className="col-md-6 mb-3">
          {
            !props.courseForm.file
              ? (
                <Dropzone onDropAccepted={(e) => this.setCourseForm({ name: 'file', value: e[0] })}>
                  {({getRootProps, getInputProps}) => (
                    <div {...getRootProps({className: 'dropzone'})}>
                      <input {...getInputProps()} />
                      <img className="mt-4" src="/static/images/cloud.png" />
                      <p className="mt-2 p-2 text-center" style={{ fontSize: '1rem' }}>Click to upload file or drag in from computer</p>
                    </div>
                  )}
                </Dropzone>
              )
              : (
                <div className="text-center">
                  <div className="d-flex justify-content-center align-items-center">
                    <img style={{  height: '75px' }} className="mr-3" src="/static/images/file_des.svg"/>
                    <p className="m-0 p-0">{props.courseForm.file.name}</p>
                  </div>
                  <small
                    onClick={(e) => this.setCourseForm({ name: 'file', value: e[0] })}
                    style={{ color: '#e12828' }}
                  >
                    remove file
                  </small>
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
};

CourseDetails.propTypes = {

};

export default CourseDetails;