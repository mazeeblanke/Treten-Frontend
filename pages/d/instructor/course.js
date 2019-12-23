// import CourseForm from '../../../components/admin/CourseForm'
import { userIsAdmin, userIsInstructor } from '../../../store/reducers/user'
import { getCourse, getBatches } from '../../../store/reducers/course'
import CourseHeader from '../../../components/student/CourseHeader'
import CourseDetail from '../../../components/admin/CourseDetail'
import BatchForm from '../../../components/instructor/BatchForm'
import BatchList from '../../../components/instructor/BatchList'
import withAdminLayout from '../../layouts/withAdminLayout'
import Display from '../../../components/shared/Display'
import { Button, Modal, Icon, Popconfirm } from 'antd'
import * as actions from '../../../store/actions'
import notifier from 'simple-react-notifications'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import withRedirect from '../../layouts/withRedirect'
const uuidv1 = require('uuid/v1')

const initBatchForm = () => ({
  modeOfDelivery: 'on site',
  commencementDate: null,
  batchName: null,
  price: null,
  timetable: [
    { day: 'mondays', sessions: [] },
    { day: 'tuesdays', sessions: [] },
    { day: 'wednesdays', sessions: [] },
    { day: 'thursdays', sessions: [] },
    { day: 'fridays', sessions: [] },
    { day: 'saturdays', sessions: [] },
    { day: 'sundays', sessions: [] },
  ]
})

