import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import StarRatings from "react-star-ratings";
import Display from '../shared/Display';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  arrows: false,
  slidesToShow: 4.5,
  slidesToScroll: 3,
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

class Courses extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    return (
      <section className={[ 'courses', this.props.className ].join(' ')}>
        <Display if={this.props.primaryHeading}>
          <h3 className="text-center courses__main-text mt-3">
            { this.props.primaryHeading }
          </h3>
        </Display>
        <div className="container">
          <Display if={this.props.subHeading}>
            <div className="row justify-content-center">
              <div className={this.props.subHeadingCol}>
                <p className="text-center courses__sub-text mb-5">
                  { this.props.subHeading }
                </p>
              </div>
            </div>
          </Display>
          <Slider { ...settings }>
            {
              this.props.courses.map((course) => (
                <div key={course.title}>
                  <div class="card border-0" style={{ width: this.props.cardWidth }}>
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
                </div>
              ))
            }
          </Slider>
        </div>
      </section>
    );
  }
}

Courses.propTypes = {
  primaryHeading: PropTypes.string,
  subHeading: PropTypes.string,
  cardWidth: PropTypes.string,
  subHeadingCol: PropTypes.string,
  courses: PropTypes.array
};

Courses.defaultProps = {
  cardWidth: '100%',
  subHeadingCol: 'col-md-5'
}

export default Courses
