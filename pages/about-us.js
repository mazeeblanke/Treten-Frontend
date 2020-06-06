import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import withMasterLayout from './layouts/withMasterLayout'
import Introduction from '../components/about-us/Introduction'
import Goals from '../components/about-us/Goals'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'
import MeetTeam from '../components/about-us/MeetTeam'
import { getTeam } from '../store/reducers/team'
import {
  fetchTeam
} from '../store/actions'

class AboutUs extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(fetchTeam())
    ])
    return {}
  }

  render () {
    return (
      <>
        <Head>
          <title key="title">Treten Academy - About Us</title>
        </Head>
        <Introduction />
        <Goals />
        {
          this.props.teamMembers.length &&
          <MeetTeam teamMembers={this.props.teamMembers} />
        }
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  // user: getUser(state),
  teamMembers: getTeam(state)
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(AboutUs))
