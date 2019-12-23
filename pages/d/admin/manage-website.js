/* eslint-disable */
import PropTypes from 'prop-types'
import { Icon, Button } from 'antd'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import notifier from 'simple-react-notifications'
import * as actions from '../../../store/actions'
import AdminLayout from '../../layouts/AdminLayout'
import withRedirect from '../../layouts/withRedirect'
import Display from '../../../components/shared/Display'
import ManageWebsiteForm from '../../../components/admin/ManageWebsiteForm'

class ManageWebsite extends Component {

  state = {
    popularCourses: {},
    coursesOptions: [],
    remoteOptions: [],
    isInitializing: true,
    isSaving: false
  }

  componentDidMount () {
    this.setState({
      isInitializing: true
    })
    this.props.fetchSettings().then((res) => {
      const { popularCourses } = res.data.data
      this.setState({
        popularCourses: (popularCourses || {}).settingValue 
          ? popularCourses.settingValue.ids
          : {},
        coursesOptions: (popularCourses || {}).settingValue 
          ? popularCourses.settingValue.courses
          : []
      })
    })
      .finally(() => {
        this.setState({
          isInitializing: false
        })
      })
  }

  setPopularCourse = (id, index) => {
    const { popularCourses } = this.state
    this.setState({
      popularCourses: {
        ...popularCourses,
        [index]: id
      }
    })
  }

  saveSettings = () => {
    this.setState({
      isSaving: true
    })
    this.props.saveSettings({
      popularCourses: this.state.popularCourses
    }).then(() => {
      notifier.success('Your settings have been saved!')
    }).catch(() => {
      notifier.error('ERROR! Your settings could not be saved!')
    }).finally(() => {
      this.setState({
        isSaving: false
      })
    })
  }

  onSearch = (query) => {
    return this.props.fetchCourses({ 
      q: query,
      isPublished: 1,
      hasInstructor: 1
    })
  }

  render () {
    const { popularCourses, coursesOptions } = this.state
    return (
      <section className="manage-website">
        <AdminLayout headerName="Manage Website">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 has-border-bottom">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4 col-sm-12">
                      <h4 className="m-0 pt-6 pb-6">
                        <b>Course sections</b>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row pl-6 pr-6 mt-5">
              <div className="col-md-12 col-lg-8">
                <Display if={this.state.isInitializing}>
                  <div className="has-full-width align-items-center is-flex justify-content-center">
                    <Icon style={{fontSize: 40}} type="loading"/>
                  </div>
                </Display>
                {!this.state.isInitializing &&
                  <>
                    <ManageWebsiteForm
                      popularCourses={popularCourses}
                      coursesOptions={coursesOptions}
                      onSearch={this.onSearch}
                      setPopularCourse={this.setPopularCourse}
                    />
                    <Button
                      loading={this.state.isSaving}
                      disabled={this.state.isSaving}
                      onClick={this.saveSettings}
                      type="danger"
                      style={{ width: '126px', height: '40px' }}
                    >
                      Save update
                    </Button>
                  </>
                }
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    )
  }
}

ManageWebsite.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  fetchCourses: PropTypes.func.isRequired,
  saveSettings: PropTypes.func.isRequired,
}

export default connect(null, {
  fetchSettings: actions.fetchSettings,
  fetchCourses: actions.fetchCourses,
  saveSettings: actions.saveSettings,
})(withRedirect(ManageWebsite))
