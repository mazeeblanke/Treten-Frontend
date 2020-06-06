import PropTypes from 'prop-types'
import Slider from 'react-slick'
import React from 'react'

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  arrows: true,
  slidesToShow: 4,
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

const MeetTeam = props => {
  const { teamMembers } = props
  const {
    dots,
    infinite,
    speed,
    arrows,
    slidesToShow,
    slidesToScroll
  } = settings
  return (
    <section className="aboutus-meetteam pb-9 mt-3 has-grey-bg">
      <div className="container pb-4">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-9 align-items-center d-flex flex-column">
            <h3 className="features__main-text mb-3">
              Meet our Team
            </h3>
          </div>
        </div>
      </div>
      <div className="container">
        <Slider
          {...settings}
        >
          {
            teamMembers.map((teamMember) => (
              <div key={teamMember.fullname}>
                <div className="card border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img className="rounded-circle mt-3" src={teamMember.avatar} alt={teamMember.name} />
                    </div>
                    <h6 className="card-title mb-0 mt-4">{teamMember.name}</h6>
                    <p className="text-center mt-2 mb-6">{teamMember.role}</p>
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

MeetTeam.propTypes = {
  teamMembers: PropTypes.object.isRequired
}

export default MeetTeam
