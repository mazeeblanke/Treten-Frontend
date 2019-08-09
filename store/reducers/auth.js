import { SET_LOGIN_STATE } from '../actions/types';

const INITIAL_STATE = {
  isLoggedIn: null,
}

export default function (state = INITIAL_STATE, { type, payload }) {

  switch (type) {
    case 'SET_AUTH': {
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn
      }
    }
    default:
     return state
  }

}