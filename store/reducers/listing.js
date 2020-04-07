import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  current: options.page || 1,
  pageSize: options.pageSize || 6,
  itemRender: (current, type, originalElement) =>
    originalElement
})

const INITIAL_STATE = {
  all: {},
  byIds: [],
  feedback: '',
  isLoading: false,
  endpoints: {},
  pagination: paginationOptions()
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_LISTING_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'UPDATE_LISTING': {
      return {
        ...state,
        all: {
          ...state.all,
          [payload.id]: {
            ...state.all[payload.id],
            ...payload
          }
        }
      }
    }

    case 'DELETE_LISTING': {
      const { all, byIds } = { ...state }
      delete all[payload.id]
      byIds.splice(byIds.indexOf(payload.id), 1)
      return {
        ...state,
        all,
        byIds
      }
    }

    case 'SET_LISTING_STATE': {
      return {
        ...state,
        all: {
          ...state.all,
          [payload.listing.id]: {
            ...state.all[payload.listing.id],
            isEditing: payload.isEditing
          }
        }
      }
    }

    case 'SET_LISTINGS': {
      return {
        ...state,
        ...transformArray(payload.data.data),
        // endpoints: payload.endpoints,
        pagination: paginationOptions({
          page: payload.page,
          total: payload.data.total,
          pageSize: payload.pageSize
        })
      }
    }
    default:
      return state
  }
}

export const getListings = (state) => {
  return state.listings.byIds.map(i => {
    return state.listings.all[i]
  })
}

export const getListingsPagination = state => state.listings.pagination

export const getListingsLoadingState = state => state.listings.isLoading

export const getListingEndpoints = state => state.listings.endpoints

