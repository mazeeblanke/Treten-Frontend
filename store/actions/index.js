import * as types from './types'

export * from './chat';
export * from './transactions';
export * from './blogPosts';
export * from './dashboard';
export * from './instructors';

export const serverRenderAction = () => {
}

export const setLoginState = (payload) => {
  return {
    type: types.SET_LOGIN_STATE,
    payload
  }
}



export const downloadCSV = (payload) => {
  return (dispatch, getState, api) => {
    return api.get(`/api/${payload}/download`).then((res) => {
      return res.data
    })
  }
}


export const setAddUsersModal = ({ payload, userType }) => {
  return {
    type: 'SET_ADD_USERS_FORM',
    payload: {
      userType,
      isShowingAddNewForm: payload
    }
  }
}

export const updateUserDetails = (userDetails) => {
  return (dispatch, setState, api) => {
    if (userDetails.profile_pic) {
      dispatch({
        type: 'UPDATE_USER_PROFILE_PICS',
        payload: userDetails.imagePreviewUrl
      })
    }
    delete userDetails.imagePreviewUrl
    let userDetailsForm = new FormData();

    for ( let key in userDetails ) {
      userDetailsForm.append(key, userDetails[key]);
    }

    return api.post(`/api/user`, userDetailsForm).then((res) => {
      dispatch({
        type: 'UPDATE_USER',
        payload: res.data
      })
    })
  }
}

export const fetchStudents = ({page = 1, pageSize = 5, q = ''} = {}) => {
  return (dispatch, setState, api) => {

    dispatch({
      type: 'SET_STUDENTS_LOADING',
      payload: true
    })

    return api.get(`/api/students?page=${page}&pageSize=${pageSize}&q=${q}`)
      .then((res) => {
        dispatch({
          type: 'SET_STUDENTS_LOADING',
          payload: false
        })

        dispatch({
          type: 'SET_STUDENTS',
          payload: {
            data: res.data,
            page,
            pageSize
          }
        })
      })
  }
}

export const FETCH_USER = (payload) => {
  return (dispatch, setState, api) => {
    return api.get('/api/current_user')
      .then((res) => {
        // console.log('api response',res)
        dispatch({
          type: 'SET_AUTH',
          payload: {
            isLoggedIn: true,
            user: {
              // role: 'instructor',
              // role: 'admin',
              // role: 'student',
              ...res.data
            }
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