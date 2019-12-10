export const ROUTES = {
  STUDENT_DASHBOARD_RESOURCES: '/d/student/resources',
  STUDENT_DASHBOARD_COURSES: '/d/student/courses',
  STUDENT_DASHBOARD_NOTIFICATIONS: '/d/student/notifications',
  STUDENT_DASHBOARD_MESSAGES: '/d/student/messages',
  STUDENT_DASHBOARD_PROFILEDETAILS: '/d/profile/details',
  STUDENT_DASHBOARD_CHANGEPASSWORD: '/d/profile/change-password',
  INSTRUCTOR_DASHBOARD_HOME: '/d/instructor/home',
  INSTRUCTOR_DASHBOARD_TUTORDETAILS: '/d/profile/tutor-details',
  ADMIN_DASHBOARD_USERS: '/d/admin/manage-users',
  ADMIN_DASHBOARD_TRANSACTIONS: '/d/admin/transactions',
  ADMIN_DASHBOARD_REVIEWS: '/d/admin/manage-reviews',
  ADMIN_DASHBOARD_WEBSITE: '/d/admin/manage-website',
  ADMIN_DASHBOARD_COURSES: '/d/admin/courses',
  ADMIN_DASHBOARD_COURSE: '/d/instructor/course',
  ADMIN_DASHBOARD_HOME: '/d/admin/home'
}

export const BLOGS_PAGE_SIZE = 6
export const CHATS_PAGE_SIZE = 6
export const BROADCASTS_PAGE_SIZE = 6
export const MANAGE_USERS_PAGE_SIZE = 5
export const TRANSACTIONS_PAGE_SIZE = 6

export const ADMIN = 'admin'
export const STUDENT = 'student'
export const INSTRUCTOR = 'instructor'

export const TRANSACTIONS_COLUMNS = [
  {
    title: 'Date',
    dataIndex: 'date',
    width: 120,
    key: 5,
    fixed: 'left'
  },
  {
    title: 'Invoice ID',
    dataIndex: 'transaction_id',
    width: 230,
    key: 1
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 190,
    key: 2
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
    // fixed: 'right',
    key: 3,
    width: 190
  },
  {
    title: 'Description',
    dataIndex: 'description',
    // fixed: 'right',
    key: 7,
    width: 200
  },
  {
    title: 'Status',
    dataIndex: 'status',
    // fixed: 'right',
    key: 7,
    width: 100
  },
  {
    title: 'Amount (N)',
    dataIndex: 'amount',
    // fixed: 'right',
    align: 'right',
    key: 8,
    width: 130
  }
]
