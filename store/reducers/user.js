import { ADMIN, STUDENT, INSTRUCTOR } from '../../lib/constants'

const INITIAL_STATE = {}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_AUTH': {
      return {
        ...state,
        ...action.payload.user
      }
    }
    case 'UPDATE_USER_PROFILE_PICS': {
      return {
        ...state,
        profile_pic: action.payload
      }
    }
    case 'UPDATE_USER': {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export const getUserDetails = state => state.user

export const getUserRole = state => state.user.role

export const userIsAdmin = user => user.role === ADMIN

export const userIsStudent = user => user.role === STUDENT

export const userIsInstructor = user => user.role === INSTRUCTOR

export const userIsActive = user => user.status === 'active'
// const details = state.user.userable
// const social_links = details.social_links
// return {
//     ...state.user,
//     userable: {
//         ...details,
//         [social_links]: JSON.parse(social_links),
//     }
// };
