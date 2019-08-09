import { Tabs, Button, Select } from 'antd';
import React, { Component } from 'react';
import StarRatings from "react-star-ratings";
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import withMasterLayout from '../pages/layouts/withMasterLayout';
import Footer from '../components/shared/Footer';
import Link from 'next/link';

const { TabPane } = Tabs;
const { Option } = Select;

const operations = (
  <div>
    <span className="mr-3">
      <b>Sort By:</b>
    </span>
    <Select defaultValue="none" style={{ width: 120 }}>
      <Option value="jack">Jack</Option>
      <Option value="none">None</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
  </div>
);


class Courses extends Component {

  static async getInitialProps (ctx) {
    // const isServer = !!req
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    return {}
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
        banner_image: "/static/images/courses/course5.png"
      },
    ],
  }

  componentDidMount () {
  }

  render () {
    return (
      <>
        <section className="has-grey-bg has-full-height">
          <div className="container">
            <h3 className="text-center pt-8 courses__main-text">
              Courses
            </h3>
            <div className="row justify-content-center mb-5">
              <div className="col-md-7 pl-4 pr-4">
                <p className="lh-30 fs-16 text-center">
                  Flatland culture star stuff harvesting star light two ghostly white figures in coveralls and helmets are soflty dancing vanquish the impossible invent the universe.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="courses has-white-bg pt-4 mb-8">
          <hr />
          <div className="container">
            <Tabs  tabBarExtraContent={operations}>
              <TabPane tab="All courses" key="1">
                  <div className="row mt-6">
                    {
                      this.state.courses.map((course) => (
                        <div className="col-sm-12 col-md-3 mb-5" key={course.title}>
                          <Link href="/course">
                            <div class="card border-0">
                              <img src={course.banner_image} class="card-img-top" alt={course.title} />
                              <div class="card-body">
                                <h5 class="card-title">{course.title}</h5>
                                <StarRatings
                                  starDimension="15px"
                                  starSpacing="3px"
                                  rating={course.rating}
                                  starRatedColor="#E12828"
                                  changeRating={() => {}}
                                  numberOfStars={5}
                                  name='rating'
                                />
                                <div className="is-flex is-vcentered mt-2">
                                  <img className="mr-2 h28 rounded-circle" src={course.instructor.profile_pic} />
                                  <span>{course.instructor.name}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      ))
                    }
                  </div>
              </TabPane>
              <TabPane tab="Associate level" key="2">
                Content of tab 2
              </TabPane>
              <TabPane tab="Professional level" key="3">
                Content of tab 3
              </TabPane>
              <TabPane tab="Expert level" key="3">
                Content of tab 3
              </TabPane>
              <TabPane tab="Bootcamps" key="3">
                Content of tab 3
              </TabPane>
            </Tabs>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // user: getUser(state),
  }
}

export default connect(mapStateToProps, actions)(withMasterLayout(Courses));