import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Instructor from '../instructor/Instructor'


const MeetTheInstructors = (props) => {
  const { isLoading, instructors } = props

  const slidesToShow = (preferredSlides) => {
    return instructors.length < preferredSlides
      ? instructors.length
      : preferredSlides
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 200,
    arrows: true,
    autoplay: true,
    variableWidth: true,
    autoplaySpeed: 2000,
    slidesToShow: slidesToShow(4),
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: slidesToShow(3.5),
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: slidesToShow(3.3),
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1090,
        settings: {
          slidesToShow: slidesToShow(3.2),
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow(2.5),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: slidesToShow(2.3),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: slidesToShow(1.5),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: slidesToShow(1.5),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slidesToShow(1),
          slidesToScroll: 1
        }
      }
    ]
  }

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
        <div className="">
          <Slider {...sliderSettings}>
            {
              instructors.map((instructor) => (
                <Instructor
                  key={instructor.id}
                  isLoading={isLoading}
                  width="300px"
                  margin="auto"
                  name={instructor.name}
                  userable={instructor.userable}
                  profilePic={instructor.profilePic}
                />
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  )
}

MeetTheInstructors.propTypes = {
  instructors: PropTypes.array,
  isLoading: PropTypes.bool
}

export default MeetTheInstructors
