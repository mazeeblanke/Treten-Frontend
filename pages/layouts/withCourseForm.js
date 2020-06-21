/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import courseSchema from '../../lib/schemas/course'
import notifier from 'simple-react-notifier'
import yupToObject from 'yup-to-object'
import { convertToFormData } from '../../lib/helpers'
const uuidv1 = require('uuid/v1')

const resetCourseForm = () => ({
	title: '',
	coursePath: '',
	coursePathPosition: '',
	bannerImage: '',
	bannerImageBase64: '',
	videoId: '',
	description: '',
	enrollUrl: null,
	duration: null,
	price: null,
	category: '',
	certificationBy: '',
	institution: '',
	modules: [
	],
	faqs: [
	]
})

export default Page => {
	class withCourseForm extends Component {
		state = {
			errors: {},
			currentTab: 0,
			isSaving: false,
			isPublishing: false,
			courseForm: resetCourseForm(),
		}

		initCourseForm = (courseForm = resetCourseForm()) => {
			this.setState({
				courseForm
			})
		}

		nextStep = () => {
			const currentTab = this.state.currentTab + 1
			this._isMounted && this.setState({ currentTab })
		}

		prevStep = () => {
			const currentTab = this.state.currentTab - 1
			this._isMounted && this.setState({ currentTab })
		}

		addModule = () => {
			let modules = [...this.state.courseForm.modules]
			modules = [
				...modules,
				{
					name: '',
					description: '',
					id: uuidv1()
				}
			]

			this.setState({
				courseForm: {
					...this.state.courseForm,
					modules
				}
			},
				() => {
					this.moduleWrapperScrollContainer.scrollTo(0, this.moduleWrapperScrollContainer.scrollHeight - 400)
				}
			)
		}

		addFaq = () => {
			let faqs = [...this.state.courseForm.faqs]
			faqs = [
				...faqs,
				{
					answer: '',
					question: '',
					id: uuidv1()
				}
			]
			this.setState({
				courseForm: {
					...this.state.courseForm,
					faqs
				}
			},
				() => {
					this.faqsWrapperScrollContainer.scrollTo(0, this.faqsWrapperScrollContainer.scrollHeight - 400)
				}
			)
		}

		setForm = (value, field, nested = null, index = null) => {
			const { courseForm } = { ...this.state }
			if (!nested && !index && field) {
				courseForm[field] = value
			} else if (nested && index >= 0 && field) {
				courseForm[nested][index][field] = value
			} else if (!value && !field && nested && index >= 0) {
				courseForm[nested].splice(index, 1)
			}
			this.setState(
				{
					...this.state,
					courseForm,
				},
				() => {
					this.validate(nested || field)
				}
			)
		}

		validate = (field) => {
			courseSchema
				.validate(this.state.courseForm, { abortEarly: false })
				.then(() => {
					this.setState({
						errors: {}
					})
				})
				.catch(yupError => {
					let errors = yupToObject(yupError)
					console.log(errors)
					if (field) {
						errors = {
							...this.state.errors,
							[field]: errors[field]
						}
					}
					this.setState({
						errors,
					})
				})
		}

		processCourseFormData = () => {
			return new Promise((resolve, reject) => {
				courseSchema
					.validate(this.state.courseForm, { abortEarly: false })
					.then(() => {
						const courseForm = convertToFormData(
							this.state.courseForm,
							['bannerImageBase64']
						)
						if (!this.state.courseForm.bannerImage) {
							courseForm.append('deleteBannerImage', 1)
						}
						return resolve(courseForm)
					})
					.catch(yupError => {
						this.setState({
							errors: yupToObject(yupError)
						})
						return reject(yupError)
					})
			})
		}

		saveDraft = () => {
			const {
				saveCourse,
				createCourse
			} = this.props
			const action = this.state.courseForm.id ? saveCourse : createCourse
			this.processCourseFormData().then((courseForm) => {
				courseForm.append('isPublished', 0)
				this.setState({
					isSaving: true
				})
				action(courseForm)
					.then((res) => {
						notifier.success('The course hase been saved!')
						const savedData = res.data.data
						this.setState({
							courseForm: {
								...this.state.courseForm,
								id: savedData.id,
								enrollUrl: savedData.enrollUrl
								// title: savedData.title,
								// coursePath: savedData.coursePath,
								// coursePathPosition: savedData.coursePathPosition,
								// bannerImage: savedData.bannerImage,
								// description: savedData.description,
								// duration: savedData.duration,
								// price: savedData.price,
								// // category: savedData.category.name,
								// certificationBy: savedData.certificationBy.value,
								// institution: savedData.institution,
								// modules: savedData.modules,
								// faqs: savedData.faqs
							}
						})
					})
					.catch(() => {
						notifier.error('ERROR! The course could not be saved!')
					})
					.finally(() => {
						this.setState({
							isSaving: false
						})
					})
			})
		};

		publish = () => {
			const {
				saveCourse,
				createCourse
			} = this.props
			this.processCourseFormData().then((courseForm) => {
				courseForm.append('isPublished', 1)
				this.setState({
					isPublishing: true
				})
				const action = courseForm.get('id') ? saveCourse : createCourse
				action(courseForm)
					.then((res) => {
						console.log(notifier.success)
						notifier.success('The Course has been published!')
						if (!courseForm.get('id')) {
							this.setState({
								courseForm: resetCourseForm(),
								currentTab: 0
							})
						} else {
							const savedData = res.data.data;
							this.setState({
								isPublishing: false,
								courseForm: {
									...this.state.courseForm,
									id: savedData.id,
									enrollUrl: savedData.enrollUrl,
									// title: savedData.title,
									// coursePath: savedData.coursePath,
									// coursePathPosition: savedData.coursePathPosition,
									// bannerImage: savedData.bannerImage,
									// description: savedData.description,
									// duration: savedData.duration,
									// price: savedData.price,
									category: (savedData.category || {}).name,
									// certificationBy: savedData.certificationBy.value,
									// institution: savedData.institution,
									// modules: savedData.modules,
									// faqs: savedData.faqs
								}
							})
						}
					})
					.catch((err) => {
						console.log(err)
						if (this._isMounted) {
							this.setState({
								isPublishing: false
							})
						}
						notifier.error('ERROR! The course could not be published')
					})
					.finally(() => {
						
					})
			})
		}

		componentDidMount () {
			this._isMounted = true;
		}

		componentDidUpdate () {
			if (!this.moduleWrapperScrollContainer) {
				this.moduleWrapperScrollContainer = document.getElementById(
					'moduleWrapperScrollContainer'
				)
			}
			if (!this.faqsWrapperScrollContainer) {
				this.faqsWrapperScrollContainer = document.getElementById(
					'faqsWrapperScrollContainer'
				)
			}
		}

		componentWillUnmount () {
			this._isMounted = false;
		}

		render () {
			return (
				<Page
					{...this.props}
					addFaq={this.addFaq}
					setForm={this.setForm}
					publish={this.publish}
					nextStep={this.nextStep}
					validate={this.validate}
					prevStep={this.prevStep}
					addModule={this.addModule}
					errors={this.state.errors}
					saveDraft={this.saveDraft}
					isSaving={this.state.isSaving}
					currentTab={this.state.currentTab}
					courseForm={this.state.courseForm}
					initCourseForm={this.initCourseForm}
					isPublishing={this.state.isPublishing}
					processCourseFormData={this.processCourseFormData}
				/>
			)
		}
	}

	withCourseForm.backText = Page.backText

	return withCourseForm
}
