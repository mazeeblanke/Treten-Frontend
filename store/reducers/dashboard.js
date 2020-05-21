import { transformArray } from '../../lib/helpers'

const INITIAL_STATE = {
  stats: {
    studentsCount: 0,
    instructorsCount: 0,
    coursesCount: 0,
    activeClassesCount: 0
  },
  newStudents: {
    byIds: [],
    all: {},
    isRefreshingNewStudents: false
  },
  latestEnrollments: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_REFRESHING_NEW_STUDENTS': {
      return {
        ...state,
        newStudents: {
          ...state.newStudents,
          isRefreshingNewStudents: action.payload
        }
      }
    }
    case 'SET_NEW_STUDENTS': {
      return {
        ...state,
        newStudents: {
          ...state.newStudents,
          ...transformArray(action.payload.data.data)
        }
      }
    }
    case 'SET_STATS': {
      const {
        coursesCount,
        studentsCount,
        instructorsCount,
        activeClassesCount
      } = action.payload.data
      return {
        ...state,
        stats: {
          ...state.stats,
          coursesCount,
          studentsCount,
          instructorsCount,
          activeClassesCount
        },
        latestEnrollments: action.payload.data.latestEnrollments
      }
    }
    default:
      return state
  }
}

export const getNewStudents = state =>
  state.dashboard.newStudents.byIds.map(id => state.dashboard.newStudents.all[id])

export const getIsRefreshingNewStudents = state =>
  state.dashboard.newStudents.isRefreshingNewStudents
