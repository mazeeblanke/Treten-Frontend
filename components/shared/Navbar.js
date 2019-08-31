import React from 'react';
import Link from 'next/link';
import Display from '../shared/Display';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button } from 'antd';
const { Header } = Layout;
const { SubMenu } = Menu;
import { Input } from 'antd';
const { Search } = Input;
import Brand from './Brand';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class Navigation extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render () {
    return (

      <Navbar className="fixed-top"  style={this.props.noBoxShadow ? { boxShadow: 'none', border: '1px solid #F0F1F3' } : {} } color="faded" light expand="md">
        <div className="container">
          <NavbarBrand href="/">
            {/* <img className="brand__logo" src="/static/images/logo.png" />
            <h4 className="brand__text">Treten Academy</h4> */}
            <Brand />
          </NavbarBrand>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto">
              <div className="is-flex is-vcentered">
                <Search
                  size="large"
                  placeholder="What do you want to learn?"
                  onSearch={value => console.log(value)}
                  style={{ width: 230, marginLeft: '2rem' }}
                />
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
                        <b>Associate level</b>
                      </NavLink>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNA R&S</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNA Security</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNA Service Provider</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNA Cyber Ops</span>
                        </Link>
                      </DropdownItem>
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Professional level</b>
                      </NavLink>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP R&S</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP Security</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP Service Provider</span>
                        </Link>
                      </DropdownItem>
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Expert level</b>
                      </NavLink>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP R&S</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP Security</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>CCNP Service Provider</span>
                        </Link>
                      </DropdownItem>
                    </div>
                    <div className="col-sm-6 mb-5">
                      <NavLink className="is-blue" disabled href="#">
                        <b>Bootcamp</b>
                      </NavLink>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>Zero to Hero Cisco R&S</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>Zero to Hero Cisco Security</span>
                        </Link>
                      </DropdownItem>
                      <DropdownItem>
                        <Link href="/resources/interview-questions">
                          <span>Zero to Hero Firewall Expert</span>
                        </Link>
                      </DropdownItem>
                    </div>
                  </div>

                    <NavLink className="is-blue" disabled href="#">
                      <b>View course catalog</b>
                    </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                <Link href="/about-us">About us</Link>
              </NavItem>
              <NavItem>
                <Link href="/why-us">Why us</Link>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
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
              </UncontrolledDropdown>
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
              <Display if={this.props.isLoggedIn} >
                <NavItem>
                  <Link href={
                    this.props.user.role === "student"
                      ? "/d/student/courses"
                      : (this.props.user.role === "admin"
                        ? "/d/admin/home"
                        : "/d/instructor/home")
                  }>
                    <a>
                      <Button className="mr-2" size="large" type="danger">Dashboard</Button>
                    </a>
                  </Link>
                </NavItem>
              </Display>
              <Display if={this.props.isLoggedIn} >
                <NavItem>
                    <img src={this.props.user.gravatar} alt={this.props.user.name} className="rounded-circle" />
                </NavItem>
              </Display>
              <Display if={!this.props.isLoggedIn}>
                <NavItem>
                  <a href="/t/auth">
                    <Button className="ml-3" size="large" type="danger">Register/Log in</Button>
                  </a>
                </NavItem>
              </Display>
            </Nav>
          </Collapse>
          </div>
        </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.user
})

export default connect(mapStateToProps)(Navigation);