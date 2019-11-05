import { MANAGE_USERS_PAGE_SIZE } from '../../lib/constants'


export const fetchInstructors = ({page = 1, pageSize = MANAGE_USERS_PAGE_SIZE, q = ''} = {}) => {
  return (dispatch, setState, api) => {

    dispatch({
      type: 'SET_INSTUCTORS_LOADING',
      payload: true
    })

    return api.get(`/api/instructors?page=${page}&pageSize=${pageSize}&q=${q}`, )
      .then((res) => {
        dispatch({
          type: 'SET_INSTUCTORS_LOADING',
          payload: false
        })

        dispatch({
          type: 'SET_INSTRUCTORS',
          payload: {
            data: res.data,
            page,
            pageSize
          }
        })
      })
  }
}

export const fetchInstructor = (instructor_slug) => {
  return (dispatch, setState, api) => {

    dispatch({
      type: 'SET_INSTRUCTOR_LOADING',
      payload: true
    })

    return api.get(`/api/instructor/${instructor_slug}`, )
      .then((res) => {
        dispatch({
          type: 'SET_INSTRUCTOR_LOADING',
          payload: false
        })

        dispatch({
          type: 'SET_INSTRUCTOR',
          payload: {
            data: res.data.instructor,
          }
        })
      })
  }
}

export const updateInstructor = (instructor_id, payload) => {
  return (dispatch, setState, api) => {
    return api.post(`/api/instructor/${instructor_id}`, payload)
  }
}


export const setInstructorRegistrationRequest = (payload) => {
  return {
    type: 'REGISTRATION_REQUEST',
    payload
  }
}