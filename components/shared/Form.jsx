import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { Input, Button, Icon, Form, Checkbox } from 'antd'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import notifier from 'simple-react-notifier'
import { 
	getForm, 
	getModel, 
	getMatrix, 
	getEndpoints, 
	getImagePreviewKey, 
} from '../../store/reducers/form'
import * as actions from '../../store/actions'
import Display from './Display'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

import Router from 'next/router'


class TretenForm extends Component {
  state = {
		notFound: false
	}

	handleRouteChange = url => {
		console.log(url.includes('/create'), url)
		if (url.includes('/create')) {
			this.props.clearForm()
		}
	}
	

	componentWillMount () {
		Router.events.on('routeChangeStart', this.handleRouteChange)
		this.props.resetForm()
	}

	componentWillUnmount () {
		Router.events.off('routeChangeStart', this.handleRouteChange)
	}

	componentDidMount () {
		const { 
			id,
			entity, 
			model, 
			endpoints, 
			initializeForm 
		} = this.props
		initializeForm({ entity, id }).then((res) => {
			this.endpoint = res.data.model.id 
				? res.data.endpoints.updateUrl
				: res.data.endpoints.createUrl
		})
		.catch((err) => {
			if (err.response.status = 404) {
				this.setState({
					notFound: true
				})
			}
		})
	}

	removeBannerImage = (formField) => {
		const {
			setFormField
		} = this.props
		setFormField({
			formField,
			formValue: ''
		})
		setFormField({
			formField: getImagePreviewKey(formField),
			formValue: ''
		})
	}

	handleBannerImageChange = (e, formField) => {
		const {
			setFormField
		} = this.props
    const file = e[0]
    if (file) {
      setFormField({
				formField,
				formValue: file
			})
      const fileReader = new FileReader()
      fileReader.onloadend = () => {
				setFormField({
					formField: getImagePreviewKey(formField),
					formValue: fileReader.result
				})
      }
      fileReader.readAsDataURL(file)
    }
  }

	handleSubmit = (e) => {
		const {
			data,
			submitForm
		} = this.props
		e.preventDefault();
		submitForm({
			endpoint: this.endpoint,
			data
		}).then((res) => {
			notifier.success(res.message || 'Success')
		}).catch((err) => {
			// console.log(err)
			err.response && notifier.error(err.response.data.message)
		})
	}

