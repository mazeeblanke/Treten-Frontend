import React from 'react'
import PropTypes from 'prop-types'

const dayjs = require('dayjs')

const AvailableBatchList = (props) => {
  const {
    plan,
    deliveryModes,
    selectedBatchId,
    setAvailableDate
  } = props
  return (
    <div>
      {
        plan && (
          <>
            <div className="mt-4">
              <div className="row">
                {
                  deliveryModes.map(entry => (
                    <div className="col-md-4 mt-2 mb-2" key={entry.batchId}>
                      <div
                        onClick={() => setAvailableDate(entry)}
                        className={`avaliable-date ${
                          selectedBatchId === entry.batchId ? 'selected' : ''
                        }`}
                      >
                        <p className="m-0 p-3">
                          {dayjs(entry.startDate).format('D MMM YYYY')}
                          <br></br>
                          <small>({entry.batchName})</small>
                        </p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

AvailableBatchList.propTypes = {
   plan: PropTypes.string,
   deliveryModes: PropTypes.array,
   selectedBatchId: PropTypes.number,
   setAvailableDate: PropTypes.func.isRequired,
}

export default AvailableBatchList;
