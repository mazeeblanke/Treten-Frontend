import React from 'react'
import PropTypes from 'prop-types'

const Display = (props) => {
  return (
    <>
      {
        props.if
          ? (props.children)
          : null
      }
    </>
  )
}

Display.propTypes = {
  if: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Display
