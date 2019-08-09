import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import { Input } from 'antd';
const { Search } = Input;

const sliderSettings = {
  // dots: true,
  // // infinite: true,
  // speed: 500,
  // slidesToShow: 1,
  // slidesToScroll: 1
};


class Banner extends Component {
  render() {
    return (
      <section className="banner">
        <Slider { ...sliderSettings }>
          <div className="">
            <div className="banner__overlay">
              <div className="container has-full-height">
                <div className="row has-full-height">
                  <div className="col-sm-12 col-md-7 col-lg-5">
                    <div className="banner__content ">
                      <h2 className="is-white banner__main-text">
                        Accelerate your career with industry-leading certifications
                      </h2>
                      <h5 className="is-smokewhite banner__sub-text">
                        Consciousness extraordinary claims require extraordinary
                        evidence permanence of the stars the only home we’ve known.
                      </h5>
                      <div>
                        <Search
                          className="search"
                          placeholder="What do you want to learn?"
                          enterButton="Search"
                          size="large"
                          onSearch={value => console.log(value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img src="/static/images/bg1.png" />
          </div>
        </Slider>
      </section>
    );
  }
}

Banner.propTypes = {}

export default Banner;