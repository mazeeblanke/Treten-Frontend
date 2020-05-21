export const fetchUserGroups = ({ page = 1, pageSize = 5, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  // dispatch({
  //   type: 'SET_ADMINS_LOADING',
  //   payload: true
  // })

  return api.get('/api/user-groups', {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    // dispatch({
    //   type: 'SET_ADMINS',
    //   payload: {
    //     data: res.data,
    //     page,
    //     pageSize
    //   }
    // })
    return res.data
  })
    .finally(() => {
      // dispatch({
      //   type: 'SET_ADMINS_LOADING',
      //   payload: false
      // })
    })
}
