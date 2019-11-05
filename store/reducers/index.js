import { combineReducers } from 'redux';

// IMPORT REDUCERS HERE
import userReducer from '../reducers/user';
import authReducer from '../reducers/auth';
import adminReducer from '../reducers/admin';
import instructorReducer from '../reducers/instructor';
import chatReducer from '../reducers/chat';
import transactionsReducer from '../reducers/transactions';
import blogPostsReducer from '../reducers/blogPosts';
import dashboardReducer from '../reducers/dashboard';

let rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  admin: adminReducer,
  dashboard: dashboardReducer,
  blogPosts: blogPostsReducer,
  instructor: instructorReducer,
  transactions: transactionsReducer,
});

export default rootReducer;
