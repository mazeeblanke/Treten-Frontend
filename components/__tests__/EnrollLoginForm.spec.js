import { mount } from 'enzyme'
import notifier from 'simple-react-notifications'
import EnrollLoginForm from '../../components/auth/EnrollLoginForm'

jest.mock('simple-react-notifications')

describe('EnrollLoginForm', () => {
	it ('renders the form correctly', () => {
		const wrapper = mount(
			<EnrollLoginForm 
				proceed={() => {}}
				login={() => {}}
			/>
	  )
		expect(wrapper.find('Button').text()).toEqual(
			'Proceed'
		);
	});

	it ('shows validation errors', () => {
		const wrapper = mount(
			<EnrollLoginForm 
				proceed={jest.fn}
				login={jest.fn}
			/>
		)
		wrapper.find('Form').simulate('submit')
		expect(wrapper.find('.ant-form-explain').length).toEqual(2);
		let err = wrapper.find('.ant-form-explain');
		expect(err.at(0).text()).toEqual('Please input your email!')
		expect(err.at(1).text()).toEqual('Please input your Password!')
	});

	it ('logins in a user with no errors', async () => {
		const login = jest.fn(() => Promise.resolve({
			message: 'Successfully logged in'
		}))
		const proceed = jest.fn()
		const payload = {
				email: 'ewomaukah@yahoo.com',
				password: 'solomon1'
		}
		const wrapper = mount(
			<EnrollLoginForm 
				proceed={proceed}
				login={login}
			/>
		)
		wrapper.find('input[type="email"]').simulate('change', {
			target: {
				value: payload.email
			}
		})
		wrapper.find('input[type="password"]').simulate('change', {
			target: {
				value: payload.password
			}
		})
		await wrapper.find('Form').simulate('submit')
		expect(wrapper.find('.ant-form-explain').length).toEqual(0);
		expect(login).toBeCalledWith(payload)
		expect(proceed).toBeCalled()
		expect(notifier.success).toBeCalledWith('Successfully logged in')
	});

	it ('gracefully handles login errors', async () => {
		const emailError = "This email is already taken"
		const passwordError = "This password is incorrect"
		const proceed = jest.fn()
		const login = jest.fn(() => Promise.reject({
			response: {
				data: {
					errors: {
						email: [emailError],
						password: [passwordError],
					}
				}
			}
		}))
		const wrapper = mount(
			<EnrollLoginForm 
				proceed={proceed}
				login={login}
			/>
		)
    wrapper.find('input[type="email"]').simulate('change', {
			target: {
				value: 'ewomaukah@yahoo.com'
			}
		})
		wrapper.find('input[type="password"]').simulate('change', {
			target: {
				value: 'password'
			}
		})
		await wrapper.find('Form').simulate('submit')
		expect(wrapper.find('EnrollLoginForm').first().state('isLoggingIn')).toEqual(true)
		await wrapper.update()
		expect(proceed).not.toBeCalled()
		expect(login).toBeCalled()
		expect(notifier.error).toBeCalled()
		expect(notifier.error).toBeCalledWith('ERROR! Unable to authenticate!')
		await wrapper.update()
		expect(wrapper.find('.ant-form-explain').length).toEqual(2)
		expect(wrapper.find('.ant-form-explain').at(0).text()).toEqual(emailError)
		expect(wrapper.find('.ant-form-explain').at(1).text()).toEqual(passwordError)
		expect(wrapper.find('EnrollLoginForm').first().state('isLoggingIn')).toEqual(false)
	}) 
});