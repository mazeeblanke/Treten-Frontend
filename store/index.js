import { composeWithDevTools } from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import { createStore, applyMiddleware } from 'redux'
import axios from 'axios'
import rootReducer from './reducers'

// INITAL STATE OF STORE
const INITIAL_STATE = {}

export function initStore (initialState = INITIAL_STATE, isServer = false, req) {
  let api
  let cookie

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

  if (isServer) {
    if (req) {
      cookie = req.headers.cookie
    }

    api = axios.create({
      baseURL: process.env.PROXYURL,
      headers: { cookie: cookie || '', 'X-Requested-With': 'XMLHttpRequest' }
    })
  }

  if (!isServer) {
    const token = document.head.querySelector('meta[name="csrf-token"]')

    if (token) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
    }

    api = axios.create({
      baseURL: '/t',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk.withExtraArgument(api), reduxPromise))
  )
}

// GETTERS
export const getUser = state => state.user.id
