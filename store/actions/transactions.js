import { TRANSACTIONS_PAGE_SIZE } from '../../lib/constants'

export const fetchTransactions = ({ page = 1, pageSize = TRANSACTIONS_PAGE_SIZE, q = '' } = {}) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_LOADING_TRANSACTIONS',
    payload: true
  })

  return api
    .get(`/api/transactions?page=${page}&pageSize=${pageSize}&q=${q}`)
    .then(res => {
      dispatch({
        type: 'SET_TRANSACTIONS',
        payload: {
          data: res.data,
          page,
          pageSize
        }
      })

      dispatch({
        type: 'SET_LOADING_TRANSACTIONS',
        payload: false
      })
    })
    .catch(() => {
      dispatch({
        type: 'SET_LOADING_TRANSACTIONS',
        payload: false
      })
    })
}

export const fetchTransaction = () => ({})
