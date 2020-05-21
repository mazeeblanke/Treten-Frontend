import { redirectTo, convertToFormData } from '../../lib/helpers'
// import dynamic from 'next/dynamic'
// const Router = dynamic(() => import('next/router'), {
//   ssr: false
// })
// console.log(Router)

export const updateUserDetails = userDetails => (dispatch, setState, api) => {
  if (userDetails.profile_pic) {
    dispatch({
      type: 'UPDATE_USER_PROFILE_PICS',
      payload: userDetails.imagePreviewUrl
    })
  }

  // const userDetailsForm = new FormData()

  // Object.keys(userDetails).forEach(key => {
  //   if (key !== 'imagePreviewUrl') {
  //     userDetailsForm.append(key, userDetails[key])
  //   }
  // })

  const userDetailsForm = convertToFormData(userDetails, 'imagePreviewUrl')

  return api.post('/api/user', userDetailsForm).then(res => {
    dispatch({
      type: 'UPDATE_USER',
      payload: res.data
    })
  })
}

export const setAddUsersModal = ({ payload, userType }) => ({
  type: 'SET_ADD_USERS_FORM',
  payload: {
    userType,
    isShowingAddNewForm: payload
  }
})

export const addUserToInvite = ({ payload, userType }) => ({
  type: `ADD_${userType.toUpperCase()}_TO_INVITATION`,
  payload: {
    userType,
    payload
  }
})

export const setInvitationRequestStatus = ({ payload, userType }) => ({
  type: `SET_${userType.toUpperCase()}_INVITATION_REQUEST_STATUS`,
  payload: {
    userType,
    isInviting: payload
  }
})

export const removeUserFromInvite = ({ payload, userType }) => ({
  type: `REMOVE_${userType.toUpperCase()}_FROM_INVITATION`,
  payload: {
    userType,
    payload
  }
})

export const setInvitationUserForm = ({ userType, payload, index }) => ({
  type: `SET_${userType.toUpperCase()}_INVITATION_FORM`,
  payload: {
    userType,
    payload,
    index
  }
})

export const setAssignInstructorModalVisibility = (payload) => ({
  type: 'TOGGLE_ASSIGN_INSTRUCTOR_VISIBILITY_FORM',
  payload: {
    isVisible: payload
  }
})

export const setManageUsersActiveTab = (payload) => ({
  type: 'SET_MANAGE_USERS_ACTIVE_TAB',
  payload
})

export const setAssignInstructorForm = (payload) => ({
  type: 'SET_ASSIGN_INSTRUCTOR_FORM',
  payload
})

export const assignCourseToInstructor = (payload) => (dispatch, getState, api) => {
  dispatch({
    type: 'SET_ASSIGN_INSTRUCTOR_FORM',
    payload: {
      key: 'isAssigning',
      value: true
    }
  })

  return api.post('api/assign-instructor', payload).then((res) => {
    dispatch({
      type: 'CLEAR_INSTRUCTOR_FORM',
      payload: {
        userType: 'instructors'
      }
    })
    return res
  })
    .finally(() => {
      dispatch({
        type: 'SET_ASSIGN_INSTRUCTOR_FORM',
        payload: {
          key: 'isAssigning',
          value: false
        }
      })
    })
}

export const inviteUsers = (payload) => (
  dispatch,
  getState,
  api
) => {
  const activeTab = getState().admin.manageUsers.activeTab
  dispatch(setInvitationRequestStatus({
    payload: true,
    userType: activeTab
  }))
  // dispatch({
  //   type: 'SET_STUDENTS_LOADING',
  //   payload: true
  // })

  return api.post('/api/invite-users', payload).then(res => {
    dispatch({
      type: 'CLEAR_INVITATION_FORM',
      payload: {
        activeTab
      }
    })
    return res.data
  })
    .finally(() => {
      dispatch(setInvitationRequestStatus({
        payload: false,
        userType: activeTab
      }))
    })
}

export const handleDeactivation = ({ deactivate, user }) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_USER_EDITING_STATE',
    payload: {
      user,
      isEditing: true
    }
  })
  return api.post(`/api/users-activation/${user.id}`, { userId: user.id, deactivate })
    .then(res => {
      dispatch({
        type: 'UPDATE_USER_ADMIN',
        payload: res.data.data
      })
      return res.data
    })
    .finally(() => {
      dispatch({
        type: 'SET_USER_EDITING_STATE',
        payload: {
          user,
          isEditing: false
        }
      })
    })
}

export const handleDelete = ({ user, type }) => (
  dispatch,
  getState,
  api
) => {
  dispatch({
    type: 'SET_USER_DELETING_STATE',
    payload: {
      user,
      isDeleting: true
    }
  })
  return api.delete(`/api/users/${user.id}`)
    .then(res => {
      dispatch({
        type: 'DELETE_USER',
        payload: {
          user
        }
      })
      return res.data
    })
    .catch((err) => {
      dispatch({
        type: 'SET_USER_DELETING_STATE',
        payload: {
          user,
          isDeleting: false
        }
      })
      return err
    })
}

export const fetchStudents = ({ page = 1, pageSize = 5, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_STUDENTS_LOADING',
    payload: true
  })

  return api.get(`/api/students?page=${page}&pageSize=${pageSize}&q=${q}`).then(res => {
    dispatch({
      type: 'SET_STUDENTS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
  })
    .finally(() => {
      dispatch({
        type: 'SET_STUDENTS_LOADING',
        payload: false
      })
    })
}

export const fetchAdmins = ({ page = 1, pageSize = 5, q = '' } = {}) => (
  dispatch,
  setState,
  api
) => {
  dispatch({
    type: 'SET_ADMINS_LOADING',
    payload: true
  })

  return api.get(`/api/admins?page=${page}&pageSize=${pageSize}&q=${q}`).then(res => {
    dispatch({
      type: 'SET_ADMINS',
      payload: {
        data: res.data,
        page,
        pageSize
      }
    })
  })
    .finally(() => {
      dispatch({
        type: 'SET_ADMINS_LOADING',
        payload: false
      })
    })
}

export const FETCH_USER = () => (dispatch, setState, api) =>
  api
    .get('/api/current_user')
    .then(res => {
      // console.log('api response',res)
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isLoggedIn: true,
          user: {
            // role: 'instructor',
            // role: 'admin',
            // role: 'student',
            ...res.data
          }
        }
      })
      return res
    })
    .catch((err) => {
      // console.log('api err response',err)
      dispatch({
        type: 'SET_AUTH',
        payload: {
          isLoggedIn: false,
          user: {}
        }
      })
      if (process.browser && location.href.includes('/d/')) {
        redirectTo('/', { status: 302 })
      }
      return err
    })
