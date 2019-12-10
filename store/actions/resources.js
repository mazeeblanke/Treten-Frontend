export const setResourcesCategoryId = (payload) => ({
  type: 'SET_RESOURCES_CATEGORY_ID',
  payload
})

export const setResourcesSortDirection = (payload) => ({
  type: 'SET_RESOURCES_SORT_DIRECTION',
  payload
})

export const addResource = (payload) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_ADDING_RESOURCE',
    payload: true
  })
  return api
    .post('/api/resources', payload)
    .then(res => {
      const resources = getState().resources
      const user = getState().user
      // if (
      //   (
      //     getState().resources.sort === 'desc' &&
      //     getState().resources.pagination.current === 1
      //   ) || getState().resources.byIds.length === 0
      // ) {
      //   dispatch({
      //     type: 'SET_RESOURCE',
      //     payload: res.data.data
      //   })
      // }
      dispatch(fetchResources({
        page: resources.pagination.current,
        pageSize: resources.pagination.pageSize,
        authorId: user.id,
        sort: resources.sort,
        categoryId: resources.courseCategoryId
      }))
      return res
    })
    .finally(() => {
      dispatch({
        type: 'SET_ADDING_RESOURCE',
        payload: false
      })
    })
}

export const fetchResources = ({
  page = 1,
  pageSize = 12,
  categoryId = null,
  authorId = null,
  sort = null
} = {}
) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LOADING_RESOURCES',
    payload: true
  })
  return api
    .get('/api/resources', {
      params: {
        page,
        pageSize,
        categoryId,
        authorId,
        sort,
      }
    })
    .then(res => {
      dispatch({
        type: 'SET_RESOURCES',
        payload: {
          data: res.data,
          page,
          pageSize,
          categoryId,
          sort
        }
      })
      return res
    })
    .finally(() => {
      dispatch({
        type: 'SET_LOADING_RESOURCES',
        payload: false
      })
    })
}