	render() {
		const {
			matrix,
			data,
			errors,
			loading,
			submitting,
			setFormField
		} = this.props
		const {
			notFound
		} = this.state
		return (
			<div className="row pl-6 pr-6 mt-5">
				<Display if={loading}>
					<div className="has-full-width">
						<div className="col-md-6 col-sm-12 col-lg-6">
							<Icon style={{ fontSize: 40 }} type="loading" />
						</div>
					</div>
				</Display>
				<Display if={notFound}>
					<div className="has-full-width">
						<div className="col-md-6 col-sm-12 col-lg-6">
							<p>Item not found</p>
						</div>
					</div>
				</Display>
				{
					!loading && !notFound && (
						<form className="has-full-width" action={this.endpoint} method="post" onSubmit={this.handleSubmit}>
							{
								Object.keys(matrix).map((key) => {
									if (matrix[key].type === 'text') {
										return (
											<div key={key} className="col-md-6 col-sm-12 col-lg-6 mb-5">
												<Form.Item className={errors[key] && 'has-error'}>
													<label htmlFor={key} className="mb-3">
														<b className="text-capitalize">{key}</b>
													</label>
													<Input
														value={data[key]}
														className="mt-3 is-transparent-bg"
														allowClear
														size="large"
														type="text"
														name={key}
														placeholder={matrix[key].placeholder}
														onChange={(e) => setFormField({
															formField: e.target.name,
															formValue: e.target.value
														})}
													/>
													{errors[key] && (
														<div className="ant-form-explain">
															{errors[key][0]}
														</div>
													)}
												</Form.Item>	
											</div>
										)
									}
									if (matrix[key].type === 'number') {
										return <div key={key} className="col-md-6 col-sm-12 col-lg-6 mb-5">
											<Form.Item className={errors[key] && 'has-error'}>
												<label htmlFor={key} className="mb-3">
													<b className="text-capitalize">{key}</b>
												</label>
												<Input
													value={data[key]}
													className="mt-3 is-transparent-bg"
													allowClear
													size="large"
													type="number"
													name={key}
													min={0}
													placeholder={matrix[key].placeholder}
													onChange={(e) => setFormField({
														formField: e.target.name,
														formValue: e.target.value
													})}
												/>
												{errors[key] && (
													<div className="ant-form-explain">
														{errors[key][0]}
													</div>
												)}
											</Form.Item>	
										</div>
									}
									if (matrix[key].type === 'checkbox') {
										return <div key={key} className="col-md-6 col-sm-12 col-lg-6 mb-5">
											<Form.Item className={errors[key] && 'has-error'}>
												<label htmlFor={key} className="mb-3">
													<b className="text-capitalize">{key}</b>
												</label>
												<Checkbox 
												  checked={!!data[key]}
													onChange={(e) => setFormField({
														formField: key,
														formValue: e.target.checked
													})}
												>{key}</Checkbox>
												{errors[key] && (
													<div className="ant-form-explain">
														{errors[key][0]}
													</div>
												)}
											</Form.Item>	
										</div>
									}
									if (matrix[key].type === 'textarea') {
										return <div key={key} className="col-md-6 col-sm-12 col-lg-6 mb-5">
											<Form.Item className={errors[key] && 'has-error'}>
												<label htmlFor={key} className="mb-3">
													<b className="text-capitalize">{key}</b>
												</label>
												<ReactQuill
													className="mt-3"
													placeholder={matrix[key].placeholder}
													value={data[key]}
													onChange={(e) => setFormField({
														formField: key,
														formValue: e
													})}
													height={400}
												/>
												{errors[key] && (
													<div className="ant-form-explain">
														{errors[key][0]}
													</div>
												)}
											</Form.Item>	
										</div>
									}
									if (matrix[key].type === 'image') {
										return <div key={key} className="col-md-6 col-sm-12 col-lg-6 mb-5">
											<Form.Item className={errors[key] && 'has-error'}>
												<label htmlFor={key} className="pb-3">
													<b className="text-capitalize">{key}</b>
												</label>
												{
													!data[key]
														? (
															<Dropzone onDropAccepted={(e) => this.handleBannerImageChange(e, key)}>
																{({ getRootProps, getInputProps }) => (
																	<div {...getRootProps({ className: 'dropzone' })}>
																		<input {...getInputProps()} />
																		<img className="mt-4" src="/static/images/cloud.png" />
																		<p
																			className="mt-2 p-2 text-center"
																			style={{ fontSize: '1rem' }}
																		>
																			Click to upload file or drag in from computer
																		</p>
																	</div>
																)}
															</Dropzone>
														)
														: (
															<div className="">
																<div className="d-flex align-items-center">
																	<img
																		style={{ maxHeight: '90px', maxWidth: '100%'  }}
																		className="mr-3"
																		src={data[getImagePreviewKey(key)] || data[key]}
																	/>
																</div>
																
																<small
																	onClick={() => this.removeBannerImage(key)}
																	style={{ color: '#e12828' }}
																>
																	remove file
																</small>
															</div>
														)
												}
												{errors[key] && (
													<div className="ant-form-explain">
														{errors[key][0]}
													</div>
												)}
											</Form.Item>
										</div>
									}
								})
							}
							<div className="col-md-6 col-sm-12 col-lg-6 mb-5">
								<Button
									disabled={submitting}
									loading={submitting}
									htmlType="submit"
									size="large"
									type="danger"
								>
									Submit Form
								</Button>
							</div>
						</form>
					)
				}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		matrix: getMatrix(state),
		data: getForm(state),
		endpoints: state.form.endpoints,
		model: getModel(state),
		submitting: state.form.submitting,
		loading: state.form.loading,
		errors: state.form.errors
	}
}

Form.propTypes = {
	setFormField: PropTypes.func,
	initializeForm: PropTypes.func,
	getField: PropTypes.func,
	clearForm: PropTypes.func,
	resetForm: PropTypes.func,
}

export default connect(mapStateToProps, {
	setFormField: actions.setFormField,
	clearForm: actions.clearForm,
	submitForm: actions.submitForm,
	resetForm: actions.resetForm,
	initializeForm: actions.initializeForm
})(TretenForm);

