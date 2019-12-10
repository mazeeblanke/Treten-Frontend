import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  current: options.page || 1,
  pageSize: options.pageSize || 6
})

const INITIAL_STATE = {
  all: {},
  byIds: [],
  isLoading: false,
  pagination: paginationOptions(),
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_COURSE_PATHS_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'SET_COURSE_PATHS': {
      return {
        ...state,
        ...transformArray(payload.data.data),
        pagination: paginationOptions({
          page: payload.page,
          total: payload.data.total,
          pageSize: payload.pageSize,
        })
      }
    }
    default:
      return state
  }
}

export const getCoursePaths = (state) => {
  return state.coursePaths.byIds.map(i => {
    return state.coursePaths.all[i]
  })
}

export const getCoursePathsPagination = state => state.CoursePaths.pagination

export const getCoursePathsLoadingState = state => state.CoursePaths.isLoading
