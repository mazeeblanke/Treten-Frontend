export const setCourse = res => ({
  type: 'SET_COURSE',
  payload: res.data
})

export const saveCourse = payload => (
  dispatch,
  getState,
  api
) => api.post(`/api/courses/${payload.get('id')}`, payload)
  .then((res) => {
    dispatch(setCourse(res))
    return res
  })

export const createCourse = payload => (
  dispatch,
  getState,
  api
) => api.post('/api/course', payload)
