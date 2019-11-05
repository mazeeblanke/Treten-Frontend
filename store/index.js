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

  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

  if (isServer) {
    // console.log('is the iserver', isServer);
    if (req) {
      // console.log('whejwhewe ehjw ehj ', req.headers);
      // console.log('cookie', req.headers.cookie)
      cookie = req.headers.cookie;
    }

    api = axios.create({
      baseURL: process.env.PROXYURL,
      headers: { cookie: cookie || '', 'X-Requested-With': 'XMLHttpRequest' }
    })
  }

  if (!isServer) {
    
    let token = document.head.querySelector('meta[name="csrf-token"]');

    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
        console.info('Using CSRF token found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
    } else {
        console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
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
