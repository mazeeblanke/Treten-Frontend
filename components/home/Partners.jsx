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
  slidesToScroll: 4
}

const Partners = () => (
  <section className="partners">
    <div className="container">
      <h3 className="text-center partners__main-text">
        Light years the only home we have ever known trillion colonies
      </h3>
      <div className="">
        <Slider {...settings}>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/cisco.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/microsoft.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/paloaltonetworks.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/Aws.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/Azure.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/python.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/Juniper_Networks.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/Fortinet.png" />
            </div>
          </div>
          <div>
            <div className="is-flex has-full-height is-vcentered is-hcentered">
              <img src="/static/images/partners/F5_Networks.png" />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  </section>
)

// Partners.propTypes = {};

export default Partners
