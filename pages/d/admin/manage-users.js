import {
  Modal
} from 'antd'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import capitalize from 'capitalize'
import { connect } from 'react-redux'
import yupToObject from 'yup-to-object'
import React, { Component } from 'react'
import * as actions from '../../../store/actions'
import notifier from 'simple-react-notifications'
import AdminLayout from '../../layouts/AdminLayout'
import withRedirect from '../../layouts/withRedirect'
import inviteUserSchema from '../../../lib/schemas/inviteUsers'
import MenuBar from '../../../components/admin/ManageUsers/MenuBar'
import UsersList from '../../../components/admin/ManageUsers/UsersList'
import InviteUsersForm from '../../../components/shared/InviteUsersForm'
import PaginationStatus from '../../../components/admin/ManageUsers/PaginationStatus'
import AssignInstructorsForm from '../../../components/instructor/AssignInstructorsForm'
import { getAllAdminInstructors, getAllAdminStudents, getAllAdmins } from '../../../store/reducers/admin'
import { getUserDetails } from '../../../store/reducers/user'

const uuidv1 = require('uuid/v1')
const { confirm } = Modal

class ManageUsers extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchInstructors()),
      reduxStore.dispatch(actions.fetchStudents()),
      reduxStore.dispatch(actions.fetchAdmins())
    ])
    return {}
  }

  constructor (props) {
    super(props)
    this.csvDownloadRef = React.createRef()
    this.inviteUserFormRef = React.createRef()
  }

  state = {
    errors: {},
    csvData: [],
    searchQuery: '',
    loadingCSV: false
  }

  toggleAssignInstructorForm = (visibility, row) => {
    this.props.setAssignInstructorModalVisibility(
      visibility
    )
    this.setAssignInstructorForm(row.id, 'authorId')
  }

  setAddNewFormVisibility = (visibility = true) => {
    this.props.setAddUsersModal({
      payload: visibility,
      userType: this.props.activeTab
    })
  }

  closeInvitationForm = () => {
    this.setAddNewFormVisibility(false)
  }

  handleTabChange = e => {
    this.props.setManageUsersActiveTab(
      e.target.value
    )
  }

  setInvitationUserForm = (payload, index) => {
    this.validateInvitationForm()
    this.props.setInvitationUserForm({
      userType: this.props.activeTab,
      payload,
      index
    })
  }

  validateInvitationForm = () => {
    inviteUserSchema
      .validate(this.props[this.props.activeTab].form, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: {
            [this.props.activeTab]: {}
          }
        })
      })
      .catch(yupError => {
        const errors = yupToObject(yupError)
        this.setState({
          errors: {
            [this.props.activeTab]: errors
          }
        })
      })
  }

  inviteUsers = (e) => {
    e.preventDefault()
    const {
      activeTab
    } = this.props
    inviteUserSchema
      .validate(this.props[activeTab].form, { abortEarly: false })
      .then(() => {
        this.setState({
          errors: {
            [activeTab]: {}
          }
        })
        const payload = this.props[activeTab].form.map(entry => entry.email)
        this.props.inviteUsers({
          emails: payload,
          role: pluralize.singular(activeTab)
        }).then((res) => {
          notifier.success(res.message)
        })
          .catch((err) => {
            notifier.error(`ERROR! ${err.response.data.message}`)
            const emailErrors = err.response.data.errors
            if (emailErrors && emailErrors instanceof Object) {
              const errors = Object.keys(emailErrors).reduce((agg, cur) => {
                agg[cur.split('.').pop()] = { email: emailErrors[cur][0] }
                return agg
              }, {})
              this.setState({
                errors: {
                  [activeTab]: errors
                }
              })
            }
          })
      })
      .catch(yupError => {
        const errors = yupToObject(yupError)
        this.setState({
          errors: {
            [this.props.activeTab]: errors
          }
        })
      })
  }

  setAssignInstructorForm = (value, key) => {
    this.props.setAssignInstructorForm({ value, key })
  };

  addUserToInvite = () => {
    this.props.addUserToInvite({
      userType: this.props.activeTab,
      payload: {
        email: '',
        id: uuidv1()
      }
    })
    this.validateInvitationForm()
    const inviteUserFormWrapper = document.getElementById(
      'inviteUserFormWrapper'
    )
    setTimeout(() => {
      inviteUserFormWrapper.scrollTo(0, inviteUserFormWrapper.scrollHeight - 100)
    }, 10)
  }

  removeUserFromInvite = (userEntry) => {
    this.validateInvitationForm()
    this.props.removeUserFromInvite({
      userType: this.props.activeTab,
      payload: {
        userEntry
      }
    })
  }

  downloadCSV = () => {
    const {
      activeTab
    } = this.props
    this.setState({
      loadingCSV: true
    })
    this.props.downloadCSV(activeTab)
      .then(res => {
        this.setState({
          loadingCSV: false,
          csvData: res
        })
        this.csvDownloadRef.current.link.click()
      }).catch(() => {
        this.setState({
          loadingCSV: false
        })
      })
  };

  handleTableChange = (pagination, type) => {
    this.props[`fetch${type}`]({
      page: pagination.current,
      q: this.state.searchQuery
    })
  }

  handleDeactivation = (deactivate, user) => {
    const action = !deactivate ? 'activate' : 'deactivate'
    this.showConfirm(
      `Are you sure you want to ${action} this user ?`,
      () => this.props.handleDeactivation({ deactivate, user }).then((res) => {
        notifier.success(res.message)
      }).catch((err) => {
        // console.log(err)
        notifier.error(`ERROR! ${err.response.data.message}`)
      })
    )
  }

  showConfirm = (content, handleOk, handleCancel) => {
    confirm({
      content,
      onOk () {
        handleOk && handleOk()
      },
      onCancel () {
        handleCancel && handleCancel()
      }
    })
  }

  search = q => {
    this.setState({ searchQuery: q })
    this.props[`fetch${capitalize(this.props.activeTab)}`]({
      q
    })
  };

  render () {
    const {
      user,
      admins,
      students,
      activeTab,
      instructors,
      searchCourses,
      searchCourseBatches,
      assignCourseToInstructor,
      setAssignInstructorModalVisibility
    } = this.props
    return (
      <>
        <section className="manage-users">
          <AdminLayout headerName="Manage Users">
            <MenuBar
              search={this.search}
              activeTab={activeTab}
              csvData={this.state.csvData}
              downloadCSV={this.downloadCSV}
              loadingCSV={this.state.loadingCSV}
              csvDownloadRef={this.csvDownloadRef}
              handleTabChange={this.handleTabChange}
              setAddNewFormVisibility={this.setAddNewFormVisibility}
              setAssignInstructorModalVisibility={setAssignInstructorModalVisibility}
            />
            <div className="has-full-height has-white-bg">
              <div className="container">
                <PaginationStatus pagination={this.props[activeTab].pagination}/>
                <UsersList
                  user={user}
                  admins={admins}
                  students={students}
                  activeTab={activeTab}
                  instructors={instructors}
                  handleTableChange={this.handleTableChange}
                  handleDeactivation={this.handleDeactivation}
                  toggleAssignInstructorForm={this.toggleAssignInstructorForm}
                />
              </div>
            </div>
          </AdminLayout>
        </section>
        <Modal
          centered
          footer={null}
          width="464px"
          height="314px"
          onCancel={this.closeInvitationForm}
          wrapClassName="add-new-form-modal"
          visible={this.props[activeTab].isShowingAddNewForm}
          title={
            <div className="d-flex align-items-center justify-content-between">
              <h5>Add new {activeTab}</h5>
            </div>
          }
        >
          <InviteUsersForm
            activeTab={activeTab}
            errors={this.state.errors}
            add={this.addUserToInvite}
            remove={this.removeUserFromInvite}
            handleSubmit={this.inviteUsers}
            form={this.props[activeTab].form}
            setForm={this.setInvitationUserForm}
            isInviting={this.props[activeTab].isInviting}
          />
        </Modal>
        <Modal
          centered
          footer={null}
          width="464px"
          height="314px"
          visible={instructors.assignInstructorForm.isVisible}
          wrapClassName="assign-instructor-form-modal"
          onCancel={() => this.props.setAssignInstructorModalVisibility(false)}
          title={
            <div className="d-flex align-items-center justify-content-between">
              <h5>Assign instructor to course</h5>
            </div>
          }
        >
          <AssignInstructorsForm
            searchCourses={searchCourses}
            handleSubmit={this.inviteUsers}
            form={instructors.assignInstructorForm}
            searchCourseBatches={searchCourseBatches}
            assignCourseToInstructor={assignCourseToInstructor}
            setAssignInstructorForm={this.setAssignInstructorForm}
          />
        </Modal>
      </>
    )
  }
}

