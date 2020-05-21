// 'api/course-batches'

export const setBatchExpandedState = (batch, expanded) => (dispatch) => {
  dispatch({
    type: 'SET_BATCH_EXPANDED_STATE',
    payload: {
      batchId: batch.id,
      expanded
    }
  })
}

export const addCourseBatch = (payload) => (
  dispatch,
  getState,
  api
) => {
  return api.post('api/course-batches', payload)
    .then((res) => {
      dispatch({
        type: 'ADD_BATCH',
        payload: res.data.data
      })
      dispatch(setBatchExpandedState(res.data.data, true))
      return res.data
    })
}

export const editCourseBatch = (payload) => (
  dispatch,
  getState,
  api
) => {
  return api.patch(`api/course-batches/${payload.id}`, payload)
    .then((res) => {
      dispatch({
        type: 'EDIT_BATCH',
        payload: res.data.data
      })
      return res.data
    })
}

export const deleteBatch = (payload) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'EDIT_BATCH',
    payload: {
      ...payload,
      isDeleting: true
    }
  })
  return api.delete(`api/course-batches/${payload.id}`)
    .then((res) => {
      dispatch({
        type: 'DELETE_BATCH',
        payload
      })
      return res.data
    })
    .catch(() => {
      dispatch({
        type: 'EDIT_BATCH',
        payload: {
          ...payload,
          isDeleting: false
        }
      })
    })
}

export const deleteSchedule = (payload) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'EDIT_BATCH',
    payload: {
      ...payload,
      isDeleting: true
    }
  })
  return api.delete(`api/delete-schedule/${payload.courseBatchAuthorId}`)
    .then((res) => {
      dispatch({
        type: 'DELETE_BATCH',
        payload
      })
      return res.data
    })
    .catch(() => {
      dispatch({
        type: 'EDIT_BATCH',
        payload: {
          ...payload,
          isDeleting: false
        }
      })
    })
}
