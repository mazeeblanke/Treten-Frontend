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

      <Navbar className="fixed-top" fixed style={this.props.noBoxShadow ? { boxShadow: 'none', border: '1px solid #F0F1F3' } : {} } color="faded" light expand="md">
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
                  style={{ width: 250 }}
                />
              </div>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  Courses
                  <Icon type="down" />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
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
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
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
                  <Link href="/d/student/courses">
                    <a>
                      <Button className="ml-3" size="large" type="danger">Dashboard</Button>
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