import { transformArray } from "../../lib/helpers";

const INITIAL_STATE = {
  successfullyRegistered: false,
  byIds: [],
  all: {},
  isLoading: false,
  activeInstructor: {
    isLoading: false
  }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "REGISTRATION_REQUEST": {
      return {
        ...state,
        successfullyRegistered: action.payload
      };
    }
    case 'SET_INSTUCTORS_LOADING': {
      return {
        ...state,
        isLoading: action.payload
      }
    }
    case 'SET_INSTRUCTOR_LOADING': {
      return {
        ...state,
        activeInstructor: {
          ...state.activeInstructor,
          isLoading: action.payload,
        }
      }
    }
    case 'SET_INSTRUCTORS': {
      return {
        ...state,
        ...transformArray(action.payload.data.data)
      }
    }
    case 'SET_INSTRUCTOR': {
      return {
        ...state,
        activeInstructor: {
          ...state.activeInstructor,
          ...action.payload.data
        }
      }
    }
    default:
      return state;
  }
}


export const getInstructors = (state) => {
  return state.instructor.byIds.map(id => state.instructor.all[id]);
}

export const getInstructor = (state) => {
  return state.instructor.activeInstructor;
}