class Course extends Component {
  static async getInitialProps ({ reduxStore, req }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchCourse({
        slug: req ? req.params.courseSlug : location.pathname.split('/').pop()
      }))
    ])
    return {}
  }

  state = {
    isAddingBatch: false,
    batchToDelete: null,
    isShowingBatchForm: false,
    batchForm: initBatchForm()
  }

  componentDidMount () {
    const { batches, setBatchExpandedState } = this.props
    batches.length && setBatchExpandedState(
      batches[0],
      true
    )
  }

  processForm = (form) => {
    return new Promise((resolve, reject) => {
      const batchForm = { ...form }
      const timetable = batchForm.timetable
        .map(schedule => schedule.sessions.length && schedule)
        .filter(schedule => schedule)
      resolve({
        ...batchForm,
        timetable,
        courseId: this.props.course.id
      })
    })
  }

  handleSubmit = e => {
    e && e.preventDefault()
    const {
      batchName,
      modeOfDelivery,
      commencementDate
    } = this.state.batchForm
    if (!commencementDate || !batchName || !modeOfDelivery) return
    this.processForm(this.state.batchForm).then(batchForm => {
      const action = batchForm.id ? 'editCourseBatch' : 'addCourseBatch'
      this.setState({
        isAddingBatch: true
      })
      this.props[action](batchForm)
        .then((res) => {
          notifier.success(res.message)
          this.setState({
            isShowingBatchForm: false,
            batchForm: initBatchForm()
          })
        })
        .catch(() => {
          notifier.error('ERROR! Unable to save the batch')
        })
        .finally(() => {
          this.setState({
            isAddingBatch: false
          })
        })
    })
  }

  setSession = (session, dayIndex, sessionIndex) => {
    const timetable = this.state.batchForm.timetable.slice()

    if (session.remove) {
      timetable[dayIndex].sessions.splice(sessionIndex, 1)
    }

    if (!session.remove) {
      timetable[dayIndex].sessions[sessionIndex] = {
        ...session
      }
    }

    this.setState({
      batchForm: {
        ...this.state.batchForm,
        timetable
      }
    })
  }

  addSession = (dayIndex) => {
    const timetable = this.state.batchForm.timetable.slice()
    timetable[dayIndex].sessions = [
      {
        activityName: '',
        begin: null,
        end: null,
        id: uuidv1(),
        time: ''
      },
      ...timetable[dayIndex].sessions
    ]

    this.setState({
      batchForm: {
        ...this.state.batchForm,
        timetable
      }
    })
  }

  onBatchNameChange = (e) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        batchName: e.target.value
      }
    })
  }

  onCommencementDateChange = (date, dateString) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        commencementDate: dateString
      }
    })
  }

  onPriceChange = (e) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        price: e.target.value
      }
    })
  }

  onModeOfDeliveryChange = (modeOfDelivery) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        modeOfDelivery
      }
    })
  }

  showBatchForm = () => {
    this.setState({
      isShowingBatchForm: true,
      batchForm: initBatchForm()
    })
  }

  editBatch = (batchIndex) => {
    const initForm = initBatchForm()
    const batchForm = {
      ...this.props.batches[batchIndex]
    }
    if (!batchForm.timetable.length) {
      batchForm.timetable = [
        ...initForm.timetable
      ]
    } else if (batchForm.timetable.length) {
      const daysHash = batchForm.timetable.map(t => t.day)
      const timetable = initForm.timetable.map(t => {
        const dayHashIndex = daysHash.indexOf(t.day)
        if (dayHashIndex >= 0) {
          return batchForm.timetable[dayHashIndex]
        }
        return t
      })
      batchForm.timetable = [
        ...timetable
      ]
    }
    this.setState({
      isShowingBatchForm: true,
      batchForm
    })
  }

  completeBatch = () => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        hasEnded: true,
        endDate: moment(Date.now()).format('YYYY-MM-DD h:mm:ss')
      }
    }, () => {
      this.handleSubmit()
    })
  }

  closeModal = () => {
    this.setState({
      isShowingBatchForm: false
    })
  }

  closeConfirmation = () => {
    this.setState({
      batchToDelete: null
    })
  }

  proceedWithConfirmation = () => {
    this.setState({
      batchToDelete: null
    })
    const action = userIsAdmin(this.props.user)
      ? this.props.deleteBatch
      : this.props.deleteSchedule
    action(
      this.state.batchToDelete
    ).then((res) => {
      notifier.success(res.message)
    }).catch(() => {
      notifier.error('ERROR, Unable to delete branch')
    })
  }

  setBatchToDelete = (batch) => {
    this.setState({
      batchToDelete: batch
    })
  }

  renderBatchModalTitle = () => {
    const {
      batchForm: { id, commencementDate, batchName, price },
      isAddingBatch
    } = this.state
    const {
      user
    } = this.props
    return (
      <div className="d-flex align-items-center justify-content-between">
        <h5>Add new batch</h5>
        <div className="d-flex">
          <Button
            loading={isAddingBatch}
            disabled={isAddingBatch || (!commencementDate || !batchName || !price)}
            onClick={this.handleSubmit}
            type="danger"
            style={{ width: '140px', height: '42px', marginRight: '6%' }}
          >
            { id ? 'Update batch' : 'Add batch' }
          </Button>
          <Display if={!!id && !isAddingBatch}>
            <Popconfirm
              placement="topRight"
              title="End/complete Batch"
              onConfirm={this.completeBatch}
              okText="Yes"
              cancelText="No"
              disabled={(!commencementDate || !batchName || !price) || !userIsAdmin(user)}
            >
              <Button disabled={(!commencementDate || !batchName || !price) || !userIsAdmin(user)} style={{ borderColor: 'red' }}>
                <Icon
                  style={{ fontSize: '30px' }}
                  type="check-circle"
                  theme="twoTone"
                  twoToneColor="red"
                  className="ml-3 mr-3 mt-2"
                />
              </Button>
            </Popconfirm>
          </Display>
        </div>
      </div>
    )
  }

  renderAddBranchBtn = () => (
    <Display if={userIsAdmin(this.props.user)}>
      <Button
        type="danger"
        onClick={this.showBatchForm}
        style={{ width: '136px', height: '42px' }}
      >
        Add new batch
      </Button>
    </Display>
  )

  render () {
    const {
      user,
      course,
      batches,
      saveCourse,
      createCourse,
      fetchInstructors,
      setBatchExpandedState
    } = this.props
    return (
      <>
        <CourseHeader
          user={user}
          course={course}
          className={userIsAdmin(user) ? 'mb-7' : ''}
        >
          <Display if={userIsInstructor(user)}>
            <div className="col-md-12 pl-6 pr-6 mt-7">
              <div className="d-flex justify-content-between mb-4">
                <h4>Batch and schedule</h4>
                {this.renderAddBranchBtn()}
              </div>
            </div>
          </Display>
        </CourseHeader>
        <Display if={userIsInstructor(user)}>
          <BatchList
            user={user}
            batches={batches}
            paddingClasses="pl-6 pr-6"
            editBatch={this.editBatch}
            setBatchToDelete={this.setBatchToDelete}
            setBatchExpandedState={setBatchExpandedState}
          />
        </Display>
        <Display if={userIsAdmin(user)}>
          <CourseDetail
            user={user}
            course={course}
            batches={batches}
            saveCourse={saveCourse}
            editBatch={this.editBatch}
            createCourse={createCourse}
            showBatchForm={this.showBatchForm}
            fetchInstructors={fetchInstructors}
            setBatchToDelete={this.setBatchToDelete}
            setBatchExpandedState={setBatchExpandedState}
          />
        </Display>
        <Modal
          centered
          width="870px"
          footer={null}
          onCancel={this.closeModal}
          wrapClassName="batch-form-modal"
          title={this.renderBatchModalTitle()}
          visible={this.state.isShowingBatchForm}
        >
          {this.state.isShowingBatchForm &&
          <BatchForm
            user={user}
            setSession={this.setSession}
            addSession={this.addSession}
            batchForm={this.state.batchForm}
            handleSubmit={this.handleSubmit}
            showBatchForm={this.showBatchForm}
            onPriceChange={this.onPriceChange}
            onBatchNameChange={this.onBatchNameChange}
            onModeOfDeliveryChange={this.onModeOfDeliveryChange}
            onCommencementDateChange={this.onCommencementDateChange}
          />}
        </Modal>
        <Modal
          title="Confirmation"
          onCancel={this.closeConfirmation}
          onOk={this.proceedWithConfirmation}
          visible={!!this.state.batchToDelete}
        >
          <p className="text-center">Are you sure you want to delete this batch ?</p>
        </Modal>
      </>
    )
  }
}

Course.propTypes = {
  user: PropTypes.shape({
    role: PropTypes.string
  }).isRequired,
  batches: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  deleteBatch: PropTypes.func.isRequired,
  fetchCourse: PropTypes.func.isRequired,
  createCourse: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  addCourseBatch: PropTypes.func.isRequired,
  editCourseBatch: PropTypes.func.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
  setBatchExpandedState: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    course: getCourse(state),
    batches: getBatches(state)
  }
}

Course.backText = 'Back to courses'

export default withRedirect(withAdminLayout(connect(
  mapStateToProps,
  {
    fetchCourse: actions.fetchCourse,
    saveCourse: actions.saveCourse,
    createCourse: actions.createCourse,
    deleteBatch: actions.deleteBatch,
    deleteSchedule: actions.deleteSchedule,
    addCourseBatch: actions.addCourseBatch,
    editCourseBatch: actions.editCourseBatch,
    fetchInstructors: actions.fetchInstructors,
    setBatchExpandedState: actions.setBatchExpandedState
  }
)(Course)))
