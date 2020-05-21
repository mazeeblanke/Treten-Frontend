import React from 'react'
import PropTypes from 'prop-types'

const BroadcastFormModalTitle = (props) => {
  // const { user } = props
  return (
    <div className="d-flex align-items-center justify-content-between">
      <h5>
        New broadcast message
      </h5>
    </div>
  )
}

BroadcastFormModalTitle.propTypes = {
  user: PropTypes.object.isRequired
}

export default BroadcastFormModalTitle
