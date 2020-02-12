import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Display from './Display'

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 600,
  arrows: true,
  autoplay: true,
  slidesToShow: 3.1,
  slidesToScroll: 1,
  // centerPadding: '100px'
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 3.9,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 1439,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 3,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2.2,
        slidesToScroll: 2,
        dots: true
      }
    },
    {
      breakpoint: 998,
      settings: {
        slidesToShow: 1.8,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 798,
      settings: {
        slidesToShow: 1.3,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 2,
        // initialSlide: 2
      }
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.1,
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

const Testimonials = (props) => {
  const { mainText, subText, testimonials } = props
  return (
    <section className="testimonials mt-5 pb-5">
      <Display if={!!mainText}>
        <h3 className="text-center testimonials__main-text pt-5">
          {mainText}
        </h3>
      </Display>
      <div className="container">
        <Display if={!!subText}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <p className="text-center testimonials__sub-text pb-4">
                {subText}
              </p>
            </div>
          </div>
        </Display>
        <Slider {...sliderSettings}>
          {
            testimonials.map((testimonial) => (
              <div className="testimonial" key={testimonial.id}>
                <div className="card border-0" style={{ width: '100%', height: 280 }}>
                  <div className="card-body">
                    <p className="card-title testimonial__text mb-0 pb-0">{testimonial.reviewText}</p>
                    <div className="d-flex align-items-end mt-3 pt-2 mb-3">
                      <img className="mr-2 h45 rounded-circle" src={testimonial.enrollee ? testimonial.enrollee.profilePic : testimonial.profilePic} />
                      <div className="d-flex justify-content-center flex-column">
                        <h6 className="testimonial__title mb-0 pb-0">{testimonial.enrollee ? testimonial.enrollee.name : testimonial.name}</h6>
                        <p className="mb-0">{testimonial.enrollee ? testimonial.enrollee.title : testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </Slider>
      </div>
    </section>
  )
}

Testimonials.propTypes = {
  testimonials: PropTypes.array,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
}

export default Testimonials
