import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from './withAdminLayout';
import Link from 'next/link';
import { ROUTES } from '../../lib/helpers';
import { withRouter } from 'next/router';

export default (Comp) => {
  class Profile extends Component {
    constructor(props) {
      super(props);

    }

    state = {
      selected: '',
      profile: []
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
      return (
        <section className="profile has-full-height">
          <div className="container has-full-height">
            <div className="row has-full-height pr-6 pl-6">
              <div className="col-md-12 mb-9">
                <div className="row">
                  <div className="mt-5 card-wrapper p-0">
                    <div className="card ">
                      <img className="edit" src="/static/images/profile/edit-white.png" />
                      <img src="/static/images/profile/profile.png" className="card-img-top" alt="profile pic" />
                      <div className="card-body">
                        <h5 className="card-title mb-2">Oluwadamilare Akindele</h5>
                        <p className="card-text">Student</p>

                      </div>
                      <ul className="list-group">
                        <Link href={ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS}>
                          <li className={`list-group-item has-pointer-cursor ${this.props.router.pathname === ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS ? 'active' : '' }`}>
                            <img className="mr-3" src={`/static/images/profile/${this.props.router.pathname === ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS ? 'user-white.png' : 'user-black.png'}`} />
                            <span>Update your personal details</span>
                          </li>
                        </Link>
                        <Link href={ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD}>
                          <li className={`list-group-item has-pointer-cursor ${this.props.router.pathname === ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD ? 'active' : '' }`}>
                            <img className="mr-3" src={`/static/images/profile/${this.props.router.pathname === ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD ? 'padlock-white.png' : 'padlock-black.png'}`} />
                            <span>Change account password</span>
                          </li>
                        </Link>
                        {
                          this.props.user.role === 'instructor' && (
                            <Link href={ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS}>
                              <li className={`list-group-item has-pointer-cursor ${this.props.router.pathname === ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS ? 'active' : '' }`}>
                                <img className="mr-3" src={`/static/images/profile/${this.props.router.pathname === ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS ? 'lock-white.png' : 'lock-black.png'}`} />
                                <span>Update tutor profile</span>
                              </li>
                            </Link>
                          )
                        }
                        <li className="list-group-item">
                           <a href="/logout">
                              <img className="mr-3" src="/static/images/profile/logout.png" />
                              <span className="is-red">Log out</span>
                           </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 col-lg-6 col-xl-7 col-md-12 col-sm-12 form-wrapper">
                    <Comp />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      );
    }
  }

  Profile.propTypes = {

  };

  Profile.headerName = 'My Profile'

  return withAdminLayout(Profile);

}