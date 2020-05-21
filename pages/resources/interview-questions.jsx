import withMasterLayout from '../layouts/withMasterLayout'
import Footer from '../../components/shared/Footer'
import * as actions from '../../store/actions'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Select } from 'antd'

const { Option } = Select

class InterviewQuestions extends Component {
  static async getInitialProps () {
    return {}
  }

  state = {
    interviewQuestions: [
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
    ],
  }

  componentDidMount () {
  }

  render () {
    return (
      <>
        <section className="has-grey-bg has-full-height">
          <div className="container">
            <h3 className="text-center pt-8 features__main-text">
              Interview questions
            </h3>
            <div className="row justify-content-center mb-5">
              <div className="col-md-6 pl-5 pr-5">
                <p className="lh-30 fs-16 text-center">
                  We have great questions put together by subject matter experts.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="interview-questions has-white-bg pt-4 mb-8">
          <div className="container">
            <div className="d-flex justify-content-sm-between">
              <div>
                <Select defaultValue="All Categories" style={{ width: 150 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="All Categories">All Categories</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
              <div>
                <span className="mr-2"><b>Sort by</b></span>
                <Select defaultValue="lucy" style={{ width: 120 }}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled" disabled>
                    Disabled
                  </Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>
              </div>
            </div>
            <hr />
            <div className="row mt-6">

              {
                this.state.interviewQuestions.map((interviewQuestion) => (
                  <div key={interviewQuestion.title} className="col-sm-12 col-md-3 mb-6">
                    <div className="card border-0">
                      <div className="card-body">
                        <h6 className="card-title mt-3 mb-2 pb-0">
                          {interviewQuestion.title}
                        </h6>
                        <small>
                          {interviewQuestion.resourceSumary}
                        </small>
                        <p className="mt-2">
                          <b className="mr-1">Download</b>
                          <img src="/static/images/arrow-right.png" />
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(InterviewQuestions))
