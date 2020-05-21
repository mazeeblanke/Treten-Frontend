import { form } from '../../lib/mocks/form'
import { convertToFormData } from '../../lib/helpers'

export const setFormModel = model => ({
	type: 'SET_MODEL',
	payload: model
})

export const resetForm = () => ({
	type: 'RESET'
})

export const clearForm = () => ({
	type: 'CLEAR_FORM'
})

export const setFormField = ({
	formField,
	formValue
}) => {
	return ({
		type: 'SET_FIELD',
		payload: {
			formField,
			formValue
		}
	})
}

export const initializeForm = ({ entity = 'blog-posts', id = null } = {}) => (
	dispatch,
	setState,
	api
) => {
	dispatch({
		type: 'SET_INITIALIZING_FORM',
		payload: true
	})

	return api.get(`/api/${entity}/form-fields${id ? '/' + id : ''}`)
		.then(res => {
			dispatch({
				type: 'INIT_FORM',
				payload: {
					data: res.data
				}
			})
			return res
		})
		.finally(res => {
			dispatch({
				type: 'SET_INITIALIZING_FORM',
				payload: false
			})
		})
}

export const submitForm = ({ endpoint, data } = {}) => (
	dispatch,
	getState,
	api
) => {
	dispatch({
		type: 'SET_SUBMITTING_FORM',
		payload: true
	})

	const isNew = !getState()['form']['model']['id']
	// const method = !isNew ? 'patch' : 'post';

	const keysToIgnore = Object.keys(data).filter(formField => formField.includes('ImageBase64'))

	return api.post(`${endpoint}`, convertToFormData(data, keysToIgnore))
		.then(res => {
			if (isNew) {
				dispatch({
					type: 'CLEAR_FORM'
				})
			} else {
				dispatch({
					type: 'UPDATE_FORM',
					payload: {
						data: res.data
					}
				})
			}

			return res
		})
		.catch((err) => {
			dispatch({
				type: 'SET_FORM_ERRORS',
				payload: {
					data: err.response.data
				}
			})
			// return err
		})
		.finally(res => {
			dispatch({
				type: 'SET_SUBMITTING_FORM',
				payload: false
			})
		})
}