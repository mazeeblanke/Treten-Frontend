import formReducer, { getFormData, INITIAL_STATE } from './form'

describe ('Form', () => {
	describe ('initializes the form data', () => {

		it ('as object having keys with empty string when no model is provided', () => {
			const testData = {
				matrix: {}
			}
			const formData = getFormData(testData)
			expect(Object.keys(formData).every((key) => !formData[key])).toEqual(true)
		})

		it ('throws error when matrix is not provided', () => {
			const testData = {}
			expect(getFormData(testData)).toThrow(Error)
		})

		it ('as object having keys with values when a model is provided', () => {
			const testData = {
				model: {
					id: 1,
					body: 'shdsd',
					title: 'jsdf kdsj fksjf',
					publishedAt: '20-23-1932'
				},
				matrix: {
					body: {
						type: 'textarea'
					},
					title: {
						type: 'text'
					},
					publishedAt: {
						type: 'date'
					}
				}
			}
			const formData = getFormData(testData)
			expect(Object.keys(formData).every((key) => formData[key])).toEqual(true)
		})

	})

	it('sets a form field', () => {
		const initialState = {
			matrix: {title: { type: 'text'}, 'body': { type: 'textarea'}},
			model: {id: 34, title: 'mad', body: 'good'},
			data: {title: 'mad', body: 'good'}
		}
		const formField = 'title'
		const formValue = 'boy is good'
		const action = {
			type: 'SET_FIELD',
			payload: {
				formField,
				formValue
			}
		}
		expect(formReducer(initialState, action)).toEqual({
			...initialState,
			data: {
				...initialState.data,
				title: formValue
			}
		})
	})
	it('intializes the state', () => {
		expect(formReducer(undefined, {})).toEqual(INITIAL_STATE)
	})
})