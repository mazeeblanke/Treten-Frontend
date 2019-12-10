import { transformArray } from '../../lib/helpers'

const initCourse = () => ({
  isLoading: false,
  instructors: [],
  author: {},
  coursePath: {},
  batches: {
    byIds: [],
    all: {}
  },
  category: {}
})

const INITIAL_STATE = initCourse()

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_LOADING_COURSE': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'CLEAR_COURSE': {
      return initCourse()
    }

    case 'ADD_BATCH': {
      let { all, byIds } = { ...state.batches }
      byIds = [
        payload.id,
        ...byIds
      ]
      all = {
        ...all,
        [payload.id]: payload
      }
      return {
        ...state,
        batches: {
          all,
          byIds
        }
      }
    }

    case 'EDIT_BATCH': {
      let { all, byIds } = { ...state.batches }
      all = {
        ...all,
        [payload.id]: payload
      }
      return {
        ...state,
        batches: {
          all,
          byIds
        }
      }
    }

    case 'DELETE_BATCH': {
      const { all, byIds } = { ...state.batches }
      byIds.splice(byIds.indexOf(payload.id), 1)
      delete all[payload.id]
      return {
        ...state,
        batches: {
          all,
          byIds
        }
      }
    }

    case 'SET_BATCH_EXPANDED_STATE': {
      const batches = { ...state.batches }
      batches.all[payload.batchId] = {
        ...batches.all[payload.batchId],
        expanded: payload.expanded
      }
      return {
        ...state,
        batches: {
          ...state.batches,
          batches
        }
      }
    }

    case 'SET_COURSE': {
      // console.log(payload)
      return {
        ...state,
        ...payload.data,
        batches: { ...transformArray(payload.data.batches || []) }
      }
    }

    case 'UPDATE_COURSE': {
      return {
        ...state,
        ...payload.course,
      }
    }

    default:
      return state
  }
}

export const getCourse = (state) => {
  return state.course
}

export const getBatches = (state) => {
  return state.course.batches.byIds.map(id => {
    return state.course.batches.all[id]
  })
}
