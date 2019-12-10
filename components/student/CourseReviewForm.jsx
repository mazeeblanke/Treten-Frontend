/* eslint-disable */
import { Form, Input, Button } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import notifier from 'simple-react-notifications'
import { isEqual } from 'lodash'

const { TextArea } = Input

class CourseReviewForm extends Component {
  state = {
    isSubmittingReview: false
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {
      course,
      editCourseReview,
      addCourseReview
    } = this.props
    this.props.form.validateFields((err, form) => {
      if (!err) {
        this.setState({
          isSubmittingReview: false
        })
        const action = (course.courseReview || {}).id
          ? editCourseReview
          : addCourseReview
        action(form)
          .then((res) => {
            notifier.success(res.data.message)
          })
          .catch((err) => {
            notifier.error('ERROR!' + err.response.data.message)
          })
          .finally(() => {
            this.setState({
              isSubmittingReview: false
            })
          })
      }
    })
  }

  render () {
    const {
      user,
      course
    } = this.props
    const { 
      getFieldValue,
      getFieldDecorator, 
      getFieldsValue 
    } = this.props.form
    const {
      createdAt,
      approved,
      enrolleeId,
      ...review
    } = course.courseReview || {}
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
                {getFieldDecorator('rating', {
                  rules: [{ required: true, message: 'Please input your rating!' }],
                  initialValue: review && review.rating
                })(
                  <StarRatings
                    starEmptyColor="#fff"
                    starDimension="22px"
                    starSpacing="5px"
                    rating={getFieldValue('rating')}
                    starRatedColor="#E12828"
                    changeRating={(rating) => {
                      this.props.form.setFieldsValue({
                        rating
                      })
                    }}
                    numberOfStars={5}
                    name='rating'
                  />
                )}
              </Form.Item>
            </div>
            <div className="col-md-8">
              <Form.Item style={{ display: 'none' }}>
                {getFieldDecorator('id', {
                  initialValue: review && review.id
                })(
                  <input hidden/>,
                )}
              </Form.Item>
            </div>
            <div className="col-md-8">
              <Form.Item style={{ display: 'none' }}>
                {getFieldDecorator('courseId', {
                  initialValue: course.id
                })(
                  <input hidden/>,
                )}
              </Form.Item>
            </div>
            <div className="col-md-8 mt-3">
              <Form.Item>
                <label htmlFor="job_title">
                  <b>What’s your job title?</b>
                </label>
                <Input
                  value={user.title}
                  size="large"
                  type="text"
                  disabled={true}
                  placeholder="e.g. Network Engineer"
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Form.Item>
                <label >
                  <b>Write your review</b>
                </label>
                {getFieldDecorator('reviewText', {
                  rules: [{ required: true, message: 'Please input your review!' }],
                  initialValue: review && review.reviewText
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
                  disabled={
                    (!getFieldValue('rating') || !getFieldValue('reviewText')) ||
                    isEqual(getFieldsValue(), review)
                  }
                  htmlType="submit"
                  className="pl-4 pr-4">
                  {!review.id ? 'Submit course review' : 'Save changes'}
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

const WrappedCourseReviewForm = Form.create({ name: 'course review form' })(CourseReviewForm)

CourseReviewForm.propTypes = {
  form: PropTypes.object,
  user: PropTypes.object,
  course: PropTypes.object,
  addCourseReview: PropTypes.func.isRequired,
  editCourseReview: PropTypes.func.isRequired,
}

export default WrappedCourseReviewForm
