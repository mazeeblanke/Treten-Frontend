import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Display from './Display'

const ExpandableBlock = props => {
  const {
    expanded: isExpanded,
    left,
    right,
    content,
    onExpanded,
    showExpandableIcon
  } = props
  const [expanded, setExpanded] = useState(isExpanded || false)

  const setExpandedState = (expanded) => {
    // console.log(onExpanded)
    onExpanded && onExpanded(expanded)
    setExpanded(expanded)
  }

  return (
    <div className="expandable-block">
      <div className="expandable-block__header d-flex justify-content-between">
        <div className='expandable-block__left'><b>{left}</b></div>
        <div onClick={() => setExpandedState(!expanded)}>
          <div className='expandable-block__right has-pointer-cursor d-flex align-items-center has-full-height'>
            <span className="mr-3 m-0">{right}</span>
            <Display if={showExpandableIcon}>
              {expanded && <img src="/images/minimize.png" />}
              {!expanded && <img src="/images/maximize.png" />}
            </Display>
          </div>
        </div>
      </div>
      <div className="expandable-block__content mt-2">
        {
          expanded && (
            <div>
              <div className="mb-3">
                {content}
              </div>
            </div>
          )
        }
        <div className="mb-3">
          <hr></hr>
        </div>
      </div>
    </div>
  )
}

ExpandableBlock.propTypes = {
  expanded: PropTypes.bool.isRequired,
  onExpanded: PropTypes.func,
  left: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  showExpandableIcon: PropTypes.bool,
  right: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

ExpandableBlock.defaultProps = {
  showExpandableIcon: true
}

export default ExpandableBlock
