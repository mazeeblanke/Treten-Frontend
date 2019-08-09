import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import axios from 'axios';

// INITAL STATE OF STORE
const INITIAL_STATE = {

}

export function initStore (initialState = INITIAL_STATE, isServer = false, req) {
  let api;
  let cookie;
  if (isServer) {
    console.log('iserver', isServer);
    if (req) {
      console.log('whejwhewe ehjw ehj ', req.headers);
      console.log('cookie', req.headers.cookie)
      cookie = req.headers.cookie;
    }

    api = axios.create({
      baseURL: 'http://127.0.0.1:80',
      headers: { cookie: cookie || '' }
    })
  }

  if (!isServer) {
    api = axios.create({
      baseURL: '/api'
    })
  }

  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(
        reduxThunk.withExtraArgument(api),
        reduxPromise
      )
    )
  )
}


// GETTERS
export const getUser = (state) => {
  return state.user.id;
}
