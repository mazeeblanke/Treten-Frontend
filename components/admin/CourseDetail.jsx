import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CourseForm from '../../components/admin/CourseForm'
import BatchList from '../instructor/BatchList'
import { Tabs, Button } from 'antd'
import withCourseForm from '../../pages/layouts/withCourseForm'
import { userIsAdmin } from '../../store/reducers/user'
import InstructorsList from './InstructorsList'
import { isEqual } from 'lodash'
import Display from '../shared/Display'

/* eslint-disable */

class CourseDetail extends Component {
	state = {
		activeTab: '1',
		instructors: {
			isLoading: false,
		}
	}

	setActiveTab = (e) => {
		if (e === '2') {
			this.fetchInstructors({})
		}
		this.setState({
			activeTab: e
		})
	}

	handleTableChange = (pagination) => {
		this.fetchInstructors({
			page: pagination.current,
			pageSize: pagination.pageSize,
		})
	}

	fetchInstructors = ({pageSize = 100, page = 1}) => {
		this.setState({
			instructors: {
				...this.state.instructors,
				isLoading: true
			} 
		})
		this.props.fetchInstructors({
			courseId: this.props.course.id,
			pageSize,
			page
		}).then((res) => {
			this.setState({
				instructors: {
					...this.state.instructors,
					...res
				}
			})
		}).catch(() => {

		}).finally(() => {
			this.setState({
				instructors: {
					...this.state.instructors,
					isLoading: false
				}
			})
		})
	}

	renderActionBtn = () => {
		const {
			publish,
			isSaving,
			saveDraft,
			isPublishing,
			showBatchForm,
		} = this.props
		const { activeTab } = this.state
		return (
			<div className="col-md-6 d-flex justify-content-md-end mt-3 mb-3">
				<Display if={activeTab === '3'}>
					<Button
						className="mr-3"
						loading={isSaving}
						disabled={isSaving}
						onClick={saveDraft}
						style={{ height: '42px', width: '105px' }}
						type="primary"
						ghost
					>
						Save draft
					</Button>
				</Display>
				<Button
					type="danger"
					disabled={activeTab === '3' ? isPublishing : false}
					loading={activeTab === '3' ? isPublishing : false}
					onClick={activeTab === '3' ? publish : showBatchForm}
					style={{ width: '136px', height: '42px' }}
				>
					{ activeTab === '3' ? 'Pubish Course' : 'Add new batch' }
				</Button>
			</div>	
		)
	}
		
	componentDidMount () {
		this.initCourseForm()
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!isEqual(prevProps.course, this.props.course)) {
			this.initCourseForm()
		}
	}

	initCourseForm = () => {
		const {
			course,
			initCourseForm
		} = this.props
		initCourseForm({
			id: course.id,
			faqs: course.faqs,
			price: parseFloat(course.price) || 0,
			title: course.title,
			modules: course.modules,
			duration: +course.duration,
			category: (course.category || {}).name,
			institution: course.institution,
			description: course.description,
			bannerImage: course.bannerImage,
			coursePath: (course.coursePath || {}).name,
			certificationBy: course.certificationBy,
			coursePathPosition: +course.coursePathPosition,
		})
	}

	render () {
		const {
			user,
			addFaq,
			errors,
			setForm,
			batches,
			prevStep,
			nextStep,
			addModule,
			editBatch,
			currentTab,
			courseForm,
			setBatchToDelete,
			// renderAddBranchBtn,
			setBatchExpandedState,
		} = this.props
		return (
			<div className={`container course__admin ${userIsAdmin(user) ? 'mt-5-neg' : ''}`}>
				<div className="row">
					<div className="col-md-12 pl-6 pr-6">
						<Tabs
							onTabClick={this.setActiveTab}
						  activeKey={this.state.activeTab}
							defaultActiveKey={this.state.activeTab}
							tabBarExtraContent={
								<div className="d-none d-md-block">
									{this.renderActionBtn()}
								</div>
							}
						>
							<Tabs.TabPane tab="Batch and schedule" key="1">
								<div className="row mt-4 batch-schedule-tab">
									<BatchList
										user={user}
										batches={batches}
										editBatch={editBatch}
										paddingClasses="pl-6 pr-6"
										setBatchToDelete={setBatchToDelete}
										setBatchExpandedState={setBatchExpandedState}
									/>
								</div>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Instructors" key="2">
								<InstructorsList
									instructors={this.state.instructors} 
									handleTableChange={this.handleTableChange}
								/>
							</Tabs.TabPane>
							<Tabs.TabPane tab="Settings" key="3">
								<div className="mt-5 settings">
									<CourseForm
										errors={errors}
										addFaq={addFaq}
										setForm={setForm}
										prevStep={prevStep}
										nextStep={nextStep}
										addModule={addModule}
										currentTab={currentTab}
										courseForm={courseForm}
									/>
								</div>
							</Tabs.TabPane>
						</Tabs>
					</div>
				</div>
			</div>
		)
	}
}

CourseDetail.propTypes = {
  user: PropTypes.object.isRequired,
  addFaq: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  publish: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  batches: PropTypes.array.isRequired,
  prevStep: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  editBatch: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  addModule: PropTypes.func.isRequired,
  courseForm: PropTypes.object.isRequired,
  isPublishing: PropTypes.bool.isRequired,
  currentTab: PropTypes.number.isRequired,
  showBatchForm: PropTypes.func.isRequired,
  setBatchToDelete: PropTypes.func.isRequired,
  fetchInstructors: PropTypes.func.isRequired,
  // renderAddBranchBtn: PropTypes.func.isRequired,
  setBatchExpandedState: PropTypes.func.isRequired,
}

export default withCourseForm(CourseDetail)
