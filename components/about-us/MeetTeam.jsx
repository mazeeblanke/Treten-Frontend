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
            <h3 className="features__main-text">
              Meet our Team
            </h3>
            <p className="lh-30 mb-3 text-center pl-5 lr-5">
              Flatland culture star stuff harvesting star light two ghostly white figures
              in coveralls and helmets are soflty dancing vanquish the impossible invent the universe.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <Slider
          dots={dots}
          speed={speed}
          arrows={arrows}
          infinite={infinite}
          slidesToShow={slidesToShow}
          slidesToScroll={slidesToScroll}
        >
          {
            teamMembers.map((teamMember) => (
              <div key={teamMember.fullname}>
                <div className="card border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-center">
                      <img className="rounded-circle mt-3" src={teamMember.profile_pic} alt={teamMember.fullname} />
                    </div>
                    <h6 className="card-title mb-0 mt-4">{teamMember.fullname}</h6>
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