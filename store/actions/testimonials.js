export const fetchTestimonials = ({ page = 1, pageSize = 6, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_TESTIMONIALS_LOADING',
    payload: true
  })

  return api.get('/api/testimonials', {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    dispatch({
      type: 'SET_TESTIMONIALS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
  })
    .finally(() => {
      dispatch({
        type: 'SET_TESTIMONIALS_LOADING',
        payload: false
      })
    })
}
