import React from 'react'
import PropTypes from 'prop-types';
// import Slider from 'react-slick'
import { Input, Select } from 'antd'
// const { Search } = Input
import * as actions from '../../store/actions'
import { connect } from 'react-redux'

const { Option } = Select;

const mainText = 'Accelerate your career with industry-leading certifications'
const subText = 'Globally recognized courses taught by industry experts focused on providing high-quality training to our students.'

class Banner extends React.Component {

  state = {
    courseOptions: []
  }

  search = (searchQuery) => {
    this.props.searchCourses({ 
      q: searchQuery,
    }).then(({ data }) => {
      this.setState({
        courseOptions: data.data
      })
    })
  }

  render () {
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
                      <Select
                        showSearch
                        size="large"
                        allowClear
                        showArrow={false}
                        onChange={e => {
                          location.href = `/courses/${e}`
                          this.setState({
                            courseOptions: []
                          })
                        }}
                        style={{ width: 430 }}
                        filterOption={false}
                        notFoundContent="No match"
                        onSearch={this.search}
                        className="has-full-width search"
                        defaultActiveFirstOption={false}
                        placeholder='What do you want to learn?'
                      >
                        {
                          this.state.courseOptions.map((option, index) => (
                            <Option key={index} value={option.slug}>
                              <div className="is-flex align-items-center justify-content-between">
                                <span
                                  title={option.title}
                                  className="ml-3"
                                  style={{ color: '#8492a6', fontSize: 13 }}>
                                  {option.title}
                                </span>
                              </div>
                            </Option>
                          ))
                        }
                      </Select>
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

}


Banner.propTypes = {
  searchCourses: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, {
  searchCourses: actions.searchCourses
})(Banner)
