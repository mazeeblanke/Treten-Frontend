export const fetchDashboardStats = () => (dispatch, getState, api) =>
  api.get('/api/dashboard-stats').then(res => {
    // const role = getState()['user'].role.toUpperCase();
    dispatch({
      type: 'SET_STATS',
      payload: {
        data: res.data
      }
    })
  })

export const refreshNewStudents = ({ page = 1, pageSize = 8 } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_REFRESHING_NEW_STUDENTS',
    payload: true
  })

  dispatch(fetchDashboardStats())

  return api.get(`/api/students?page=${page}&pageSize=${pageSize}`).then(res => {
    dispatch({
      type: 'SET_REFRESHING_NEW_STUDENTS',
      payload: false
    })

    dispatch({
      type: 'SET_NEW_STUDENTS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
  })
}
