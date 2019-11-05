export const refreshNewStudents = ({page = 1, pageSize = 8} = {}) => {
  return (dispatch, setState, api) => {

    dispatch({
      type: 'SET_REFRESHING_NEW_STUDENTS',
      payload: true
    })

    dispatch(fetchDashboardStats());

    return api.get(`/api/students?page=${page}&pageSize=${pageSize}`)
      .then((res) => {
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
}

export const fetchDashboardStats = () => {
  return (dispatch, setState, api) => {
    return api.get(`/api/dashboard-stats`)
      .then((res) => {
        dispatch({
          type: 'SET_STATS',
          payload: {
            data: res.data,
          }
        })
      })
  }
}