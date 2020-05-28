/* eslint-disable */
import React from 'react'
import Link from 'next/link'
import Display from './Display'
import { connect } from 'react-redux'
import { Icon, Button, Select } from 'antd'
import PropTypes from 'prop-types'
import Brand from './Brand'
const Option = Select.Option
import * as actions from '../../store/actions'
// import 'bootstrap/dist/css/bootstrap.min.css'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
// const { Search } = Input

class Navigation extends React.Component {
  constructor (props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false,
      courseOptions: []
    }
  }

  toggle () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  search = (searchQuery) => {
    this.props.searchCourses({ 
      q: searchQuery,
    }).then(({ data }) => {
      this.setState({
        courseOptions: data.data
      })
    })
  }

  render () {
    const {
      coursesByGroup,
      noBoxShadow,
      isLoggedIn,
      user
    } = this.props
    return (
      <Navbar
        className="fixed-top"
        style={noBoxShadow ? {
          boxShadow: 'none',
          border: '1px solid #F0F1F3'
        } : {}}
        color="faded"
        light expand="md"
      >
        <div className="container">
          <Brand />

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto">
              <div className="is-flex is-vcentered">
                <Select
                  showSearch
                  size="large"
                  allowClear
                  showArrow={false}
                  onChange={e => {
                    location.href = `/courses/${e}`
                    this.setState({
                      courseOptions: []
                    })
                  }}
                  style={{ width: 230, marginLeft: '2rem' }}
                  filterOption={false}
                  notFoundContent="No match"
                  onSearch={this.search}
                  className="has-full-width"
                  defaultActiveFirstOption={false}
                  placeholder='What do you want to learn?'
                >
                  {
                    this.state.courseOptions.map((option, index) => (
                      <Option key={index} value={option.slug}>
                        <div className="is-flex align-items-center justify-content-between">
                          <img
                            alt={option.title}
                            style={{ float: 'left', height: '28px' }}
                            src={option.bannerImage} >
                          </img>
                          <span
                            title={option.title}
                            className="ml-3"
                            style={{ float: 'right', color: '#8492a6', fontSize: 13 }}>
                            {option.title}
                          </span>
                        </div>
                      </Option>
                    ))
                  }
                </Select>
              </div>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Courses
                  <Icon type="down" />
                </DropdownToggle>
                <DropdownMenu className="courses" right>
                  <div className="row">
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Associate</b>
                      </NavLink>
                      {
                        (coursesByGroup.associate || []).map((course) => (
                          <DropdownItem key={course.slug}>
                            <Link href={`/courses/${course.slug}`}>
                              <span title={course.title}>{course.title}</span>
                            </Link>
                          </DropdownItem>
                        ))
                      }
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Professional</b>
                      </NavLink>
                      {
                        (coursesByGroup.professional || []).map((course) => (
                          <DropdownItem key={course.slug}>
                            <Link href={`/courses/${course.slug}`}>
                              <span title={course.title}>{course.title}</span>
                            </Link>
                          </DropdownItem>
                        ))
                      }
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Expert</b>
                      </NavLink>
                      {
                        (coursesByGroup.expert || []).map((course) => (
                          <DropdownItem key={course.slug}>
                            <Link href={`/courses/${course.slug}`}>
                              <span title={course.title}>{course.title}</span>
                            </Link>
                          </DropdownItem>
                        ))
                      }
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Bootcamp</b>
                      </NavLink>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span title="Zero to Hero Cisco R&S">
                            Zero to Hero Cisco R&S
                          </span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span title="Zero to Hero Cisco Security">
                            Zero to Hero Cisco Security
                          </span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span title="Zero to Hero Firewall Expert">
                            Zero to Hero Firewall Expert
                          </span>
                        </Link>
                      </DropdownItem>
                    </div>
                  </div>

                  <Link href="/courses">
                    <b className="is-blue mb-2 ml-2 has-pointer-cursor">
                      View course catalog
                    </b>
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link href="/about-us">
                  <a>About us</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/why-us">
                  <a>Why us</a>
                </Link>
              </NavItem>
              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Resources
                  <Icon type="down" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="mb-4 mt-3">
                    <Link href="/resources/interview-questions">
                      <span>Interview questions</span>
                    </Link>
                  </DropdownItem>
                  <DropdownItem className="mb-4">
                    <Link href="/resources/practice-questions">
                      <span>Practice questions</span>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
              <NavItem>
                <Link href="/blog">
                  <a>Blog</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/contact-us">
                  <a>Contact</a>
                </Link>
              </NavItem>
              <Display if={isLoggedIn} >
                <NavItem>
                  <a href={
                    user.role === 'student'
                      ? '/d/student/courses'
                      : (user.role === 'admin'
                        ? '/d/admin/home'
                        : '/d/instructor/home')
                  }>
                    {/* <a> */}
                    <Button
                      size="large"
                      type="danger"
                    >
                      Dashboard
                    </Button>
                    {/* </a> */}
                  </a>
                </NavItem>
              </Display>
              <Display if={isLoggedIn} >
                {/* <NavItem>
                  <img src={user.gravatar} alt={user.name} className="rounded-circle" />
                </NavItem> */}
                <NavItem>
                  <a href={`/t/logout?redirect=${this.props.currentPath}`}>
                    <Icon className="is-red" style={{ fontSize: 25 }} type="logout" />
                  </a>
                </NavItem>
              </Display>
              <Display if={!isLoggedIn}>
                <NavItem>
                  <a href={`/t/auth?redirect=${this.props.currentPath}`}>
                    <Button className="ml-3" size="large" type="danger">Register/Log in</Button>
                  </a>
                </NavItem>
              </Display>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

Navigation.propTypes = {
  noBoxShadow: PropTypes.bool,
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  currentPath: PropTypes.string.isRequired,
  coursesByGroup: PropTypes.object.isRequired,
  searchCourses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  isLoggedIn: state.auth.isLoggedIn,
  coursesByGroup: state.courses.byGroups,
})

export default connect(mapStateToProps, {
  searchCourses: actions.searchCourses
})(Navigation)
