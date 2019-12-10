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
  pagination: paginationOptions(),
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_COURSE_REVIEWS_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'UPDATE_COURSE_REVIEW': {
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

    case 'DELETE_COURSE_REVIEW': {
      const { all, byIds } = state
      delete all[payload.id]
      byIds.splice(byIds.indexOf(payload.id), 1)
      return {
        ...state,
        all,
        byIds
      }
    }

    case 'SET_COURSE_REVIEW_EDITING_STATE': {
      return {
        ...state,
        all: {
          ...state.all,
          [payload.review.id]: {
            ...state.all[payload.review.id],
            isEditing: payload.isEditing
          }
        }
      }
    }

    case 'SET_COURSE_REVIEWS': {
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

export const getCourseReviews = (state) => {
  return state.courseReviews.byIds.map(i => {
    return state.courseReviews.all[i]
  })
}

export const getCourseReviewsPagination = state => state.courseReviews.pagination

export const getCourseReviewsLoadingState = state => state.courseReviews.isLoading

export const reviewIsApproved = review => review.approved === 1
