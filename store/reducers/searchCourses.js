import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total,
  pageSize: options.pageSize,
  current: options.page
})

const INITIAL_STATE = {
  byIds: [],
  all: {},
  total: 0,
  isLoading: false,
  feedback: '',
  sort: 'desc',
  pagination: paginationOptions({})
}

export default function (state = INITIAL_STATE, { type, payload }) {
  const category = payload && payload.category && payload.category.toUpperCase()
  switch (type) {
    case `SET_SEARCH_LOADING_${category}_COURSES`: {
      return {
        ...state,
        isLoading: payload.isLoading
      }
    }

    // case 'SET_ACTIVE_TAB_SEARCH_COURSES': {
    //   return {
    //     ...state,
    //     activeTab: payload
    //   }
    // }

    // case `SET_${category}_SORT_SEARCH_COURSES`: {
    //   return {
    //     ...state,
    //     [payload.category]: {
    //       ...state[payload.category],
    //       sort: payload.sort
    //     }
    //   }
    // }

    case `SET_SEARCH_${category}_COURSES`: {
      let newState = { ...state }
      newState = {
        ...newState,
        ...transformArray(payload.data.data),
        total: payload.data.total,
        pagination: paginationOptions({
          page: payload.page,
          pageSize: payload.pageSize,
          total: payload.data.total,
        })
      }
      return newState
    }
    default:
      return state
  }
}

export const getSearchCourses = state => {
  return state.searchCourses.byIds.map(id => state.searchCourses.all[id])
}

export const getSearchCoursesSortDirection = (state) => {
  return state.searchCourses.sort
}
