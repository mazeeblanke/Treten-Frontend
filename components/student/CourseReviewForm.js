import { Form, Icon, Input, Button, Checkbox } from 'antd';
import ReactPhoneInput from 'react-phone-input-2'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";
import 'react-phone-input-2/dist/style.css'

const { TextArea } = Input;

class CourseReviewForm extends Component {
  state = {
    phone: ''
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="col-md-6 coursereview-form p-0">
        <Form onSubmit={this.handleSubmit} className="form">
          <div className="row">
            <div className="col-md-12 mt-3">
              <Form.Item>
                <label htmlFor="email">
                  <b>Rate this course</b>
                </label>
                <br></br>
                <StarRatings
                  starEmptyColor="#fff"
                  starDimension="22px"
                  starSpacing="5px"
                  rating={0}
                  starRatedColor="#E12828"
                  changeRating={() => {}}
                  numberOfStars={5}
                  name='rating'
                />
              </Form.Item>
            </div>
            <div className="col-md-8 mt-3">
              <Form.Item>
                <label htmlFor="email">
                  <b>What’s your job title?</b>
                </label>
                {getFieldDecorator('job_title', {
                  rules: [{ required: true, message: 'Please input your job title!' }],
                })(
                  <Input
                    size="large"
                    type="text"
                    placeholder="e.g. Network Engineer"
                  />
                )}
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item>
                <label >
                  <b>Write your review</b>
                </label>
                {getFieldDecorator('review', {
                  rules: [{ required: true, message: 'Please input your review!' }],
                })(
                  <TextArea
                    size="large"
                    rows={5}
                    placeholder="Share your experience on this course"
                  />,
                )}
              </Form.Item>
            </div>

            <div className="col-md-12 mt-5">
              <Form.Item className="">
                <Button
                  style={{ width: '180px', height: '42px' }}
                  type="danger"
                  htmlType="submit"
                  className="pl-4 pr-4">
                  Submit course review
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

CourseReviewForm.propTypes = {

};

const WrappedCourseReviewForm = Form.create({ name: 'register_form' })(CourseReviewForm);

export default WrappedCourseReviewForm;