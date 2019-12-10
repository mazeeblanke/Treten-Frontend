export const setLoginState = payload => ({
  type: 'set_login_state',
  payload
})

export const login = payload => (dispatch, getState, api) => {
  // return axios.get('/api/login')
  return api.post('/api/login', payload).then((res) => {
    dispatch(setLoginState(true))
    dispatch({
      type: 'SET_AUTH',
      payload: {
        isLoggedIn: true,
        user: {
          ...res.data.user
        }
      }
    })
    return res.data
  })
}

export const register = payload => (dispatch, getState, api) => {
  return api.post('/api/register', payload).then((res) => {
    dispatch(setLoginState(true))
    dispatch({
      type: 'SET_AUTH',
      payload: {
        isLoggedIn: true,
        user: {
          ...res.data.user
        }
      }
    })
    return res.data
  })
}