ManageUsers.propTypes = {
  user: PropTypes.object.isRequired,
  admins: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  downloadCSV: PropTypes.func.isRequired,
  inviteUsers: PropTypes.func.isRequired,
  fetchAdmins: PropTypes.func.isRequired,
  searchCourses: PropTypes.func.isRequired,
  instructors: PropTypes.object.isRequired,
  fetchStudents: PropTypes.func.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
  setAddUsersModal: PropTypes.func.isRequired,
  addUserToInvite: PropTypes.func.isRequired,
  handleDeactivation: PropTypes.func.isRequired,
  searchCourseBatches: PropTypes.func.isRequired,
  removeUserFromInvite: PropTypes.func.isRequired,
  setInvitationUserForm: PropTypes.func.isRequired,
  setAssignInstructorForm: PropTypes.func.isRequired,
  setManageUsersActiveTab: PropTypes.func.isRequired,
  assignCourseToInstructor: PropTypes.func.isRequired,
  setAssignInstructorModalVisibility: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: getUserDetails(state),
    activeTab: state.admin.manageUsers.activeTab,
    instructors: {
      ...state.admin.manageUsers.instructors,
      all: getAllAdminInstructors(state)
    },
    students: {
      ...state.admin.manageUsers.students,
      all: getAllAdminStudents(state)
    },
    admins: {
      ...state.admin.manageUsers.admins,
      all: getAllAdmins(state)
    }
  }
}

export default connect(
  mapStateToProps,
  {
    inviteUsers: actions.inviteUsers,
    fetchAdmins: actions.fetchAdmins,
    downloadCSV: actions.downloadCSV,
    searchCourses: actions.searchCourses,
    fetchStudents: actions.fetchStudents,
    addUserToInvite: actions.addUserToInvite,
    setAddUsersModal: actions.setAddUsersModal,
    fetchInstructors: actions.fetchInstructors,
    handleDeactivation: actions.handleDeactivation,
    searchCourseBatches: actions.searchCourseBatches,
    removeUserFromInvite: actions.removeUserFromInvite,
    setInvitationUserForm: actions.setInvitationUserForm,
    setManageUsersActiveTab: actions.setManageUsersActiveTab,
    setAssignInstructorForm: actions.setAssignInstructorForm,
    assignCourseToInstructor: actions.assignCourseToInstructor,
    setAssignInstructorModalVisibility: actions.setAssignInstructorModalVisibility
  }
)(withRedirect(ManageUsers))
