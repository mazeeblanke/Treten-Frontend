export const fetchListings = ({ page = 1, pageSize = 6, q = '', entity } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_LISTING_LOADING',
    payload: true
  })

  return api.get(`/api/${entity}`, {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    // console.log(res.data)
    dispatch({
      type: 'SET_LISTINGS',
      payload: {
        data: res.data,
        page,
        pageSize,
        endpoints: res.data.endpoints
      }
    })
  })
    .finally(() => {
      dispatch({
        type: 'SET_LISTING_LOADING',
        payload: false
      })
    })
}

export const deleteListing = ({ listing, entity }) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LISTING_STATE',
    payload: {
      listing,
      isEditing: true
    }
  })
  const listings = getState().listings
  return api.delete(`/api/${entity}/${listing.id}`)
    .then(res => {
      dispatch({
        type: 'DELETE_LISTING',
        payload: listing
      })
      return res.data
    })
    .then((res) => {
      return dispatch(fetchListings({
        entity,
        page: listings.pagination.current || 1,
        pageSize: listings.pagination.pageSize || 6
      }))
    })
    .finally(() => {
      dispatch({
        type: 'SET_LISTING_STATE',
        payload: {
          listing,
          isEditing: false
        }
      })
    })
}
