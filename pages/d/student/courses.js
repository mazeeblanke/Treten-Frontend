import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import EmptyState from '../../../components/shared/EmptyState';
import { Button } from 'antd';
import Display from '../../../components/shared/Display';
import Link from 'next/link';

class Courses extends Component {
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
      <section className="courses has-height-80">
        <Display if={!this.state.courses.length}>
          <div className="has-full-height">
            <EmptyState emptyText="You have not signed up for any course">
              <Button style={{ width: '195px' }} className="ml-3" size="large" type="danger">Explore course catalog</Button>
            </EmptyState>
          </div>
        </Display>
        <Display if={this.state.courses.length}>
          <div className="container mt-6">
            <div className="row">
              <div className="col-md-12 pl-6 pr-6">
                <div className="row">
                  {
                    this.state.courses.map((course) => (
                      <Link href="/d/student/course">
                        <div className="col-sm-12 col-md-6 col-lg-3 mb-5">
                          <div key={course.title}>
                            <div className="card border-0">
                              <img src={course.banner_image} className="card-img-top" alt={course.title} />
                              <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <h6 className="mb-3 mt-1">{course.type}</h6>
                                <Link href="/d/student/course">
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
    );
  }
}

Courses.propTypes = {

};

Courses.headerName = "My Courses"

export default withAdminLayout(Courses);