import React from 'react'
import PropTypes from 'prop-types'
import { parsedPaginationTotalText } from '../../../lib/helpers'

const PaginationStatus = (props) => {
  const {
    pagination
  } = props
  return (
    <div className="row pl-6 pr-6 pt-5">
      <div className="col-md-12">
        <div className="has-white-bg" style={{ height: '60px' }}>
          <p className="mb-0">
            {parsedPaginationTotalText(pagination)}
          </p>
        </div>
      </div>
    </div>
  )
}

PaginationStatus.propTypes = {
  pagination: PropTypes.object.isRequired
}

export default PaginationStatus
