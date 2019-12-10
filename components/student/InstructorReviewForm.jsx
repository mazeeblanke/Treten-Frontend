/* eslint-disable */
import { Form, Input, Button } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import notifier from 'simple-react-notifications'
import { isEqual } from 'lodash'

const { TextArea } = Input

class InstructorReviewForm extends Component {
  state = {
    isSubmittingReview: false
	}

  handleSubmit = (e, index, instructorId) => {
		e.preventDefault()
    const {
      course,
      editInstructorReview,
			addInstructorReview,
			form: { getFieldsValue }
    } = this.props
			this.setState({
				isSubmittingReview: false
			})
			this.props.form.setFieldsValue({
				[`[${index}]loading`]: true
			})
			const review = (course.instructorReviews[instructorId] || [])[0]
			const action = review
				? editInstructorReview
				: addInstructorReview
			action(getFieldsValue()[index])
				.then((res) => {
					notifier.success(res.data.message)
				})
				.catch((err) => {
					notifier.error('ERROR!' + err.response.data.message)
					// btn.disabled = false
				})
				.finally(() => {
					this.setState({
						isSubmittingReview: false
					})
				})
  }

  render () {
    const {
      user,
      course
    } = this.props
    const { getFieldDecorator, getFieldsValue } = this.props.form
    return (
      <div className="col-md-6 coursereview-form p-0">
        <Form className="form">
					{
						course.timetable.map((t, index) => {
							const { 
								approved,
								enrolleeId,
								...review 
							} = (course.instructorReviews[t.id] || [{}])[0]
							return (
							<div key={t.id} className="row">
								<div className="col-md-12 mt-3">
									<Form.Item>
										<label htmlFor="email">
											<b>Rate {t.name}</b>
										</label>
										{getFieldDecorator(`[${index}]rating`, {
											rules: [{ required: true, message: 'Please input your rating!' }],
											initialValue: review.rating,
										})(
											<StarRatings
												starEmptyColor="#fff"
												starDimension="22px"
												starSpacing="5px"
												rating={getFieldsValue()[index].rating}
												starRatedColor="#E12828"
												changeRating={(rating) => {
													this.props.form.setFieldsValue({
														[`[${index}]rating`]: rating
													})
												}}
												numberOfStars={5}
												name='rating'
											/>
										)}
									</Form.Item>
								</div>
								<div className="col-md-12">
									<Form.Item style={{ display: 'none' }}>
										{getFieldDecorator(`[${index}]id`, {
											initialValue: review && review.id
										})(
											<input hidden/>,
										)}
									</Form.Item>
								</div>
								<div className="col-md-12">
									<Form.Item style={{ display: 'none' }}>
										{getFieldDecorator(`[${index}]courseId`, {
											initialValue: course.id
										})(
											<input hidden/>,
										)}
									</Form.Item>
								</div>
								<div className="col-md-12">
									<Form.Item style={{ display: 'none' }}>
										{getFieldDecorator(`[${index}]courseBatchId`, {
											initialValue: t.courseBatchId
										})(
											<input hidden/>,
										)}
									</Form.Item>
								</div>
								<div className="col-md-12">
									<Form.Item style={{ display: 'none' }}>
										{getFieldDecorator(`[${index}]authorId`, {
											initialValue: t.id
										})(
											<input hidden/>,
										)}
									</Form.Item>
								</div>
								<div className="col-md-12">
									<Form.Item>
										<label >
											<b>Write your review</b>
										</label>
										{getFieldDecorator(`[${index}]reviewText`, {
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
								<div className="col-md-12 mt-2">
									<Form.Item className="">
										<Button
											style={{ width: '180px', height: '42px' }}
											disabled={
												(!getFieldsValue()[index].rating || !getFieldsValue()[index].reviewText) ||
												isEqual(getFieldsValue()[index], review)
											}
											type="danger"
											onClick={(e) => this.handleSubmit(e, index, t.id)}
											className="pl-4 pr-4">
											{!review.id ? 'Submit review' : 'Save changes'}
										</Button>
									</Form.Item>
								</div>
							</div>
						)}
					)
				}
        </Form>
      </div>
    )
  }
}

const WrappedInstructorReviewForm = Form.create({ name: 'course review form' })(InstructorReviewForm)

InstructorReviewForm.propTypes = {
  form: PropTypes.object,
  user: PropTypes.object,
  course: PropTypes.object,
  addInstructorReview: PropTypes.func.isRequired,
  editInstructorReview: PropTypes.func.isRequired,
}

export default WrappedInstructorReviewForm
