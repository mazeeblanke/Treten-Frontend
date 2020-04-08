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
    case 'SET_CERTIFICATION_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'SET_CERTIFICATIONS': {
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

export const getCertifications = (state) => {
  return state.certifications.byIds.map(i => {
    return state.certifications.all[i]
  })
}

export const getCertificationsPagination = state => state.certifications.pagination

export const getCertificationsLoadingState = state => state.certifications.isLoading


