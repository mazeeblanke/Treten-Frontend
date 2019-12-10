// import { fetchCourses } from '../actions/courses'

export const saveCourse = payload => (
  dispatch,
  getState,
  api
) => api.post(`/api/courses/${payload.get('id')}`, payload)
  .then((res) => {
    // console.log(res)
    dispatch({
      type: 'SET_COURSE',
      payload: res.data
    })
    return res
  })

export const createCourse = payload => (
  dispatch,
  getState,
  api
) => api.post('/api/course', payload)
