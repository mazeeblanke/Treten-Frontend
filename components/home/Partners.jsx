import React from 'react'
import Slider from 'react-slick'
// import PropTypes from 'prop-types';

const settings = {
  dots: true,
  variableWidth: true,
  infinite: true,
  speed: 800,
  arrows: true,
  autoplay: true,
  // slidesToShow: 4.33,
  slidesToScroll: 2
}

const Partners = ({ certifications }) => (
  <section className="partners">
    <div className="container">
      <h3 className="text-center partners__main-text">
        Light years the only home we have ever known trillion colonies
      </h3>
      <div className="">
        <Slider {...settings}>
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

// Partners.propTypes = {};

export default Partners
