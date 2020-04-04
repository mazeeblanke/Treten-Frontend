import {
  Table,
  Button,
  Tabs,
  Menu,
  Dropdown,
  Icon
} from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import PaginationNav from '../../shared/PaginationNav'
import Display from '../../shared/Display'
import { userIsInstructor, userIsActive } from '../../../store/reducers/user'

const { TabPane } = Tabs

const UsersList = (props) => {
  const {
    admins,
    students,
    activeTab,
    instructors,
    handleDelete,
    handleTableChange,
    handleDeactivation,
    toggleAssignInstructorForm
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
      key: 1112,
      render: phoneNumber => {
        return phoneNumber || '-'
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 38,
      width: 150,
      render: status => {
        return status === 'active' ? (
          <div className="tag is-success">Active</div>
        ) : (
          <div className="tag is-grey">Not active</div>
        )
      }
    },
    {
      title: 'Sign up date',
      dataIndex: 'createdAt',
      width: 150,
      key: 332
    },
    {
      title: 'Action',
      key: 'operation',
      width: 90,
      render: user => {
        const menu = (
          <Menu>
            <Menu.Item disabled={!userIsInstructor(user)}>
              <Display if={userIsInstructor(user)}>
                <a
                  disabled={!userIsInstructor(user)}
                  onClick={() => toggleAssignInstructorForm(true, user)}
                >
                  Assign course
                </a>
              </Display>
            </Menu.Item>
            <Menu.Item disabled={userIsActive(user)}>
              <a
                disabled={userIsActive(user)}
                onClick={() => { handleDeactivation(false, user) }}
              >
                Activate account
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                onClick={() => { handleDelete(user) }}
              >
                Delete account
              </a>
            </Menu.Item>
            <Menu.Item disabled={!userIsActive(user)}>
              <a
                disabled={!userIsActive(user)}
                onClick={() => { handleDeactivation(true, user) }}
              >
                Deactivate account
              </a>
            </Menu.Item>
          </Menu>
        )
        return (
          <div>
            <Display if={user.isEditing || user.isDeleting}>
              <Icon type="loading" />
            </Display>
            <Display if={!user.isEditing && !user.isDeleting}>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="mr-3">Action</span>
                    <img src="/static/images/select.png" />
                  </div>
                </Button>
              </Dropdown>
            </Display>
          </div>
        )
      }
    }
  ]
  return (
    <div className="row pl-6 pr-6">
      <div className="col-md-12">
        <Tabs activeKey={activeTab}>
          <TabPane tab="students" key="students">
            <Table
              rowKey="id"
              loading={students.isLoading}
              scroll={{ x: 1100 }}
              pagination={{
                ...students.pagination,
                itemRender: PaginationNav
              }}
              columns={columns}
              dataSource={students.all}
              onChange={pagination =>
                handleTableChange(pagination, 'Students')
              }
            />
          </TabPane>
          <TabPane tab="insructors" key="instructors">
            <Table
              rowKey="id"
              loading={instructors.isLoading}
              scroll={{ x: 1100 }}
              pagination={{
                ...instructors.pagination,
                itemRender: PaginationNav
              }}
              columns={columns}
              dataSource={instructors.all}
              onChange={pagination =>
                handleTableChange(pagination, 'Instructors')
              }
            />
          </TabPane>
          <TabPane tab="admins" key="admins">
            <Table
              rowKey="id"
              scroll={{ x: 1100 }}
              loading={admins.isLoading}
              pagination={{
                ...admins.pagination,
                itemRender: PaginationNav
              }}
              columns={columns}
              dataSource={admins.all}
              onChange={pagination =>
                handleTableChange(pagination, 'Admins')
              }
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

UsersList.propTypes = {
  user: PropTypes.object.isRequired,
  admins: PropTypes.object.isRequired,
  students: PropTypes.object.isRequired,
  activeTab: PropTypes.string.isRequired,
  instructors: PropTypes.object.isRequired,
  handleTableChange: PropTypes.func.isRequired,
  handleDeactivation: PropTypes.func.isRequired,
  toggleAssignInstructorForm: PropTypes.func.isRequired
}

export default UsersList
