import React from 'react'
import PropTypes from 'prop-types'

const LearningMode = (props) => {
  const {
    availableModesOfDelivery,
    classTitle,
    selected,
    setPlan,
    type
  } = props
  const active = type in availableModesOfDelivery
  const classes = [
    !active ? 'learning-mode--inactive' : '',
    selected ? 'selected' : '',
    'learning-mode',
    'justify-content-center',
    'flex-column',
    'd-flex', 
    'plan', 
    'mt-2',
    'mb-2',
    'p-3'
  ].join(' ')
  const modeOfDelivery = availableModesOfDelivery[type] || []
  return (
    <div
      onClick={() => active && setPlan(type)}
      className={classes}
    >
      <h6 className="fw-400">{classTitle}</h6>
      <img className="mt-3" style={{width: '50px'}} src={`/images/${type}.svg`} />
      <h3 className="mt-3">
        { 
          modeOfDelivery.length 
            ? <b>N{modeOfDelivery[0].price}</b>
            : '--'
        }
      </h3>
    </div>
  )
}

LearningMode.propTypes = {
  availableModesOfDelivery: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  classTitle: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  setPlan: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default LearningMode