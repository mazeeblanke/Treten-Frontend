
import GeneralDetails from './GeneralDetails'
import CourseDetails from './CourseDetails'
import { Button, Steps } from 'antd'
import PropTypes from 'prop-types'
import Modules from './Modules'
import React from 'react'
import Faqs from './Faqs'

const Step = Steps.Step
const steps = [
  {
    title: 'General details',
  },
  {
    title: 'Course details',
  },
  {
    title: 'Modules',
  },
  {
    title: 'FAQS',
  },
]

const Index = (props) => {
  const {
    currentTab,
    errors,
    addModule,
    addFaq,
    setForm,
    prevStep,
    nextStep,
    courseForm
  } = props
  return (
    <section className="student-course-dashboard">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-10 col-xl-10 pl-6 pr-6">
            <Steps
              className="d-xs-block d-sm-block d-md-none"
              direction="vertical"
              progressDot
              current={currentTab}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <Steps
              className="d-none d-md-block"
              progressDot
              current={currentTab}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              {/* /* STEP  1 */}
              {currentTab === 0 && (
                <GeneralDetails
                  errors={errors}
                  setForm={setForm}
                  courseForm={courseForm} />
              )}
              {/* STEP 2 */}
              {currentTab === 1 && (
                <CourseDetails
                  errors={errors}
                  setForm={setForm}
                  courseForm={courseForm} />
              )}

              {/* STEP 3 */}
              {currentTab === 2 && (
                <Modules
                  errors={errors}
                  setModule={setForm}
                  addModule={addModule}
                  courseForm={courseForm} />
              )}

              {/* STEP 4 */}
              {currentTab === 3 && (
                <Faqs
                  errors={errors}
                  setFaq={setForm}
                  addFaq={addFaq}
                  courseForm={courseForm} />
              )}
            </div>

            <div className="steps-action">
              <div className="container mt-4">
                <div className="row">
                  <div className="col-md-12 mb-4">
                    {
                      currentTab > 0 &&
                        (
                          <Button
                            className="mr-3"
                            ghost
                            type="primary"
                            style={{ width: '105px', height: '42px' }}
                            onClick={prevStep}>
                            Previous
                          </Button>
                        )
                    }
                    {
                      currentTab < steps.length - 1 &&
                        <Button
                          type="secondary"
                          style={{ width: '105px', height: '42px' }}
                          onClick={nextStep}>
                            Next
                        </Button>
                    }
                    {
                      currentTab === steps.length - 1 &&
                        <Button
                          type="secondary"
                          style={{ width: '105px', height: '42px' }} >
                            Done
                        </Button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Index.propTypes = {
  courseForm: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  currentTab: PropTypes.number.isRequired,
  setForm: PropTypes.func.isRequired,
  addFaq: PropTypes.func.isRequired,
  addModule: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired
}

export default Index
