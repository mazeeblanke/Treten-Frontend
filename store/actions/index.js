
export * from './chat'
export * from './auth'
export * from './form'
export * from './users'
export * from './enroll'
export * from './review'
export * from './courses'
export * from './listing'
export * from './settings'
export * from './resources'
export * from './contactus'
export * from './blogPosts'
export * from './dashboard'
export * from './userGroups'
export * from './instructors'
export * from './coursePaths'
export * from './transactions'
export * from './adminCourses'
export * from './testimonials'
export * from './courseBatches'
export * from './courseCategories'
export * from './certifications'

export const downloadCSV = payload => (
  dispatch,
  getState,
  api
) =>
  api.get(`/api/${payload}/download`).then(res => res.data)
