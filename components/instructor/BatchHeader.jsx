import React from 'react'
import PropTypes from 'prop-types'

const BatchHeader = (props) => {
  const { batch } = props
  return (
    <div>
      <h6 className="text-capitalize">{batch.batchName}</h6>
      <p className="font-weight-light">{batch.friendlyCommencementDate}</p>
    </div>
  )
}

BatchHeader.propTypes = {
  batch: PropTypes.object.isRequired
}

export default BatchHeader
