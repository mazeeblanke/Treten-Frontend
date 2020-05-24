import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tooltip } from 'antd'
import Tag from '../shared/Tag'
import TextTruncate from 'react-text-truncate'

const columns = [
  {
    title: 'Course',
    dataIndex: 'course.title',
    width: 150,
    key: 5,
    fixed: 'left',
    render: (title) => {
      return (
        <Tooltip title={title || '-'}>
          <TextTruncate
            line={1}
            text={title || '-'}
          />
        </Tooltip>
      )
    }
  },
  {
    title: 'Name',
    dataIndex: 'user.name',
    width: 100,
    key: 1
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    key: 2,
    render: Tag
  },
  {
    title: 'Date and time',
    dataIndex: 'createdAt',
    // fixed: 'right',
    key: 3,
    width: 120
  },
]

const LatestEnrollments = props => {
  const { latestEnrollments } = props
  return (
    <div className="col-md-12 col-xl-6 mb-6">
      <div style={{ height: 500 }} className="card dashboard__card border-0">
        <div className="card-body" style={{ padding: '2rem 2rem' }}>
          <h5 className="mb-4"><b>Latest enrollments</b></h5>
          <Table
            columns={columns}
            pagination={false}
            scroll={{ x: 500 }}
            dataSource={latestEnrollments}
          />
        </div>
      </div>
    </div>
  )
}

LatestEnrollments.propTypes = {
  latestEnrollments: PropTypes.array.isRequired
}

export default LatestEnrollments
