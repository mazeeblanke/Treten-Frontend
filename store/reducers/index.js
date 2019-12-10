import { combineReducers } from 'redux'

// IMPORT REDUCERS HERE
import userReducer from './user'
import authReducer from './auth'
import adminReducer from './admin'
import instructorReducer from './instructor'
import chatReducer from './chat'
import transactionsReducer from './transactions'
import blogPostsReducer from './blogPosts'
import dashboardReducer from './dashboard'
import adminCourseReducer from './adminCourses'
import generalCourseReducer from './generalCourses'
import instructorCourseReducer from './instructorCourses'
import coursesReducer from './courses'
import searchCourseReducer from './searchCourses'
import courseReducer from './course'
import resourcesReducer from './resources'
import enrolledCourseReducer from './enrolledCourses'
import courseReviewsReducer from './courseReviews'
import coursePathsReducer from './coursePaths'
import testimonialsReducer from './testimonials'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
  admin: adminReducer,
  course: courseReducer,
  courses: coursesReducer,
  dashboard: dashboardReducer,
  resources: resourcesReducer,
  blogPosts: blogPostsReducer,
  instructor: instructorReducer,
  adminCourses: adminCourseReducer,
  searchCourses: searchCourseReducer,
  transactions: transactionsReducer,
  courseReviews: courseReviewsReducer,
  generalCourses: generalCourseReducer,
  enrolledCourses: enrolledCourseReducer,
  testimonials: testimonialsReducer,
  coursePaths: coursePathsReducer,
  instructorCourses: instructorCourseReducer,
})

export default rootReducer
