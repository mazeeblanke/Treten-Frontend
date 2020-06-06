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
    case 'SET_TEAM_LOADING': {
      return {
        ...state,
        isLoading: payload
      }
    }

    case 'SET_TEAM': {
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

export const getTeam = (state) => {
  return state.team.byIds.map(i => {
    return state.team.all[i]
  })
}

export const getTeamPagination = state => state.team.pagination

export const getTeamLoadingState = state => state.team.isLoading
