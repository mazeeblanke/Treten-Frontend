import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import axios from 'axios';
// import { PROXYURL } from '../lib/helpers';

// INITAL STATE OF STORE
const INITIAL_STATE = {

}

export function initStore (initialState = INITIAL_STATE, isServer = false, req) {
  let api;
  let cookie;
  if (isServer) {
    console.log('is the iserver', isServer);
    if (req) {
      // console.log('whejwhewe ehjw ehj ', req.headers);
      // console.log('cookie', req.headers.cookie)
      cookie = req.headers.cookie;
    }

    api = axios.create({
      baseURL: process.env.PROXYURL,
      headers: { cookie: cookie || '' }
    })
  }

  if (!isServer) {
    console.log('not server');
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
