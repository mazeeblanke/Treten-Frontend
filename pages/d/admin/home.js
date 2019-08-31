import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import AdminLayout from '../../layouts/AdminLayout';
import EmptyState from '../../../components/shared/EmptyState';
import { Button } from 'antd';
import Display from '../../../components/shared/Display';
import Link from 'next/link';
import LatestEnrollments from '../../../components/admin/LatestEnrollments';
import NewStudents from '../../../components/admin/NewStudents';


class Home extends Component {
  constructor(props) {
    super(props);

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
    ],
    courses: [
      {
        instructor: {
          name: "Tim Cook",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course1.png"
      },
      {
        instructor: {
          name: "Tim Berners-Lee",
          profile_pic: "/static/images/instructors/instructor2.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course2.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'remote',
        banner_image: "/static/images/courses/course5.png"
      },
      {
        instructor: {
          name: "Oluwadare Michelangelo",
          profile_pic: "/static/images/instructors/instructor3.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-demand',
        banner_image: "/static/images/courses/course3.png"
      },
      {
        instructor: {
          name: "Chukwuemeka Nnadi",
          profile_pic: "/static/images/instructors/instructor4.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course4.png"
      },
      {
        instructor: {
          name: "Sharon james",
          profile_pic: "/static/images/instructors/instructor1.png"
        },
        title: "Course title goes here",
        rating: 3,
        reviews_count: 56,
        type: 'on-site',
        banner_image: "/static/images/courses/course5.png"
      },
    ],
    // courses: []
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

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
                    <div className="card dashboard__card border-0" style={{ height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/prof_cap.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Student count</p>
                            <h3>178</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card dashboard__card border-0" style={{ height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/instructor_count.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Instructor count</p>
                            <h3>9</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card dashboard__card border-0" style={{ height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/books.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Course count</p>
                            <h3>13</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-3 mb-4">
                    <div className="card dashboard__card border-0" style={{ height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/active-classes.png"></img>
                          </div>
                          <div>
                            <p className="m-0">Active classes</p>
                            <h3>6</h3>
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
                  <LatestEnrollments latestEnrollments={this.state.latestEnrollments} />
                  <NewStudents />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    );
  }
}

Home.propTypes = {

};

// Home.headerName = "Home"

export default Home;