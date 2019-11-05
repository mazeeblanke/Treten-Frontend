import { transformArray } from "../../lib/helpers";

const INITIAL_STATE = {
  stats: {
    students_count: 0,
    instructors_count: 0,
    courses_count: 0,
    active_classes_count: 0
  },
  newStudents: {
    byIds: [],
    all: {},
    isRefreshingNewStudents: false
  },
  latestEnrollments: {
    byIds: [],
    all: {},
    isLoadingLatestEnrollments: false
  },
};


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
      return {
        ...state,
        stats: {
          ...state.stats,
          ...action.payload.data
        }
      }
    }
  }
  return state;
}


export const getNewStudents = (state) => {
  return state.dashboard.newStudents.byIds.map((id) => {
    return state.dashboard.newStudents.all[id];
  })
}

export const getIsRefreshingNewStudents = (state) => {
  return state.dashboard.newStudents.isRefreshingNewStudents;
}
