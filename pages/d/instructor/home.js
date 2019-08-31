import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import AdminLayout from '../../layouts/AdminLayout';
import EmptyState from '../../../components/shared/EmptyState';
import { Button } from 'antd';
import Display from '../../../components/shared/Display';
import Link from 'next/link';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  state = {
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
        <section className="courses has-height-80">
          <div className="container mt-6">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  <div className="col-md-3 mb-4">
                    <div className="card dashboard__card border-0" style={{ width: '19.214rem', height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/prof_cap.png"></img>
                          </div>
                          <div>
                            <p className="m-0">My students</p>
                            <h3>142</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card dashboard__card border-0" style={{ width: '19.214rem', height: '12.57rem' }}>
                      <div className="card-body">
                        <div className="d-flex justify-content-around align-items-center has-full-height">
                          <div>
                            <img src="/static/images/admin/books.png"></img>
                          </div>
                          <div>
                            <p className="m-0">My courses</p>
                            <h3>12</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Display if={!this.state.courses.length}>
            <div className="container has-height-80">
              <div className="row has-height-80">
                <div className="col-md-12 pl-6 pr-6 has-full-height">
                  <div className="has-full-height">
                    <EmptyState emptyText="You have not created any course yet"></EmptyState>
                  </div>
                </div>
              </div>
            </div>
          </Display>
          <Display if={this.state.courses.length}>
            <div className="container mt-2">
              <div className="row">
                <div className="col-md-12 pl-6 pr-6">
                  <h5 className="mb-3">My courses</h5>
                </div>
                <div className="col-md-12 pl-6 pr-6">
                  <div className="row">
                    {
                      this.state.courses.map((course) => (
                        <Link href="/d/instructor/course">
                          <div className="col-sm-12 col-md-6 col-lg-3 mb-5">
                            <div key={course.title}>
                              <div className="card border-0">
                                <img src={course.banner_image} className="card-img-top" alt={course.title} />
                                <div className="card-body">
                                  <h5 className="card-title">{course.title}</h5>
                                  <h6 className="mb-3 mt-1">{course.type}</h6>
                                  <Link href="/d/instructor/course">
                                    <h6>
                                      <b>View Course</b>
                                      <img className="ml-2" src="/static/images/arrow-right.png" />
                                    </h6>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </Display>
        </section>
      </AdminLayout>
    );
  }
}

Home.propTypes = {

};

// Home.headerName = "Home"

export default Home;