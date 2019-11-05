export const ROUTES = {
  'STUDENT_DASHBOARD_RESOURCES': '/d/student/resources',
  'STUDENT_DASHBOARD_COURSES': '/d/student/courses',
  'STUDENT_DASHBOARD_NOTIFICATIONS': '/d/student/notifications',
  'STUDENT_DASHBOARD_MESSAGES': '/d/student/messages',
  'STUDENT_DASHBOARD_PROFILEDETAILS': '/d/profile/details',
  'STUDENT_DASHBOARD_CHANGEPASSWORD': '/d/profile/change-password',
  'INSTRUCTOR_DASHBOARD_HOME': '/d/instructor/home',
  'INSTRUCTOR_DASHBOARD_TUTORDETAILS': '/d/profile/tutor-details',
  'ADMIN_DASHBOARD_USERS': '/d/admin/manage-users',
  'ADMIN_DASHBOARD_TRANSACTIONS': '/d/admin/transactions',
  'ADMIN_DASHBOARD_REVIEWS': '/d/admin/manage-reviews',
  'ADMIN_DASHBOARD_WEBSITE': '/d/admin/manage-website',
  'ADMIN_DASHBOARD_COURSES': '/d/admin/courses',
  'ADMIN_DASHBOARD_COURSE': '/d/instructor/course',
  'ADMIN_DASHBOARD_HOME': '/d/admin/home',
}

export const MANAGE_USERS_PAGE_SIZE = 5;
export const TRANSACTIONS_PAGE_SIZE = 6;
export const BLOGS_PAGE_SIZE = 6;
export const CHATS_PAGE_SIZE = 6;
export const BROADCASTS_PAGE_SIZE = 6;

export const TRANSACTIONS_COLUMNS = [
  {
    title: "Date",
    dataIndex: "date",
    width: 120,
    key: 5,
    fixed: 'left',
  },
  {
    title: "Invoice ID",
    dataIndex: "transaction_id",
    width: 180,
    key: 1
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 180,
    key: 2,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    // fixed: 'right',
    key: 3,
    width: 180
  },
  {
    title: "Description",
    dataIndex: "description",
    // fixed: 'right',
    key: 7,
    width: 230
  },
  {
    title: "Amount (N)",
    dataIndex: "amount",
    // fixed: 'right',
    align: 'right',
    key: 8,
    width: 130
  },
];

export const CHATS = [
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor1.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "5 mins",
    id: 1,
    lastMessage: `New updates about the additional materials`
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor2.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "10 mins",
    lastMessage: `How to go about your final project`,
    id: 2
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor3.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "2 hrs",
    lastMessage: `What to do when you run into any issues`,
    id: 3
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor1.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "19 hrs",
    lastMessage: `Information about exams and certificates`,
    id: 4
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor4.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "Yesterday",
    lastMessage: `Updates about additional course content`,
    id: 5
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor2.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "2 days",
    lastMessage: `Where to find more study resources online`,
    id: 6
  },
  {
    sender: {
      profile_pic: "/static/images/instructors/instructor1.png",
      fullname: "Azibanayam Micheal"
    },
    formattedDate: "19 hrs",
    id: 7,
    lastMessage: `Information about exams and certificates`
  }
]
