import React from 'react'
import dynamic from 'next/dynamic'
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'
import Display from '../shared/Display'
import TextTruncate from 'react-text-truncate'
import { Tooltip } from 'antd'
const Skeleton = dynamic(() => import('react-loading-skeleton'), {
  ssr: false
})

const Resource = (props) => {
  const { isLoading, resource, className } = props
  return (
    <div className={className}>
      <div style={{ height: '150px' }} className="card border-0">
        <div className="card-body">
          <h6 className="card-title mt-3 mb-2 pb-0 text-capitalize">
            <Display if={!isLoading}>
              <Tooltip title={resource.title}>
                <TextTruncate
                  line={2}
                  text={resource.title}
                />
              </Tooltip>
            </Display>
            <Display if={isLoading}>
              <Skeleton width={120} />
            </Display>
          </h6>
          <small>
            <Display if={!isLoading}>
              {resource.summary}
            </Display>
            <Display if={isLoading}>
              <Skeleton height="5" width={70} />
            </Display>
          </small>
          <Display if={!isLoading}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={resource.downloadLink}
              className="mt-2 d-flex align-items-center"
            >
              <b className="mr-1">Download</b>
              <img alt="arrow right" src="/images/arrow-right.png" />
            </a>
          </Display>
          <Display if={isLoading}>
            <br></br>
            <Skeleton height="1" width={40} />
          </Display>
        </div>
      </div>
    </div>
  )
}

Resource.propTypes = {
  resource: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    downloadLink: PropTypes.string
  }),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  // downloadResource: PropTypes.func
}

Resource.defaultProps = {
  isLoading: false
}

export default Resource
