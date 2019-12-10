import React, { Component } from 'react'
import { connect } from 'react-redux'
import Head from 'next/head'
import withMasterLayout from './layouts/withMasterLayout'
import Introduction from '../components/about-us/Introduction'
import Goals from '../components/about-us/Goals'
import Footer from '../components/shared/Footer'
import * as actions from '../store/actions'
import MeetTeam from '../components/about-us/MeetTeam'

class AboutUs extends Component {
  static async getInitialProps () {
    return {}
  }

  constructor (props) {
    super(props)
    this.state = {
      teamMembers: [
        {
          fullname: 'Team member name',
          profile_pic: '/static/images/instructors/instructor1lg.png',
          role: 'Role on the team'
        },
        {
          fullname: 'Team member name',
          profile_pic: '/static/images/instructors/instructor2lg.png',
          role: 'Role on the team'
        },
        {
          fullname: 'Team member name',
          profile_pic: '/static/images/instructors/instructor3lg.png',
          role: 'Role on the team'
        },
        {
          fullname: 'Team member name',
          profile_pic: '/static/images/instructors/instructor4lg.png',
          role: 'Role on the team'
        }
      ]
    }
  }

  componentDidMount () {}

  render () {
    return (
      <>
        <Head>
          <title key="title">Treten Academy - About Us</title>
        </Head>
        <Introduction />
        <Goals />
        <MeetTeam teamMembers={this.state.teamMembers} />
        <Footer />
      </>
    )
  }
}

const mapStateToProps = () => ({
  // user: getUser(state),
})

export default connect(
  mapStateToProps,
  actions
)(withMasterLayout(AboutUs))
