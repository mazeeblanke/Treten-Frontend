import { transformArray } from '../../lib/helpers'

const INITIAL_STATE = {
  popular: {
    byIds: [],
    all: {},
    isLoading: false
  },
  byGroups: {}
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_LOADING_POPULAR_COURSES': {
      return {
        ...state,
        popular: {
          ...state.popular,
          isLoading: payload
        }
      }
    }

    case 'SET_POPULAR_COURSES': {
      return {
        ...state,
        popular: {
          ...state.popular,
          ...transformArray(payload.data)
        }
      }
    }

    case 'SET_COURSES_BY_GROUP': {
      return {
        ...state,
        byGroups: {
          ...payload.data
        }
      }
    }

    default:
      return state
  }
}

export const getPopularCourses = (state) => {
  return state.courses.popular.byIds.map((id) => {
    return state.courses.popular.all[id]
  })
}
