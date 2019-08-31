import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import EmptyState from '../../../components/shared/EmptyState';
import { Button, Modal, Tabs } from 'antd';
import AddCourseForm from '../../../components/admin/AddCourseForm';
import CourseHeader from '../../../components/student/CourseHeader';
import ExpandableBlock from '../../../components/shared/ExpandableBlock';
import BatchForm from '../../../components/instructor/BatchForm';
import Display from '../../../components/shared/Display';
const uuidv1 = require('uuid/v1');
const TabPane = Tabs.TabPane;

const courseTypes = [ 'remote', 'on-demand', 'onsite' ];

const initialScheduleTemplate = Array(3).fill({}).map((n, index) => ({
  activityName: '',
  begin: '',
  end: '',
  time: '',
  id: uuidv1()
}))

const initBatchForm = () => ({
  modeOfDelivery: [],
  batch_name: '',
  commencement_date: '',
  timeTable: [
    { day: 'mondays', sessions: [ ...initialScheduleTemplate ] },
    { day: 'tuesdays', sessions: [ ...initialScheduleTemplate ] },
    { day: 'wednesdays', sessions: [ ...initialScheduleTemplate ] },
    { day: 'thursdays', sessions: [ ...initialScheduleTemplate ] },
    { day: 'fridays', sessions: [ ...initialScheduleTemplate ] },
    { day: 'saturdays', sessions: [ ...initialScheduleTemplate ] },
  ]
})

class Course extends Component {
  constructor(props) {
    super(props);

  }



