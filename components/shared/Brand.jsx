import React from 'react'
import PropTypes from 'prop-types'

const Brand = (props) => {
  return (
    <a href="/">
      <div className="is-flex">
        <img className="brand__logo" src="/images/logo.png" />
        <h4 className={['brand__text', props.isWhite ? 'is-white' : ''].join(' ')}>Treten Academy</h4>
      </div>
    </a>
  )
}

Brand.propTypes = {
  isWhite: PropTypes.bool
}

export default Brand
