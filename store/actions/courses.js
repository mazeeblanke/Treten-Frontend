export const fetchPopularCourses = () => (
  dispatch,
  getState,
  api
) => {
  const popularCourses = getState().courses.popular
  if (popularCourses.byIds.length) return
  dispatch({
    type: 'SET_LOADING_POPULAR_COURSES',
    payload: true
  })
  return api
    .get('/api/popular-courses')
    .then(res => {
      dispatch({
        type: 'SET_POPULAR_COURSES',
        payload: res.data
      })
      dispatch({
        type: 'SET_LOADING_POPULAR_COURSES',
        payload: false
      })
      return res
    })
    .catch(() => {
      dispatch({
        type: 'SET_LOADING_POPULAR_COURSES',
        payload: false
      })
    })
}

export const fetchCourses = ({
  page = 1,
  q = null,
  sort = null,
  pageSize = 8,
  minimal = null,
  category = 'all',
  authorId = null,
  categoryId = null,
  scope = 'admin',
  notAssigned = null,
  hasInstructor = null,
  enrolled = null,
  isPublished = null
} = {}) => (
  dispatch,
  getState,
  api
) => {
  const role = (scope || getState().user.role).toUpperCase()
  const tabDetails = getState()[`${scope}Courses`][category] || {}
  dispatch({
    type: `SET_${role}_LOADING_${category.toUpperCase()}_COURSES`,
    payload: {
      category,
      isLoading: tabDetails.byIds
        ? (!tabDetails.byIds.length || tabDetails.pagination.current !== page || !sort)
        : true
    }
  })
  return api
    .get('/api/courses', {
      params: {
        q,
        page,
        sort,
        minimal,
        pageSize,
        category,
        categoryId,
        notAssigned,
        isPublished,
        enrolled,
        hasInstructor,
        authorId
      }
    })
    .then(res => {
      dispatch({
        type: `SET_${role}_${category.toUpperCase()}_COURSES`,
        payload: {
          sort,
          page,
          pageSize,
          category,
          data: res.data
        }
      })
      dispatch({
        type: `SET_${role}_LOADING_${category.toUpperCase()}_COURSES`,
        payload: {
          category,
          isLoading: false
        }
      })
      return res
    })
    .catch(() => {
      dispatch({
        type: `SET_${role}_LOADING_${category.toUpperCase()}_COURSES`,
        payload: {
          category,
          isLoading: false
        }
      })
    })
}

export const fetchCourse = ({ slug, userId = null, enrolled = null }) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LOADING_COURSE',
    payload: true
  })
  dispatch({
    type: 'CLEAR_COURSE',
    payload: true
  })
  return api
    .get(`/api/courses/${slug}`, {
      params: {
        userId,
        enrolled
      }
    })
    .then((res) => {
      dispatch({
        type: 'SET_COURSE',
        payload: res.data
      })
    })
    .finally(() => {
      dispatch({
        type: 'SET_LOADING_COURSE',
        payload: false
      })
    })
}

export const fetchCoursesByGroup = () => (
  dispatch,
  getState,
  api
) => {
  const coursesByGroup = getState().courses.byGroups
  if (Object.keys(coursesByGroup).length > 0) return
  return api
    .get('/api/courses-by-categories')
    .then((res) => {
      dispatch({
        type: 'SET_COURSES_BY_GROUP',
        payload: res.data
      })
    })
}

export const updateCourse = (payload) => {
  return {
    type: 'UPDATE_COURSE',
    payload: {
      course: payload
    }
  }
}

export const searchCourses = ({
  page = 1,
  sort = null,
  pageSize = 8,
  minimal = null,
  category = 'all',
  notAssigned = null,
  authorId = null,
  q = null
} = {}) => (
  dispatch,
  getState,
  api
) => {
  return api.get('/api/courses', {
    params: {
      q,
      sort,
      page,
      minimal,
      pageSize,
      category,
      notAssigned,
      authorId
    }
  })
}


export const deleteCourse = ({
  id = null
} = {}) => (
  dispatch,
  getState,
  api
) => {
  return api.delete(`/api/courses/${id}`)
}

export const searchCourseBatches = ({
  q = null,
  courseId,
  authorId
} = {}) => (
  dispatch,
  getState,
  api
) => {
  return api.get('/api/course-batches', {
    params: {
      q,
      courseId,
      authorId
    }
  })
}

export const setTabSortDirection = ({ category, sort, scope = 'admin' }) => {
  return (dispatch) => {
    dispatch({
      type: `SET_${category.toUpperCase()}_SORT_${scope.toUpperCase()}_COURSES`,
      payload: { sort, category }
    })
  }
}

export const handleActiveTabChange = ({
  page = 1,
  pageSize = 8,
  tab = 'all',
  sort = null,
  scope = 'admin',
  isPublished = null,
  hasInstructor = null
} = {}
) => (dispatch, getState, api) => {
  // const tabDetails = getState().adminCourses[tab]
  // console.log(tabDetails)
  dispatch({
    type: `SET_ACTIVE_TAB_${scope.toUpperCase()}_COURSES`,
    payload: tab
  })
  // if (getState()['adminCourses']) {

  // }
  // dispatch({
  //   type: `SET_ADMIN_LOADING_${tab.toUpperCase()}_COURSES`,
  //   payload: {
  //     category: tab,
  //     isLoading: false
  //   }
  // })
  if (getState()[`${scope}Courses`]) {
    page = getState()[`${scope}Courses`][tab].pagination.current
  }
  return dispatch(fetchCourses({
    category: tab,
    isPublished,
    hasInstructor,
    scope,
    sort,
    page
  }))
}
