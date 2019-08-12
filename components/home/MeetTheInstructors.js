import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import Instructor from '../instructor/Instructor';

let sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  arrows: false,
  slidesToShow: 4.2,
  slidesToScroll: 3,
  // centerPadding: '100px',
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

class MeetTheInstructors extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {};
  }

  render() {
    return (
      <section className="instructors mt-2 pb-5">
        <h3 className="text-center instructors__main-text pt-5">
          Meet our Instructors
        </h3>
        <div className="container mb-7">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-center instructors__sub-text pb-4">
                Our facilitators are successful Industry experts who not only possess commendable
                years of experience but are also amongst the top 60,000+ recognized CCIE
                experts across the globe.
              </p>
            </div>
          </div>
          <Slider { ...sliderSettings }>
            {
              this.props.instructors.map((instructor) => (
                <Instructor key={instructor.title} width="100%" { ...instructor } />
              ))
            }
          </Slider>
        </div>
      </section>
    );
  }
}

MeetTheInstructors.propTypes = {
  instructors: PropTypes.array
};

export default MeetTheInstructors;
