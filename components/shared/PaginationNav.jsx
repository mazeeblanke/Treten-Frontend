import React from 'react'

const PaginationNav = (current, type, originalElement) => {
  if (type === 'prev') {
    return (
      <div className="ant-pagination-prev">
        <a className="ant-pagination-item-link">
          <img src="/static/images/arrow-right-grey.png" alt="arrow left" />
        </a>
      </div>
    )
  }
  if (type === 'next') {
    return (
      <div className="ant-pagination-next">
        <a className="ant-pagination-item-link">
          <img src="/static/images/arrow-left-grey.png" alt="arrow right" />
        </a>
      </div>
    )
  }
  return originalElement
}

export default PaginationNav
