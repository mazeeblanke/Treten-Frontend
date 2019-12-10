// import Link from 'next/link'
// import Img from 'react-image'
import Course from './Course'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import Display from '../shared/Display'
import { Popover } from 'antd'
import React, { Component } from 'react'
// import StarRatings from 'react-star-ratings'
import { Animated } from 'react-animated-css'
import CoursePopover from './CoursePopover'
// import TextTruncate from 'react-text-truncate'

const settings = {
  dots: true,
  infinite: true,
  speed: 800,
  arrows: true,
  autoplay: true,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 2,
        dots: true
      }
    },
    {
      breakpoint: 750,
      settings: {
        slidesToShow: 1.9,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.5,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

class CourseList extends Component {
  state = {
    selectedPathCourses: [],
    selectedPathName: ''
  }

  setPathCourses = ({
    courses = [],
    name: selectedPathName
  }) => {
    this.setState({
      selectedPathCourses: courses,
      selectedPathName
    })
  }

  render () {
    return (
      <>
        <Display if={!this.state.selectedPathCourses.length}>
          <section className={['courses', this.props.className].join(' ')}>
            <Display if={!!this.props.primaryHeading}>
              <h3 className="text-center courses__main-text mt-3">
                {this.props.primaryHeading}
              </h3>
            </Display>
            <div className="container">
              <Display if={!!this.props.subHeading}>
                <div className="row justify-content-center">
                  <div className={this.props.subHeadingCol}>
                    <p className="text-center courses__sub-text mb-5">
                      {this.props.subHeading}
                    </p>
                  </div>
                </div>
              </Display>
              <Animated
                animationIn="fadeIn"
                animationOut="slideInUp"
                isVisible={!this.state.selectedPathCourses.length}
              >
                <Slider {...settings}>
                  {
                    this.props.courses.map((course) => (
                      <>
                        <Display if={!course.courses}>
                          <Popover
                            placement="right"
                            key={course.id}
                            content={CoursePopover(course)}
                          >
                            <div>
                              <Course
                                cardWidth={this.props.cardWidth}
                                setPathCourses={this.setPathCourses}
                                course={course}
                              />
                            </div>
                          </Popover>
                        </Display>
                        <Display if={course.courses}>
                          <Course
                            cardWidth={this.props.cardWidth}
                            setPathCourses={this.setPathCourses}
                            course={course}
                          />
                        </Display>
                      </>
                    ))
                  }
                </Slider>
              </Animated>
            </div>
          </section>
        </Display>
        <Animated
          animationIn="bounceIn"
          animationOut="fadeOutUp"
          isVisible={!!this.state.selectedPathCourses.length}
        >
          <Display if={!!this.state.selectedPathCourses.length}>
            <div className="container">
              <div style={{
                background: '#222829',
                height: 450,
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '2px -8px 76px 0px rgba(138,138,138,1)'
              }}>
                <div className="has-full-width pr-3 pl-3 center">
                  <img
                    src="/static/images/close.png"
                    className="has-pointer-cursor"
                    onClick={() => this.setPathCourses({ courses: [], name: null })}
                    style={{
                      position: 'absolute',
                      right: 50,
                      top: 30
                    }}
                  >
                  </img>
                  <p className="text-center courses__sub-text mb-3 pt-4 is-white">
                    {this.state.selectedPathName}
                  </p>
                  <Slider {...{
                    ...settings,
                    infinite: false
                  }}>
                    {
                      this.state.selectedPathCourses.map((course) => (
                        <Popover
                          placement="right"
                          key={course.id}
                          content={CoursePopover(course)}
                        >
                          <div>
                            <Course
                              cardWidth={this.props.cardWidth}
                              setPathCourses={this.setPathCourses}
                              key={course.id}
                              course={course}
                            />
                          </div>
                        </Popover>
                      ))
                    }
                  </Slider>
                </div>
              </div>
            </div>
          </Display>
        </Animated>
      </>
    )
  }
}

CourseList.propTypes = {
  primaryHeading: PropTypes.string,
  subHeading: PropTypes.string,
  cardWidth: PropTypes.string,
  subHeadingCol: PropTypes.string,
  className: PropTypes.string,
  courses: PropTypes.array
}

CourseList.defaultProps = {
  cardWidth: '100%',
  subHeadingCol: 'col-md-5'
}

export default CourseList
