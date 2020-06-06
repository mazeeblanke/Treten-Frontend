import { combineReducers } from 'redux'

// IMPORT REDUCERS HERE
import userReducer from './user'
import authReducer from './auth'
import formReducer from './form'
import chatReducer from './chat'
import adminReducer from './admin'
import courseReducer from './course'
import coursesReducer from './courses'
import blogPostsReducer from './blogPosts'
import dashboardReducer from './dashboard'
import resourcesReducer from './resources'
import listingReducer from './listing'
import certificationReducer from './certifications'
import instructorReducer from './instructor'
import coursePathsReducer from './coursePaths'
import teamReducer from './team'
import adminCourseReducer from './adminCourses'
import transactionsReducer from './transactions'
import testimonialsReducer from './testimonials'
import searchCourseReducer from './searchCourses'
import courseReviewsReducer from './courseReviews'
import generalCourseReducer from './generalCourses'
import enrolledCourseReducer from './enrolledCourses'
import instructorCourseReducer from './instructorCourses'

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  auth: authReducer,
  chat: chatReducer,
  team: teamReducer,
  admin: adminReducer,
  course: courseReducer,
  courses: coursesReducer,
  dashboard: dashboardReducer,
  listings: listingReducer,
  resources: resourcesReducer,
  blogPosts: blogPostsReducer,
  instructor: instructorReducer,
  adminCourses: adminCourseReducer,
  searchCourses: searchCourseReducer,
  certifications: certificationReducer,
  transactions: transactionsReducer,
  courseReviews: courseReviewsReducer,
  generalCourses: generalCourseReducer,
  enrolledCourses: enrolledCourseReducer,
  testimonials: testimonialsReducer,
  coursePaths: coursePathsReducer,
  instructorCourses: instructorCourseReducer
})

export default rootReducer
