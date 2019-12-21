import { transformArray } from '../../lib/helpers'

const paginationOptions = (options = {}) => ({
  total: options.total,
  pageSize: options.pageSize,
  current: options.page
})

const INITIAL_STATE = {
  activeTab: 'all',
  all: {
    byIds: [],
    all: {},
    total: 0,
    isLoading: false,
    feedback: '',
    sort: 'desc',
    pagination: paginationOptions({})
  },
  professional: {
    byIds: [],
    all: {},
    total: 0,
    isLoading: false,
    feedback: '',
    sort: 'desc',
    pagination: paginationOptions({})
  },
  expert: {
    byIds: [],
    all: {},
    total: 0,
    feedback: '',
    isLoading: false,
    sort: 'desc',
    pagination: paginationOptions({})
  },
  associate: {
    byIds: [],
    all: {},
    total: 0,
    feedback: '',
    sort: 'desc',
    isLoading: false,
    pagination: paginationOptions({})
  }
}

export default function (state = INITIAL_STATE, { type, payload }) {
  const category = payload && payload.category && payload.category.toUpperCase()
  switch (type) {
    case `SET_ADMIN_LOADING_${category}_COURSES`: {
      // const newState = { ...state }
      // newState[payload.category].isLoading = payload.isLoading
      return {
        ...state,
        [payload.category]: {
          ...state[payload.category],
          isLoading: payload.isLoading
        }
      }
    }

    case 'SET_ACTIVE_TAB_ADMIN_COURSES': {
      return {
        ...state,
        activeTab: payload
      }
    }

    case `SET_${category}_SORT_ADMIN_COURSES`: {
      return {
        ...state,
        [payload.category]: {
          ...state[payload.category],
          sort: payload.sort
        }
      }
    }

    case `SET_ADMIN_${category}_COURSES`: {
      const newState = { ...state }
      newState[payload.category] = {
        ...newState[payload.category],
        ...transformArray(payload.data.data),
        total: payload.data.total,
        // sort: payload.sort,
        pagination: paginationOptions({
          page: payload.page,
          pageSize: payload.pageSize,
          total: payload.data.total
        })
      }

      return newState
    }

    default:
      return state
  }
}

export const getAllAdminCourses = state => {
  const { all } = state.adminCourses
  return all.byIds.map(id => all.all[id])
}

export const getAssociateAdminCourses = state => {
  const { associate } = state.adminCourses
  return associate.byIds.map(id => associate.all[id])
}

export const getProfessionalAdminCourses = state => {
  const { professional } = state.adminCourses
  return professional.byIds.map(id => professional.all[id])
}

export const getExpertAdminCourses = state => {
  const { expert } = state.adminCourses
  return expert.byIds.map(id => expert.all[id])
}

export const getAdminCoursesSortDirection = (state, tab) => {
  return state.adminCourses[tab].sort
}
