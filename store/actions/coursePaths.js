// api/course-paths
export const fetchCoursePaths = ({ page = 1, pageSize = 6, q = null } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_COURSE_PATHS_LOADING',
    payload: true
  })

  return api.get('/api/course-paths', {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    dispatch({
      type: 'SET_COURSE_PATHS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
    return res
  })
    .finally(() => {
      dispatch({
        type: 'SET_COURSE_PATHS_LOADING',
        payload: false
      })
    })
}
