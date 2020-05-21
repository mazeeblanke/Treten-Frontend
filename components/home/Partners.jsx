import React from 'react'
import Slider from 'react-slick'
// import PropTypes from 'prop-types';

const Partners = ({ certifications }) => {

  const slidesToShow = (preferredSlides) => {
    return certifications.length < preferredSlides
      ? certifications.length
      : preferredSlides
  }

  const settings = {
    dots: true,
    speed: 800,
    arrows: true,
    infinite: true,
    autoplay: true,
    slidesToScroll: 4,
    slidesToShow: slidesToShow(7),
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: slidesToShow(6),
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow(5),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: slidesToShow(5),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: slidesToShow(4),
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: slidesToShow(3),
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <section className="partners">
      <div className="container">
        <h3 className="text-center partners__main-text">
          Certification Providers
        </h3>
        <div className="">
          <Slider { ...settings }>
            {
              certifications.map((certification) => (
                <div key={certification.id}>
                  <div className="is-flex has-full-height is-vcentered is-hcentered">
                    <img src={certification.bannerImage} alt={certification.company}/>
                  </div>
                </div>
              ))
            }
          </Slider>
        </div>
      </div>
    </section>
  )
}

// Partners.propTypes = {};

export default Partners
