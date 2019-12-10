import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  current: options.page || 1,
  pageSize: options.pageSize || 6
})

const INITIAL_STATE = {
  all: {},
  byIds: [],
  feedback: '',
  isLoading: false,
  pagination: paginationOptions(),
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_TESTIMONIALS_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'SET_TESTIMONIALS': {
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

export const getTestimonials = (state) => {
  return state.testimonials.byIds.map(i => {
    return state.testimonials.all[i]
  })
}

export const getTestimonialsPagination = state => state.Testimonials.pagination

export const getTestimonialsLoadingState = state => state.Testimonials.isLoading