  state = {
    isShowingBatchForm: false,
    batchForm: initBatchForm(),
    course: {
      title: 'Course title goes here, and it just keeps going',
      level: 'Professional level',
      type: 'remote',
      learners: '250',
      commencement_date: 'Monday, 01 Aug 2019',
      batches: [
        {
          batch_name: 'Batch A 2019',
          commencement_date: 'Friday, 01 Aug 2019',
          timeTable: [
            {
              day: 'mondays',
              sessions: [
                {
                  begin: '12:08:23',
                  end: '15:08:23',
                  activityName: 'Name of class or activity for this time goes here'
                },
                {
                  begin: '17:08:23',
                  end: '19:08:23',
                  activityName: 'Name of class or activity for this time goes here'
                },
              ],
            },
            {
              day: 'tuesdays',
              sessions: [
                {
                  begin: '1:08:23',
                  end: '3:08:23',
                  activityName: 'Name of class or activity for this time goes here'
                }
              ]
            },
          ]
        },
        {
          batch_name: 'Batch B 2019',
          commencement_date: 'Monday, 01 Aug 2019',
          timeTable: [
            {
              day: 'mondays',
              sessions: [
                {
                  begin: '12:00pm',
                  end: '04:00pm',
                  activityName: 'Name of class or activity for this time goes here'
                },
                {
                  begin: '12:00pm',
                  end: '04:00pm',
                  activityName: 'Name of class or activity for this time goes here'
                },
              ],
            },
            {
              day: 'tuesdays',
              sessions: [
                {
                  begin: '12:00pm',
                  end: '04:00pm',
                  activityName: 'Name of class or activity for this time goes here'
                }
              ]
            },
          ]
        },
      ],
      instructor: {
        profile_pic: '/static/images/instructors/instructor1lg.png',
        fullname: 'Instructor name here',
        title: 'Title of instructor goes here',
        qualifications: "Bio here. Eventually, you do plan to have dinosaurs on your dinosaur tour, right? God help us, we're in the hands of engineers.",
        social_links: {
          facebook: 'wehjwe',
          linkedin: 'ewewi',
          twitter: 'ejkerjk'
        },
        experience: [
          {
            company: 'Microsoft',
            datePeriod: 'Apr 2017 - present',
            position: 'Lead Trainer',
            summary: 'Did he just throw my cat out of the window? You really think you can fly that thing? Jaguar shark!'
          },
          {
            company: 'Dell Technology',
            datePeriod: 'Dec 2017 - Jan 2018',
            position: 'Technology Associate',
            summary: 'Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.'
          },
        ],
        certifications: [
          {
            title: 'Certification title',
            logo: '/static/images/certifications/cisco.png',
            datePeriod: 'Apr 2017 - present'
          },
          {
            title: 'Certification title',
            logo: '/static/images/certifications/microsoft.png',
            datePeriod: 'Apr 2017 - present'
          },
          {
            title: 'Certification title',
            logo: '/static/images/certifications/microsoft.png',
            datePeriod: 'Apr 2017 - present'
          },
        ],
        courses: [
          {
            title: 'CCNA R&S',
            level: 'Expert',
            excerpt: 'Brief course description goes here. Did he just throw my cat out of the window? You really think you can fly that thing? Jaguar shark! '
          }
        ],
        education: [
          {
            institutionName: 'Name of institution',
            qualification: 'Qualification obtained from institution',
            datePeriod: 'Apr 2009 - Sept 2014'
          },
          {
            institutionName: 'Name of institution',
            qualification: 'Qualification obtained from institution',
            datePeriod: 'Apr 2009 - Sept 2014'
          },
          {
            institutionName: 'Name of institution',
            qualification: 'Qualification obtained from institution',
            datePeriod: 'Apr 2009 - Sept 2014'
          },
        ],
      },
      content:{
        availableDate: 'Monday, 01 Aug 2019',
        videos: [
          {
            videoUrl: '',
            poster: '/static/images/videos/video1.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/static/images/videos/video2.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
          {
            videoUrl: '',
            poster: '/static/images/videos/video3.png',
            title: `This is where the title of this course content goes, and if longer, extends this way. See?`,
            description: `Tesseract cosmic ocean preserve and cherish that pale blue dot
            two ghostly white figures in coveralls and helmets are soflty dancing brain is
            the seed of intelligence invent the universe? At the edge of forever prime number extraordinary claims
            require extraordinary evidence dispassionate extraterrestrial.`
          },
        ]
      },
      materials: [
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
        {
          title: 'Resource title goes here and if its long, the next line',
          resourceSumary: 'PDF, 45 pages. 24 MB',
          role: 'Role on the team',
        },
      ]
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleSubmit = e => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   if (!err) {
    //     console.log('Received values of form: ', values);
        let batches = this.state.course.batches.slice();
        batches.push({ ...this.state.batchForm });
        this.setState({
          isShowingBatchForm: false,
          batchForm: initBatchForm(),
          course: {
            ...this.state.course,
            batches
          }
        });

        console.log(this.state.batchForm);

    //   }
    // });
  };

  setSession = (session, dayIndex, sessionIndex) => {
    let timeTable = this.state.batchForm.timeTable.slice();
    timeTable[dayIndex].sessions[sessionIndex] = {
      ...session,
    }

    this.setState({
      batchForm: {
        ...this.state.batchForm,
        timeTable,
      }
    })
  }

  addSession = (dayIndex) => {
    let timeTable = this.state.batchForm.timeTable.slice();
    timeTable[dayIndex].sessions = [
      {
        activityName: '',
        begin: '',
        end: '',
        id: uuidv1(),
        time: ''
      },
      ...timeTable[dayIndex].sessions
    ]

    this.setState({
      batchForm: {
        ...this.state.batchForm,
        timeTable
      }
    })
  }

  onBatchNameChange = (e) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        batch_name: e.target.value,
      }
    }, () => { console.log(this.state) });
  }

  onCommencementDateChange = (date, dateString) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        commencement_date: dateString,
      }
    }, () => { console.log(this.state) });
  }

  onModeOfDeliveryChange = (modeOfDelivery) => {
    this.setState({
      batchForm: {
        ...this.state.batchForm,
        modeOfDelivery,
      }
    }, () => { console.log(this.state) });
  }

  showBatchForm = () => {
    this.setState({
      isShowingBatchForm: true
    })
  }

  editBatch = (batchIndex) => {
    this.setState({
      isShowingBatchForm: true,
      batchForm: { ...this.state.course.batches[batchIndex] }
    }, () => {
      console.log(this.state.batchForm)
    })
  }

  closeModal = () => {
    this.setState({
      isShowingBatchForm: false
    })
  }

  renderSchedule (paddingClasses) {
    return (
      <section className="student-course-dashboard">
        <div className="container">
          <div className="row">
            <div className={`col-md-12 col-lg-11 col-xl-7 ${paddingClasses}`}>
              <div>
                {
                  this.state.course.batches.map((batch, batchIndex) => {
                    return (
                      <ExpandableBlock
                          expanded={batchIndex === 0}
                          left={
                            <div>
                              <h6 className="text-capitalize">{batch.batch_name}</h6>
                              <p>{batch.commencement_date}</p>
                            </div>
                          }
                          right="View schedule"
                          content={
                          <>
                            <table className="has-full-width">
                              <thead>
                                <tr>
                                  <th style={{ width: '30%' }}>Days of the week</th>
                                  <th style={{ width: '70%' }}>Timetable</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  batch.timeTable.map((_schedule) => (
                                    <tr>
                                      <td style={{ verticalAlign: 'top' }}>
                                      <span className="text-capitalize">{_schedule.day}</span>
                                      </td>
                                      <td>
                                        {
                                          _schedule.sessions.map((session, index) => (
                                            <p key={index}>
                                              <span>{`${session.begin}-${session.end}`}</span>
                                              <br></br>
                                              <span>
                                                <b>{session.activityName}</b>
                                              </span>
                                            </p>
                                          ))
                                        }
                                      </td>
                                    </tr>
                                  ))
                                }
                              </tbody>
                            </table>
                            <Button
                              onClick={() => this.editBatch(batchIndex) }
                              size="large"
                              type="secondary"
                              className="mt-3">
                                Edit schedule
                            </Button>
                          </>
                        }
                      />
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  renderAddBranchBtn () {
    return (
      <Button
        style={{ width: '136px', height: '42px' }}
        onClick={this.showBatchForm}
        type="danger"
      >
        Add new branch
      </Button>
    )
  }

  renderCourseAndBatches () {
    return (
      <>
        <CourseHeader {...this.props} className={this.props.user.role !== 'admin' ? 'mb-7' : null } course={this.state.course}>
          <Display if={this.props.user.role === 'instructor'}>
            <div className="col-md-12 pl-6 pr-6 mt-7">
              <div className="d-flex justify-content-between mb-4">
                <h4>Batch and schedule</h4>
                {this.renderAddBranchBtn()}
              </div>
            </div>
          </Display>
        </CourseHeader>
        <Display if={this.props.user.role === 'instructor'}>
          {this.renderSchedule('pl-6 pr-6')}
        </Display>
        <Display if={this.props.user.role === 'admin'}>
          <div className={`container course__admin ${this.props.user.role === 'admin'  ? 'mt-5-neg' : null}`}>
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <Tabs tabBarExtraContent={
                  <div className="d-none d-md-block">
                    {
                      this.renderAddBranchBtn()
                    }
                  </div>
                }>
                  <TabPane tab="Batch and schedule" key="1">
                    <div className="row mt-4 batch-schedule-tab">
                      {this.renderSchedule()}
                    </div>
                  </TabPane>
                  <TabPane tab="Instructor" key="2">
                    Content of tab 2
                  </TabPane>
                  <TabPane tab="Settings" key="3">
                    <div className="mt-5 settings">
                      <AddCourseForm />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </Display>
      </>
    )
  }

  render() {
    return (
      <>
        { this.renderCourseAndBatches() }
        { this.state.isShowingBatchForm && (
            <Modal
              footer={null}
              wrapClassName="batch-form-modal"
              width="870px"
              centered
              onCancel={this.closeModal}
              visible={this.state.isShowingBatchForm}
              title={
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Add new batch</h5>
                  <Button onClick={this.handleSubmit} type="danger" style={{ width: '140px', height: '42px', marginRight: '6%' }}>Add batch</Button>
                </div>
              }
            >
              <BatchForm
                batchForm={this.state.batchForm}
                onCommencementDateChange={this.onCommencementDateChange}
                onModeOfDeliveryChange={this.onModeOfDeliveryChange}
                onBatchNameChange={this.onBatchNameChange}
                showBatchForm={this.showBatchForm}
                handleSubmit={this.handleSubmit}
                setSession={this.setSession}
                addSession={this.addSession}
              />
            </Modal>
        )}
      </>
    );
  }
}

Course.propTypes = {

};

Course.backText = 'Back to courses'

export default withAdminLayout(Course);