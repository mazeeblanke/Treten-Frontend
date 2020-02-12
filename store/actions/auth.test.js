import {
  login,
  register,
  setAuthUser,
  setLoginState
} from './auth'
import { user } from '../../lib/mocks/user'
import { axiosMock, mockStore } from '../../lib/mocks/configure'

axiosMock.onPost('/api/login').reply(200, { user })
axiosMock.onPost('/api/register').reply(200, { user })

describe('Should create action for `auth` state', () => {
  let store

  beforeEach(() => {
    store = mockStore({})
  })

  describe('on login', () => {
    it('Creates action to set `login` state on success', () => {
      return store.dispatch(login())
        .then((res) => {
          const actions = store.getActions()
          expect(actions[0]).toEqual(setLoginState(true))
        })
    })

    it('Creates action to set the loggedin user state on success', () => {
      return store.dispatch(login())
        .then((res) => {
          const actions = store.getActions()
          expect(actions[1]).toEqual(setAuthUser({ data: res }))
        })
    })
    // it ('creates action to set `login` state on failure', () => {

    // })
  })

  describe('On register', () => {
    it('Creates action to set `register` state on success', () => {
      return store.dispatch(register())
        .then((res) => {
          const actions = store.getActions()
          expect(actions[0]).toEqual(setLoginState(true))
        })
    })

    it('Creates action to set the registered user state on success', () => {
      return store.dispatch(register())
        .then((res) => {
          const actions = store.getActions()
          expect(actions[1]).toEqual(setAuthUser({ data: res }))
        })
    })
    // it ('creates action to set `login` state on failure', () => {

    // })
  })
})
