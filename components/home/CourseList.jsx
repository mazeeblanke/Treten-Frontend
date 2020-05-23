import Course from './Course'
import { Popover } from 'antd'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import Display from '../shared/Display'
import React, { Component } from 'react'
import CoursePopover from './CoursePopover'
import { Animated } from 'react-animated-css'
// import TextTruncate from 'react-text-truncate'

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

  getSlickSettings = (courses, speedFactor) => {
    const slidesToShow = (preferredSlides) => {
      return courses.length < preferredSlides
        ? courses.length
        : preferredSlides
    }

    return {
      dots: true,
      variableWidth: true,
      infinite: true,
      speed: 900 * speedFactor,
      arrows: true,
      autoplay: false,
      slidesToShow: slidesToShow(4),
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    }

  }

  render () {
    return (
      <>
        <Display 
          if={
            !this.state.selectedPathCourses.length &&
            !!this.props.courses.length
          }>
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
                <Slider {...this.getSlickSettings(this.props.courses, this.props.speedFactor)}>
                  {
                    this.props.courses.map((course) => (
                      <div key={course.id}>
                        <Display if={!course.courses}>
                          <Popover
                            placement="right"
                            key={course.id}
                            content={CoursePopover(course)}
                            align={{
                              targetOffset: ['90%','10%'],
                              offset: [10, 10], 
                            }}
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
                        <Display if={!!course.courses}>
                          <Course
                            cardWidth={this.props.cardWidth}
                            setPathCourses={this.setPathCourses}
                            course={course}
                          />
                        </Display>
                      </div>
                    ))
                  }
                </Slider>
              </Animated>
            </div>
          </section>
        </Display>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
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
                    alt="close"
                    src="/images/close.png"
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
                  <Slider {
                    ...{ 
                      ...this.getSlickSettings(this.state.selectedPathCourses), 
                      infinite: false, 
                      autoplay: false,
                      // variableWidth: false,
                      slidesToShow: 6 
                    }}>
                    {
                      this.state.selectedPathCourses.map((course) => (
                        <Popover
                          placement="right"
                          key={course.id}
                          content={CoursePopover(course)}
                          align={{
                            targetOffset: ['90%','10%'],
                            offset: [10, 10],            // the offset sourceNode by 10px in x and 20px in y,
                          }}
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
