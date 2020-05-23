import React from 'react'
import PropTypes from 'prop-types'
import Display from '../shared/Display'
import Link from 'next/link'
import dynamic from 'next/dynamic'
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

const Instructor = props => {
  const classes = ['card text-center mb-6']
  const {
    isLoading,
    socialLinks,
    userable,
    name,
    profilePic,
    hasBorder,
    width,
    margin,
    wrapperBorder
  } = props
  hasBorder ? classes.push('has-border') : classes.push('has-box-shadow border-0')
  return (
    <div
      className={`instructor mb-5 ${wrapperBorder ? 'has-border' : ''}`}
      style={{ height: '290px', maxHeight: '290px', background: 'white', width, margin }}
    >
      <Link href={`/instructors/${userable.instructorSlug}`} >
        <div className={`${classes.join(' ')}`}>
          <Display if={!isLoading}>
            <img
              src={profilePic}
              className="rounded-circle mt-4"
              alt={name}
            />
          </Display>
          <Display if={isLoading}>
            <div className="mt-4">
              <Skeleton circle={true} height={100} width={100} />{' '}
            </div>
          </Display>
          <div className="card-body">

            <Display if={!isLoading}>
              <h5 className="card-title instructor__fullname mb-0 pb-0">
                {name}
              </h5>
            </Display>
            <Display if={isLoading}>
              <div>
                <Skeleton width={130} />
              </div>
            </Display>

            <Display if={!isLoading}>
              <h6 className="instructor__title mb-0 pb-0 text-capitalize">
                {userable.title}
              </h6>
            </Display>
            <Display if={isLoading}>
              <div>
                <Skeleton width={90} />
              </div>
            </Display>

            <Display if={!isLoading}>
              <p>{userable.qualifications}</p>
            </Display>
            <Display if={isLoading}>
              <div>
                <Skeleton width={180} />
              </div>
            </Display>

            <Display if={!!socialLinks}>
              <div className="container social-links">
                <div className="d-flex justify-content-center">
                  <img alt="linkedin inverted icon" src="/images/social/linkedin inverted.png" />
                  <img
                    alt="facebook inverted icon"
                    className=""
                    src="/images/social/facebook inverted.png"
                  />
                  <img
                    alt="twitter inverted icon"
                    className=""
                    src="/images/social/twitter inverted.png"
                  />
                </div>
              </div>
            </Display>
          </div>
        </div>
      </Link>
    </div >
  )
}

Instructor.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  socialLinks: PropTypes.object,
  userable: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  profilePic: PropTypes.string.isRequired,
  hasBorder: PropTypes.bool,
  wrapperBorder: PropTypes.bool,
}

Instructor.defaultProps = {
  hasBorder: false,
  wrapperBorder: false
}

export default Instructor
