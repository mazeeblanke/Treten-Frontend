import Link from "next/link";
import Head from "next/head";
import PropTypes from "prop-types";
const Cookies = require("js-cookie");
import React, { Component } from "react";
import { withRouter } from "next/router";
import { ROUTES } from "../../lib/constants";
import withAdminLayout from "./withAdminLayout";
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";

export default Comp => {
  class Profile extends Component {
    constructor(props) {
      super(props);
      this.fileInputRef = React.createRef();
    }

    state = {
      selected: "",
      profile: []
    };

    componentWillMount() {}

    componentDidMount() {
			notifier.configure({
				onlyLast: true,
			});
		}

    componentWillUnmount() {}

    changeProfileImage = e => {
      e.preventDefault();
      const fileReader = new FileReader();
      const file = e.target.files[0];
      fileReader.onloadend = () => {
				notifier.info("Saving profile image....", {
					autoClose: false
				});
        this.props
          .updateUserDetails({
            profile_pic: file,
            imagePreviewUrl: fileReader.result
          })
          .then(() => notifier.success("Your profile has been updated"))
          .catch(() =>
            notifier.error("ERROR! Your profile could not be updated")
          )
          .finally(() => {
            this.fileInputRef.current.value = "";
          });
      };
      fileReader.readAsDataURL(file);
    };

    render() {
      return (
        <section className="profile has-full-height">
          <Head>
            <meta name="csrf-token" content={Cookies.get("XSRF-TOKEN")} />
          </Head>
          <div className="container has-full-height">
            <div className="row has-full-height pr-6 pl-6">
              <div className="col-md-12 mb-9">
                <div className="row">
                  <div className="mt-5 card-wrapper p-0">
                    <div className="card ">
                      <input
                        ref={this.fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={this.changeProfileImage}
                        style={{ display: "none" }}
                      ></input>
                      <img
                        className="edit"
                        src="/static/images/profile/edit-white.png"
                        onClick={() => this.fileInputRef.current.click()}
                      />
                      <img
                        src={`${this.props.user.profile_pic}`}
                        className="card-img-top"
                        alt="profile pic"
                      />
                      <div className="card-body">
                        <h5 className="card-title mb-2 text-capitalize">
                          {this.props.user.name}
                        </h5>
                        <p className="card-text text-capitalize">
                          {this.props.user.role}
                        </p>
                      </div>
                      <ul className="list-group">
                        <Link href={ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS}>
                          <li
                            className={`list-group-item has-pointer-cursor ${
                              this.props.router.pathname ===
                              ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS
                                ? "active"
                                : ""
                            }`}
                          >
                            <img
                              className="mr-3"
                              src={`/static/images/profile/${
                                this.props.router.pathname ===
                                ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS
                                  ? "user-white.png"
                                  : "user-black.png"
                              }`}
                            />
                            <span>Update your personal details</span>
                          </li>
                        </Link>
                        <Link href={ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD}>
                          <li
                            className={`list-group-item has-pointer-cursor ${
                              this.props.router.pathname ===
                              ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD
                                ? "active"
                                : ""
                            }`}
                          >
                            <img
                              className="mr-3"
                              src={`/static/images/profile/${
                                this.props.router.pathname ===
                                ROUTES.STUDENT_DASHBOARD_CHANGEPASSWORD
                                  ? "padlock-white.png"
                                  : "padlock-black.png"
                              }`}
                            />
                            <span>Change account password</span>
                          </li>
                        </Link>
                        {this.props.user.role === "instructor" && (
                          <Link href={ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS}>
                            <li
                              className={`list-group-item has-pointer-cursor ${
                                this.props.router.pathname ===
                                ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <img
                                className="mr-3"
                                src={`/static/images/profile/${
                                  this.props.router.pathname ===
                                  ROUTES.INSTRUCTOR_DASHBOARD_TUTORDETAILS
                                    ? "lock-white.png"
                                    : "lock-black.png"
                                }`}
                              />
                              <span>Update tutor profile</span>
                            </li>
                          </Link>
                        )}
                        <li className="list-group-item">
                          <a href="/t/logout">
                            <img
                              className="mr-3"
                              src="/static/images/profile/logout.png"
                            />
                            <span className="is-red">Log out</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5 col-lg-6 col-xl-7 col-md-12 col-sm-12 form-wrapper">
                    <Comp {...this.props} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }

  Profile.propTypes = {};

  Profile.headerName = "My Profile";

  return withAdminLayout(Profile);
};
