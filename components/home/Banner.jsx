import React from 'react'
// import PropTypes from 'prop-types';
import Slider from 'react-slick'
import { Input } from 'antd'
const { Search } = Input

const mainText = 'Accelerate your career with industry-leading certifications'
const subText = 'Consciousness extraordinary claims require extraordinary evidence permanence of the stars the only home we’ve known.'

const Banner = () => {
  return (
    <section className="banner">

        <div className="banner__wrapper">
          <div className="banner__overlay">
            <div className="container has-full-height">
              <div className="row has-full-height">
                <div className="col-sm-12 col-md-7 col-lg-5 pt-8 pb-8">
                  <div className="banner__content ">
                    <h2 className="is-white banner__main-text">{mainText}</h2>
                    <h5 className="is-smokewhite banner__sub-text">{subText}</h5>
                    <div>
                      <Search
                        className="search"
                        placeholder="What do you want to learn?"
                        enterButton="Search"
                        size="large"
                        onSearch={(q) => { location.href = `/search?q=${q}` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/static/images/bg1.png" alt="background 1" />
        </div>

    </section>
  )
}

// Banner.propTypes = {}

export default Banner
