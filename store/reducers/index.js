import { combineReducers } from 'redux';

// IMPORT REDUCERS HERE
import userReducer from '../reducers/user';
import authReducer from '../reducers/auth';
import instructorReducer from '../reducers/instructor';

let rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  instructor: instructorReducer
});

export default rootReducer;
