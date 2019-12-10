export const addCourseReview = payload => (dispatch, getState, api) => {
  return api.post('/api/course-reviews', payload)
    .then((res) => {
      updateCourse(dispatch, getState, res)
      return res
    })
}

export const editCourseReview = payload => (dispatch, getState, api) => {
  return api.put(`/api/course-reviews/${payload.id}`, payload)
    .then((res) => {
      updateCourse(dispatch, getState, res)
      return res
    })
}

export const addInstructorReview = payload => (dispatch, getState, api) => {
  return api.post('/api/instructor-reviews', payload)
    .then((res) => {
      updateCourse(dispatch, getState, res)
      return res
    })
}

export const editInstructorReview = payload => (dispatch, getState, api) => {
  return api.put(`/api/instructor-reviews/${payload.id}`, payload)
    .then((res) => {
      updateCourse(dispatch, getState, res)
      return res
    })
}

export const handleApproval = ({ approved, review }) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_COURSE_REVIEW_EDITING_STATE',
    payload: {
      review,
      isEditing: true
    }
  })
  return api.post(`/api/course-review-approval/${review.id}`, { reviewId: review.id, approved })
    .then(res => {
      dispatch({
        type: 'UPDATE_COURSE_REVIEW',
        payload: res.data.data
      })
      return res.data
    })
    .finally(() => {
      dispatch({
        type: 'SET_COURSE_REVIEW_EDITING_STATE',
        payload: {
          review,
          isEditing: false
        }
      })
    })
}

export const deleteReview = (review) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_COURSE_REVIEW_EDITING_STATE',
    payload: {
      review,
      isEditing: true
    }
  })
  return api.delete(`/api/course-reviews/${review.id}`)
    .then(res => {
      dispatch({
        type: 'DELETE_COURSE_REVIEW',
        payload: review
      })
      return res.data
    })
    .finally(() => {
      dispatch({
        type: 'SET_COURSE_REVIEW_EDITING_STATE',
        payload: {
          review,
          isEditing: false
        }
      })
    })
}

export const fetchReviews = ({ page = 1, pageSize = 6, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_COURSE_REVIEWS_LOADING',
    payload: true
  })

  return api.get('/api/course-reviews', {
    params: {
      page,
      pageSize,
      q
    }
  }).then(res => {
    dispatch({
      type: 'SET_COURSE_REVIEWS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
  })
    .finally(() => {
      dispatch({
        type: 'SET_COURSE_REVIEWS_LOADING',
        payload: false
      })
    })
}

const updateCourse = (dispatch, getState, res) => {
  const course = { ...getState().course }
  const data = res.data.data
  data.authorId
    ? course.instructorReviews[data.authorId] = [data]
    : course.courseReview = data
  delete course.batches
  dispatch({
    type: 'SET_COURSE',
    payload: {
      data: course
    }
  })
}
