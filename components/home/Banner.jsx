import React from 'react'
import PropTypes from 'prop-types';
// import Slider from 'react-slick'
import { Button } from 'antd'

import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import Display from '../shared/Display';

const mainText = 'Accelerate your career with industry-leading certifications'
const subText = 'Globally recognized courses taught by industry experts focused on providing high-quality training to our students.'

class Banner extends React.Component {

  render () {
    const { user, isLoggedIn } = this.props
    return (
      <section className="banner">
        <div className="banner__wrapper">
          <div className="banner__overlay">
            <div className="container has-full-height">
              <div className="row has-full-height">
                <div className="red-gate"></div>
                <div className="col-sm-12 col-md-7 col-lg-5 pt-8 pb-8">
                  <div className="banner__content ">
                    <h2 className="is-white banner__main-text">{mainText}</h2>
                    <h5 className="is-smokewhite banner__sub-text">{subText}</h5>
                    <div>
                      {
                        isLoggedIn && <a href={
                          user.role === 'student'
                            ? '/d/student/courses'
                            : (user.role === 'admin'
                              ? '/d/admin/home'
                              : '/d/instructor/home')
                        }>
                          <Button
                            className="mr-2"
                            size="large"
                            type="danger"
                            style={{
                              width: '200px',
                              height: '56px'
                            }}
                          >
                            Go to Dashboard
                          </Button>
                        </a>
                      }
                      <Display if={!isLoggedIn}>
                        <a href={`/t/auth?redirect=${this.props.currentPath}`}>
                          <Button 
                            size="large" 
                            type="danger"
                            style={{
                              width: '200px',
                              height: '56px'
                            }}
                          >
                            Start Learning
                          </Button>
                        </a>
                      </Display>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img src="/static/images/bg1.jpg" alt="background 1" />
        </div>
      </section>
    )
  }

}


Banner.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  currentPath: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  isLoggedIn: state.auth.isLoggedIn,
})

export default connect(mapStateToProps)(Banner)
