import { transformArray } from '../../lib/helpers'
import { TRANSACTIONS_PAGE_SIZE } from '../../lib/constants'

const paginationOptions = (options = {}) => ({
  total: options.total || 0,
  current: options.page,
  pageSize: TRANSACTIONS_PAGE_SIZE,
})

const INITIAL_STATE = {
  byIds: [],
  all: {},
  total: 0,
  isLoadingTransactions: false,
  pagination: paginationOptions()
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_TRANSACTIONS': {
      return {
        ...state,
        ...transformArray(action.payload.data.data),
        total: action.payload.total,
        pagination: paginationOptions({
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.data.total
        })
      }
    }
    case 'SET_LOADING_TRANSACTIONS': {
      // console.log('mmsndbndhdh', state);
      return {
        ...state,
        isLoadingTransactions: action.payload
      }
    }
    default:
      return state
  }
}

export const getTransactions = ({ transactions }) =>
  transactions.byIds.map(id => transactions.all[id])
