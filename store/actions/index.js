import * as types from './types'

// ACTION CREATORS GOES HERE../../services/post

export const serverRenderAction = () => {
}

export const setLoginState = (payload) => {
  return {
    type: types.SET_LOGIN_STATE,
    payload
  }
}

export const FETCH_USER = (payload) => {
  return (dispatch, setState, api) => {
    return api.get('/current_user')
      .then((res) => {
        // console.log('api response',res)
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isLoggedIn: true,
            user: res.data
          }
        })
      })
      .catch((err) => {
        // console.log('api err response',err)
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isLoggedIn: false,
            user: {}
          }
        })
      })
  }
}