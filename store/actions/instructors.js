import { MANAGE_USERS_PAGE_SIZE } from '../../lib/constants'

export const fetchInstructors = ({
  page = 1,
  pageSize = MANAGE_USERS_PAGE_SIZE,
  q = '',
  courseId = null
} = {}) => (
  dispatch,
  setState,
  api
) => {
  !courseId && dispatch({
    type: 'SET_INSTUCTORS_LOADING',
    payload: true
  })

  return api.get('/api/instructors', {
    params: {
      q,
      page,
      pageSize,
      courseId
    }
  }).then(res => {
    !courseId && dispatch({
      type: 'SET_INSTRUCTORS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
    return res.data
  })
    .finally(() => {
      !courseId && dispatch({
        type: 'SET_INSTUCTORS_LOADING',
        payload: false
      })
    })
}

export const fetchInstructor = instructorSlug => (dispatch, setState, api) => {
  dispatch({
    type: 'SET_INSTRUCTOR_LOADING',
    payload: true
  })

  return api.get(`/api/instructor/${instructorSlug}`).then(res => {
    dispatch({
      type: 'SET_INSTRUCTOR_LOADING',
      payload: false
    })

    dispatch({
      type: 'SET_INSTRUCTOR',
      payload: {
        data: res.data
      }
    })
  })
}

export const updateInstructor = (instructorId, payload) => (dispatch, setState, api) =>
  api.post(`/api/instructor/${instructorId}`, payload)

export const setInstructorRegistrationRequest = payload => ({
  type: 'REGISTRATION_REQUEST',
  payload
})
