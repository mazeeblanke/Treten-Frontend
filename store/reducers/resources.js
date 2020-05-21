import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total,
  pageSize: options.pageSize,
  current: options.page
})

const INITIAL_STATE = {
  byIds: [],
  all: {},
  isLoading: false,
  isAdding: false,
  courseCategoryId: null,
  sort: 'desc',
  pagination: paginationOptions({})
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_RESOURCES_SORT_DIRECTION': {
      return {
        ...state,
        sort: payload
      }
    }
    case 'SET_RESOURCES_CATEGORY_ID': {
      return {
        ...state,
        courseCategoryId: payload
      }
    }
    case 'SET_LOADING_RESOURCES': {
      return {
        ...state,
        isLoading: payload
      }
    }
    case 'SET_ADDING_RESOURCE': {
      return {
        ...state,
        isAdding: payload
      }
    }
    case 'SET_RESOURCE': {
      const newState = { ...state }
      newState.byIds = [
        payload.id,
        ...newState.byIds
      ]
      newState.all[payload.id] = payload
      return {
        ...state,
        ...newState
      }
    }
    case 'SET_RESOURCES': {
      return {
        ...state,
        ...transformArray(payload.data.data),
        pagination: paginationOptions({
          page: payload.page,
          pageSize: payload.pageSize,
          total: payload.data.total
        })
      }
    }

    default:
      return state
  }
}

export const getResources = (state) => {
  return state.resources.byIds.map((id) => {
    return state.resources.all[id]
  })
}

export const resourcesIsLoading = (state) => {
  return state.resources.isLoading
}

export const getResourcesPagination = (state) => {
  return state.resources.pagination
}

export const getResourcesSortDirection = (state) => {
  return state.resources.sort
}

export const getResourcesCategoryId = (state) => {
  return state.resources.courseCategoryId
}
