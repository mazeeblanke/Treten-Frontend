export const fetchCertifications = ({ page = 1, pageSize = 100, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_CERTIFICATION_LOADING',
    payload: true
  })

  return api.get('/api/certifications', {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    dispatch({
      type: 'SET_CERTIFICATIONS',
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
        type: 'SET_CERTIFICATION_LOADING',
        payload: false
      })
    })
}
