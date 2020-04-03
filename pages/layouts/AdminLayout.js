import Display from '../../components/shared/Display'
import { ROUTES } from '../../lib/constants'
import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import { Layout, Menu } from 'antd'
// import { Offline } from 'react-detect-offline'
import Link from 'next/link'
import Head from 'next/head'
import PropTypes from 'prop-types'
import 'simple-react-notifier/dist/index.css'
const { Header, Sider, Content } = Layout
const Cookies = require('js-cookie')

class AdminLayout extends Component {
  state = {
    collapsed: false,
    activeRoute: this.props.router.pathname
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };

  routeChangeComplete = activeRoute => {
    this.setState({
      activeRoute
    })
  };

  componentDidMount () {
    this.props.router.events.on(
      'routeChangeComplete',
      this.routeChangeComplete
    )
  }

  componentWillUnmount () {
    this.props.router.events.off(
      'routeChangeComplete',
      this.routeChangeComplete
    )
  }

  render () {
    return (
      <Layout id="treten" style={{ margin: '0rem', display: 'flex', flexDirection: 'row' }}>
        <Head>
          <meta name="csrf-token" content={Cookies.get('XSRF-TOKEN')} />
        </Head>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="d-flex justify-content-sm-between align-items-center sidenav-top">
            <div className="logo m-4">
              <Link href="/">
                <img className="has-pointer-cursor" src="/static/images/admin/logo.png" />
              </Link>
            </div>

            <Display if={!this.state.collapsed}>
              <img
                src="/static/images/menu.png"
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Display>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[this.state.activeRoute]}

          >
            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    className={` ${this.props.router.pathname.includes('home') ? 'ant-menu-item-selected' : ''}`}
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_HOME)}
                    key={ROUTES.ADMIN_DASHBOARD_HOME}
                  >
                    <img
                      className={'mr-3'}
                      src={
                        this.props.router.pathname.includes('home')
                          ? '/static/images/admin/home-red.png'
                          : '/static/images/admin/home.png'
                      }
                    />
                    <span className="is-white ml-4 pl-1">Home</span>
                  </Menu.Item>
                )
                : null
            }
            {
              this.props.user.role === 'student'
                ? (
                  <Menu.Item
                    className={` ${this.props.router.pathname.includes('course') ? 'ant-menu-item-selected' : ''}`}
                    onClick={() =>
                      this.props.router.push(ROUTES.STUDENT_DASHBOARD_COURSES)}
                    key={ROUTES.STUDENT_DASHBOARD_COURSES}
                  >
                    <img
                      className={'mr-3'}
                      src={
                        this.props.router.pathname.includes('course')
                          ? '/static/images/admin/syllabus-red.svg'
                          : '/static/images/admin/syllabus.svg'
                      }
                    />
                    <span className="is-white ml-4 pl-1">My courses</span>
                  </Menu.Item>
                )
                : null
            }
            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    className={` ${this.props.router.pathname.includes('course') ? 'ant-menu-item-selected' : ''}`}
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_COURSES)}
                    key={ROUTES.ADMIN_DASHBOARD_COURSES}
                  >
                    <img
                      className={'mr-3'}
                      src={
                        this.props.router.pathname.includes('course')
                          ? '/static/images/admin/syllabus-red.svg'
                          : '/static/images/admin/syllabus.svg'
                      }
                    />
                    <span className="is-white ml-4">Courses</span>
                  </Menu.Item>
                )
                : null
            }
            {
              this.props.user.role === 'instructor'
                ? (
                  <Menu.Item
                    className={` ${this.props.router.pathname.includes('home') || this.props.router.pathname.includes('course') ? 'ant-menu-item-selected' : ''}`}
                    onClick={() =>
                      this.props.router.push(ROUTES.INSTRUCTOR_DASHBOARD_HOME)}
                    key={ROUTES.INSTRUCTOR_DASHBOARD_HOME}
                  >
                    <img
                      className={'mr-3'}
                      src={
                        this.props.router.pathname.includes('home') || this.props.router.pathname.includes('course')
                          ? '/static/images/admin/home-red.png'
                          : '/static/images/admin/home.png'
                      }
                    />
                    <span className="is-white ml-4 pl-1">Home</span>
                  </Menu.Item>
                )
                : null
            }

            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_USERS)}
                    key={ROUTES.ADMIN_DASHBOARD_USERS}
                  >
                    <img
                      className="mr-3"
                      src={
                        this.props.router.pathname ===
                          ROUTES.ADMIN_DASHBOARD_USERS
                          ? '/static/images/admin/manage-users.png'
                          : '/static/images/admin/manage-users-white.png'
                      }
                    />
                    <span className="is-white ml-4 pl-1">Manage users</span>
                  </Menu.Item>
                )
                : null
            }

            <Menu.Item
              className={` ${this.props.router.pathname.includes('resources') ? 'ant-menu-item-selected' : ''}`}
              onClick={() =>
                this.props.router.push(`/d/${this.props.user.role}/resources`)}
              key={`d/${this.props.user.role}/resources`}
            >
              <img
                className="mr-3"
                src={
                  this.props.router.pathname.includes('resources')
                    ? '/static/images/admin/resources-red.svg'
                    : '/static/images/admin/resources.svg'
                }
              />
              <span className="is-white ml-4 pl-2">Resources</span>
            </Menu.Item>
            <Menu.Item
              className={` ${this.props.router.pathname.includes('notifications') ? 'ant-menu-item-selected' : ''}`}
              onClick={() => this.props.router.push(`/d/${this.props.user.role}/notifications`)}
              key={`/d/${this.props.user.role}/notifications`}>
              <img
                className="mr-3"
                src={
                  this.props.router.pathname.includes('notifications')
                    ? '/static/images/admin/notifications-red.svg'
                    : '/static/images/admin/notifications.svg'
                }
              />
              <span className="is-white ml-4 pl-2">Notifications</span>
            </Menu.Item>
            <Menu.Item
              onClick={() => this.props.router.push(ROUTES.STUDENT_DASHBOARD_MESSAGES)}
              key={ROUTES.STUDENT_DASHBOARD_MESSAGES}>
              <img
                className="mr-3"
                src={
                  this.props.router.pathname ===
                    ROUTES.STUDENT_DASHBOARD_MESSAGES
                    ? '/static/images/admin/chat-red.svg'
                    : '/static/images/admin/chat.svg'
                }
              />
              <span className="is-white ml-4 pl-1">Messages</span>
            </Menu.Item>
            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_TRANSACTIONS)}
                    key={ROUTES.ADMIN_DASHBOARD_TRANSACTIONS}
                  >
                    <img
                      className="mr-3"
                      src={
                        this.props.router.pathname ===
                          ROUTES.ADMIN_DASHBOARD_TRANSACTIONS
                          ? '/static/images/admin/transactions.png'
                          : '/static/images/admin/transactions-white.png'
                      }
                    />
                    <span className="is-white ml-4 pl-1">Transactions</span>
                  </Menu.Item>
                )
                : null
            }
            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_REVIEWS)}
                    key={ROUTES.ADMIN_DASHBOARD_REVIEWS}
                  >
                    <img
                      className="mr-3"
                      src={
                        this.props.router.pathname ===
                          ROUTES.ADMIN_DASHBOARD_REVIEWS
                          ? '/static/images/admin/manage-reviews.png'
                          : '/static/images/admin/manage-reviews-white.png'
                      }
                    />
                    <span className="is-white ml-4 ">Manage reviews</span>
                  </Menu.Item>
                )
                : null
            }
            {
              this.props.user.role === 'admin'
                ? (
                  <Menu.Item
                    onClick={() =>
                      this.props.router.push(ROUTES.ADMIN_DASHBOARD_WEBSITE)}
                    key={ROUTES.ADMIN_DASHBOARD_WEBSITE}
                  >
                    <img
                      className="mr-3"
                      src={
                        this.props.router.pathname ===
                          ROUTES.ADMIN_DASHBOARD_WEBSITE
                          ? '/static/images/admin/manage-website.png'
                          : '/static/images/admin/manage-website-white.png'
                      }
                    />
                    <span className="is-white ml-4 ">Manage website</span>
                  </Menu.Item>
                )
                : null
            }

            {
              this.props.user.role === 'student'
                ? (
                  <Menu.Item
                    onClick={() =>
                      this.props.router.push('/courses')}
                    className="mt-15"
                    key="6"
                  >
                    <img className="mr-3" src="/static/images/admin/catalog.svg" />
                    <span className="is-white ml-4 pl-1">Course catalog</span>
                  </Menu.Item>
                )
                : null
            }
            <Menu.Item
              className={` ${this.props.router.pathname.includes('profile') ? 'ant-menu-item-selected' : ''} ${this.props.user.role !== 'student' ? 'mt-15' : ''}`}
              onClick={() => this.props.router.push(ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS)}
              key={ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS}>
              <img
                className="mr-2 rounded-circle"
                style={{ marginLeft: '-10px', height: '40px', width: '40px' }}
                src={`${this.props.user.profilePic}`}
              />
              <span className="is-white ml-2 pl-1">My profile</span>
            </Menu.Item>
            <Menu.Item key="8">
              <img
                className="mr-3"
                style={{ marginLeft: '-9px' }}
                src="/static/images/admin/forum.svg"
              />
              <span className="is-white ml-4 pl-1">Forum</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            className="d-flex"
            style={{ background: '#fff', padding: 0 }}
          >
            <div className="container">
              <div className="row align-items-center has-full-height">
                <div className="col-md-12 d-flex align-items-center pr-6 pl-6">
                  <Display if={!!this.state.collapsed}>
                    <div>
                      <img
                        src="/static/images/menu-black.png"
                        className="trigger mr-3"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                      />
                    </div>
                  </Display>
                  <div className="has-full-width">
                    <Display if={!!this.props.headerName}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="m-0 main-header">{this.props.headerName}</h5>
                        <div className="ml-4">
                          {this.props.action}
                        </div>
                      </div>
                    </Display>
                    <Display if={!this.props.headerName}>
                      <div>
                        <img onClick={this.props.router.back} className="mr-3 has-cursor-pointer" src="/static/images/arrow-left.png" ></img>
                        <span>{this.props.backText}</span>
                      </div>
                    </Display>
                  </div>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              background: '#fff',
              minHeight: 280
            }}
          >
            <div className="mt-5 has-full-height">
              {/* <Offline>
                <Alert message="You're offline right now. Check your connection." type="warning" showIcon />
              </Offline> */}
              {
                this.props.children
              }
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

AdminLayout.propTypes = {
  router: PropTypes.object.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
    profilePic: PropTypes.string
  }),
  backText: PropTypes.string,
  headerName: PropTypes.string,
  children: PropTypes.node,
  action: PropTypes.node
}

export default withRouter(connect(mapStateToProps, {})(
  AdminLayout
))
