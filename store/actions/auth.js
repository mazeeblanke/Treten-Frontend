const handleAuthenticationSuccess = (res, dispatch) => {
  dispatch(setLoginState(true))
  dispatch(setAuthUser(res))
  return res.data
}

export const setLoginState = payload => ({
  type: 'set_login_state',
  payload
})

export const setAuthUser = (res) => {
  return {
    type: 'SET_AUTH',
    payload: {
      isLoggedIn: true,
      user: {
        ...res.data.user
      }
    }
  }
}

export const login = payload => (dispatch, getState, api) => {
  return api
    .post('/api/login', payload)
    .then((res) => handleAuthenticationSuccess(res, dispatch))
}

export const register = payload => (dispatch, getState, api) => {
  return api
    .post('/api/register', payload)
    .then((res) => handleAuthenticationSuccess(res, dispatch))
}
