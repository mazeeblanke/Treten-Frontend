import { Button } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import React, { Component } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import Display from "../../../components/shared/Display";
import EmptyState from "../../../components/shared/EmptyState";
import NewStudents from "../../../components/admin/NewStudents";
import LatestEnrollments from "../../../components/admin/LatestEnrollments";
import { getNewStudents, getIsRefreshingNewStudents } from "../../../store/reducers/dashboard";

class Home extends Component {
  constructor(props) {
    super(props);
	}
	
	static async getInitialProps ({ reduxStore }) {
		await Promise.all([
			reduxStore.dispatch(actions.fetchDashboardStats()),
			reduxStore.dispatch(actions.refreshNewStudents()),
		])
		return {

		}
	}

  state = {
    latestEnrollments: [
      {
        key: "1",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019; 3:45pm",
        name: "Sheldon Cooper"
      },
      {
        key: "2",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019; 3:45pm",
        name: "Sheldon Cooper"
      },
      {
        key: "3",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019; 3:45pm",
        name: "Sheldon Cooper"
      },
      {
        key: "4",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019; 3:45pm",
        name: "Sheldon Cooper"
      }
    ]
    // courses: []
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  refreshNewStudents = () => {
    // check if is currently refreshing, if yes skip/return
    if (!this.props.isRefreshingNewStudents) {
			this.props.refreshNewStudents()
    }
    //else refresh
  }

  render() {
    return (
      <AdminLayout headerName="Home">
        <section className="courses admin-home has-height-80">
          <div className="container mt-6">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div
                      className="card dashboard__card border-0"
                      style={{ height: "12.57rem" }}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/prof_cap.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Student count</p>
                            <h3>{this.props.stats.students_count}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div
                      className="card dashboard__card border-0"
                      style={{ height: "12.57rem" }}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/instructor_count.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Instructor count</p>
                            <h3>{this.props.stats.instructors_count}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div
                      className="card dashboard__card border-0"
                      style={{ height: "12.57rem" }}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/books.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Course count</p>
                            <h3>{this.props.stats.courses_count}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div
                      className="card dashboard__card border-0"
                      style={{ height: "12.57rem" }}
                    >
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/active-classes.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Active classes</p>
                            <h3>{this.props.stats.active_classes_count}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <LatestEnrollments
                    latestEnrollments={this.state.latestEnrollments}
                  />
                  <NewStudents
                    isRefreshingNewStudents={this.props.isRefreshingNewStudents}
                    refreshNewStudents={this.refreshNewStudents}
                    newStudents={this.props.newStudents}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = state => ({
	newStudents: getNewStudents(state),
	isRefreshingNewStudents: getIsRefreshingNewStudents(state),
	stats: state.dashboard.stats
});

export default connect(
  mapStateToProps,
  { ...actions }
)(Home);
