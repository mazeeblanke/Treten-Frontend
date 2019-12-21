import { transformArray } from '../../lib/helpers'
import pluralize from 'pluralize'

const uuidv1 = require('uuid/v1')

const initInstructorForm = () => ({
  batchId: null,
  authorId: null,
  courseId: null,
  isVisible: false,
  isAssigning: false
})

const initInvitationForm = () => ([{
  email: '',
  id: uuidv1()
}])

const paginationOptions = (tab, newState, options = {}) => ({
  current: options.page,
  pageSize: options.pageSize,
  total: newState ? newState.manageUsers[tab].total : 0
})

const INITIAL_STATE = {
  manageUsers: {
    activeTab: 'students',
    students: {
      all: {},
      total: 0,
      byIds: [],
      feedback: '',
      isLoading: false,
      isShowingAddNewForm: false,
      pagination: paginationOptions('students')
    },
    admins: {
      all: {},
      byIds: [],
      feedback: '',
      isLoading: false,
      isInviting: false,
      form: initInvitationForm(),
      isShowingAddNewForm: false,
      pagination: paginationOptions('admin')
    },
    instructors: {
      all: {},
      total: 0,
      byIds: [],
      feedback: '',
      isLoading: false,
      isInviting: false,
      form: initInvitationForm(),
      isShowingAddNewForm: false,
      assignInstructorForm: initInstructorForm(),
      pagination: paginationOptions('instructors')
    }
  }
}

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case 'SET_INSTUCTORS_LOADING': {
      const manageUsers = { ...state.manageUsers }
      manageUsers.instructors.isLoading = payload
      return {
        manageUsers
      }
    }

    case 'SET_STUDENTS_LOADING': {
      const manageUsers = { ...state.manageUsers }
      manageUsers.students.isLoading = payload
      return {
        manageUsers
      }
    }

    case 'SET_ADMINS_LOADING': {
      const manageUsers = { ...state.manageUsers }
      manageUsers.admins.isLoading = payload
      return {
        manageUsers
      }
    }

    case 'UPDATE_USER': {
      const manageUsers = { ...state.manageUsers }
      const tab = pluralize(payload.role)
      const userId = payload.id
      manageUsers[tab].all[userId] = payload
      return {
        manageUsers
      }
    }

    case 'SET_USER_EDITING_STATE': {
      const manageUsers = { ...state.manageUsers }
      const tab = pluralize(payload.user.role)
      const userId = payload.user.id
      manageUsers[tab].all[userId] = {
        ...manageUsers[tab].all[userId],
        isEditing: payload.isEditing
      }
      return {
        manageUsers
      }
    }

    case 'SET_ASSIGN_INSTRUCTOR_FORM': {
      const newState = { ...state }
      const activeTab = state.manageUsers.activeTab
      newState.manageUsers[activeTab] = {
        ...newState.manageUsers[activeTab],
        assignInstructorForm: {
          ...newState.manageUsers[activeTab].assignInstructorForm,
          [payload.key]: payload.value
        }
      }
      return {
        ...state,
        ...newState
      }
    }

    case 'CLEAR_INSTRUCTOR_FORM': {
      const newState = { ...state }
      newState.manageUsers[payload.userType] = {
        ...newState.manageUsers[payload.userType],
        assignInstructorForm: initInstructorForm(),
        isShowingAddNewForm: false
      }
      return {
        ...state,
        ...newState
      }
    }

    case 'CLEAR_INVITATION_FORM': {
      const newState = { ...state }
      newState.manageUsers[payload.activeTab] = {
        ...newState.manageUsers[payload.activeTab],
        form: initInvitationForm()
      }
      return {
        ...state,
        ...newState
      }
    }

    case 'SET_MANAGE_USERS_ACTIVE_TAB': {
      const manageUsers = { ...state.manageUsers }
      manageUsers.activeTab = payload
      return {
        ...state,
        manageUsers
      }
    }

    case `ADD_${payload && (payload.userType || '').toUpperCase()}_TO_INVITATION`: {
      const newState = { ...state }
      const { payload: data, userType } = payload
      newState.manageUsers[userType] = {
        ...newState.manageUsers[userType],
        form: [
          ...newState.manageUsers[userType].form,
          data
        ]
      }
      return {
        ...state,
        ...newState
      }
    }

    case `REMOVE_${payload && (payload.userType || '').toUpperCase()}_FROM_INVITATION`: {
      const newState = { ...state }
      const { userType, payload: { userEntry } } = payload
      const index = newState.manageUsers[userType].form.indexOf(userEntry)
      newState.manageUsers[userType].form.splice(index, 1)
      return {
        ...state,
        ...newState
      }
    }

    case `SET_${payload && (payload.userType || '').toUpperCase()}_INVITATION_REQUEST_STATUS`: {
      const newState = { ...state }
      const { userType, isInviting } = payload
      newState.manageUsers[userType].isInviting = isInviting
      return {
        ...state,
        ...newState
      }
    }

    case `SET_${payload && (payload.userType || '').toUpperCase()}_INVITATION_FORM`: {
      const { index, userType, payload: data } = payload
      const manageUsers = { ...state.manageUsers }
      manageUsers[userType].form[index] = {
        ...manageUsers[userType].form[index],
        ...data
      }
      return {
        ...state,
        manageUsers
      }
    }

    case 'SET_ADD_USERS_FORM': {
      const newState = { ...state }
      const activeTab = state.manageUsers.activeTab
      newState.manageUsers[activeTab] = {
        ...newState.manageUsers[activeTab],
        isShowingAddNewForm: payload.isShowingAddNewForm
      }
      return {
        ...state,
        ...newState
      }
    }

    case 'TOGGLE_ASSIGN_INSTRUCTOR_VISIBILITY_FORM': {
      const newState = { ...state }
      newState.manageUsers.instructors.assignInstructorForm.isVisible = payload.isVisible
      return {
        ...state,
        ...newState
      }
    }

    case 'SET_INSTRUCTORS': {
      const newState = { ...state }

      newState.manageUsers.instructors = {
        ...newState.manageUsers.instructors,
        ...transformArray(payload.data.data),
        total: payload.data.total
      }

      newState.manageUsers.instructors.pagination = paginationOptions('instructors', newState, {
        page: payload.page,
        pageSize: payload.pageSize
      })

      return {
        ...state,
        ...newState
      }
    }

    case 'SET_ADMINS': {
      const newState = { ...state }

      newState.manageUsers.admins = {
        ...newState.manageUsers.admins,
        ...transformArray(payload.data.data),
        total: payload.data.total
      }

      newState.manageUsers.admins.pagination = paginationOptions('admins', newState, {
        page: payload.page,
        pageSize: payload.pageSize
      })

      return {
        ...state,
        ...newState
      }
    }

    case 'SET_STUDENTS': {
      const newState = { ...state }

      newState.manageUsers.students = {
        ...newState.manageUsers.students,
        ...transformArray(payload.data.data),
        total: payload.data.total
      }

      newState.manageUsers.students.pagination = paginationOptions('students', newState, {
        page: payload.page,
        pageSize: payload.pageSize
      })

      return {
        ...state,
        ...newState
      }
    }
    default:
      return state
  }
}

export const getAllAdminInstructors = (state) => {
  return state.admin.manageUsers.instructors.byIds.map(i => {
    return state.admin.manageUsers.instructors.all[i]
  })
}

export const getAllAdminStudents = (state) => {
  return state.admin.manageUsers.students.byIds.map(i => {
    return state.admin.manageUsers.students.all[i]
  })
}

export const getAllAdmins = (state) => {
  return state.admin.manageUsers.admins.byIds.map(i => {
    return state.admin.manageUsers.admins.all[i]
  })
}
