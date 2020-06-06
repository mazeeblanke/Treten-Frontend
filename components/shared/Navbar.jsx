/* eslint-disable */
import React from 'react'
import Link from 'next/link'
import Display from './Display'
import { connect } from 'react-redux'
import { Icon, Button, Select, Cascader } from 'antd'
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

  onChange = (value, selectedOptions) => {
    // console.log(value, selectedOptions)
    window.location = value[1]
    // this.setState({
    //   text: selectedOptions.map(o => o.label).join(', '),
    // });
  };

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
                <NavItem>
                  <Cascader options={Object.values(coursesByGroup)} onChange={this.onChange}>
                    <div className="d-flex is-vcentered">
                      <a className="is-blue" href="#">Courses</a>
                      <Icon type="down" />
                    </div>
                  </Cascader>
                </NavItem>
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
