export const fetchTeam = ({ page = 1, pageSize = 100, q = '' } = {}) => (
    dispatch,
    setState,
    api
  ) => {
    dispatch({
      type: 'SET_TEAM_LOADING',
      payload: true
    })
  
    return api.get('/api/team', {
      params: {
        page,
        pageSize,
        q
      }
    }).then(res => {
      dispatch({
        type: 'SET_TEAM',
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
          type: 'SET_TEAM_LOADING',
          payload: false
        })
      })
  }
  