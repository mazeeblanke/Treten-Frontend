import { axiosMock, mockStore } from '../../lib/mocks/configure'
import { form } from '../../lib/mocks/form'
import {
	setFormModel,
	setFormField,
	initializeForm
} from './form'

let store
let entity = 'blogPosts'

axiosMock.onGet(`/api/formFields/${entity}`).reply(200, { ...form })

beforeEach(() => {
	store = mockStore({})
})

describe('should create action for `form` state', () => {
	it ('creates action to set form model', () => {
		const model = { id: 34}
		store.dispatch(setFormModel(model))
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_MODEL',
			payload: model
		})
	})

	it ('creates action to set form field', () => {
		store.dispatch(setFormField({
			formField: 'title',
			formValue: 'mazino day'
		}))
		const actions  = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_FIELD',
			payload: {
				formField: 'title',
				formValue: 'mazino day'
			}
		})
	})

	it ('initializes the form action', () => {
		store.dispatch(initializeForm({ entity: 'blogPosts' }))
			.then((res) => {
				expect(store.getActions()[2]).toEqual({
					type: 'SET_INITIALIZING_FORM',
					payload: false
				})
				expect(store.getActions()[1]).toEqual({
					type: 'INIT_FORM',
					payload: {
						data: form
					}
				})
			})
		expect(store.getActions()[0]).toEqual({
			type: 'SET_INITIALIZING_FORM',
			payload: true
		})	
	})
});
