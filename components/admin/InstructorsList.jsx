import React from 'react'
import PropTypes from 'prop-types'
import PaginationNav from '../shared/PaginationNav'
import { Table } from 'antd'
import Display from '../shared/Display'
import EmptyState from '../shared/EmptyState'

const InstructorsList = (props) => {
  const {
    instructors,
    handleTableChange
  } = props
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 190,
      fixed: true,
      key: 12
    },
    {
      title: 'Email address',
      dataIndex: 'email',
      width: 190,
      key: 112
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      width: 180,
      key: 1112
    },
    {
      title: 'Total assigned batches',
      dataIndex: 'totalBatches',
      width: 150,
      key: 332
    }
  ]
  return (
    <div className="mt-5 instructors-list">
      <Display if={!instructors.isLoading && !instructors.data.length}>
        <EmptyState emptyText="No instructors have been assigned to this course" />
      </Display>
      <Display if={instructors.isLoading || !!instructors.data.length}>
        <Table size="middle"
          rowKey="id"
          loading={instructors.isLoading}
          scroll={{ x: 1100 }}
          pagination={{
            total: +instructors.total,
            page: +instructors.currentPage,
            pageSize: +instructors.perPage,
            itemRender: PaginationNav
          }}
          columns={columns}
          dataSource={instructors.data}
          onChange={pagination =>
            handleTableChange(pagination)
          }
        />
      </Display>
    </div>
  )
}

InstructorsList.propTypes = {
  instructors: PropTypes.object.isRequired,
  handleTableChange: PropTypes.func.isRequired
}

export default InstructorsList
