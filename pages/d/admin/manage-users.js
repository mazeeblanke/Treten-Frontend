import AdminLayout from '../../layouts/AdminLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StarRatings from "react-star-ratings";
import { Table, Input, Button, Select, Radio, Tabs, Modal, Menu, Dropdown  } from "antd";
import InviteUsersForm from '../../../components/shared/InviteUsersForm';
import AssignInstructorsForm from '../../../components/instructor/AssignInstructorsForm';
const uuidv1 = require('uuid/v1');
const Search = Input.Search;
const { Option } = Select;
const { TabPane } = Tabs;

const users = [
  {
    key: "1",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "13",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "2",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  },
  {
    key: "20",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  },
  {
    key: "3",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "4",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "40",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "1",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  },
  {
    key: "13",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "2",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "20",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  },
  {
    key: "3",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  },
  {
    key: "4",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 0,
  },
  {
    key: "40",
    phone_number: "09056743321",
    created_at: "01/02/2019 3:45am",
    name: "Sheldon Cooper",
    email: 'sheldoncooper@outlook.com',
    status: 1,
  }
]



class ManageUsers extends Component {
  constructor(props) {
    super(props);
    // this.columns = columns
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
      fixed: true,
      key: 12,
    },
    {
      title: "Email address",
      dataIndex: "email",
      width: 150,
      key: 112,
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      width: 180,
      key: 1112,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 38,
      width: 150,
      render: (status) => {
        return (
          status
            ? <div className="tag is-success">Active</div>
            : <div className="tag is-grey">Not active</div>
        )
      }
    },
    {
      title: "Sign up date and time",
      dataIndex: "created_at",
      width: 190,
      key: 332,
    },
    {
      title: 'Action',
      key: 'operation',
      width: 90,
      render: (row) => {
        let menu = (
          <Menu>
            <Menu.Item>
              <a onClick={() => this.toggleAssignInstructorForm(true, row)}>Assign course</a>
            </Menu.Item>
            <Menu.Item>
              <a onClick={() => {}}>Deactivate account</a>
            </Menu.Item>
          </Menu>
        );
        return (
          <div>
            <Dropdown overlay={menu} placement="bottomLeft">
              <Button>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="mr-3">Action</span>
                  <img src="/static/images/select.png" />
                </div>
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  toggleAssignInstructorForm = (visibility, row) => {
    let instructors = { ...this.state.instructors };
    instructors.isShowingAssignInstructorForm = visibility;
    instructors.assignInstructorForm.user = row;
    this.setState({
      ...this.state,
      instructors
    });
  }

  paginationOptions = (tab) => {
    return {
      showTotal: (total, range) => {
        if (this.state[tab].feedback !== `Showing ${range[0]} - ${range[1]} of ${total}`) {
          const content = { ...this.state[tab] }
          content.feedback = `Showing ${range[0]} - ${range[1]} of ${total}`;
          this.setState({
            [tab]: content
          }, () => console.log(this.state))
        }
      },
      pageSize: 5,
      itemRender: (current, type, originalElement) => {
        if (type === 'prev') {
          return (
            <div className="ant-pagination-prev">
              <a className="ant-pagination-item-link">
                <img src="/static/images/arrow-right-grey.png" />
              </a>
            </div>
          )
        } if (type === 'next') {
          return (
            <div className="ant-pagination-next">
              <a className="ant-pagination-item-link">
                <img src="/static/images/arrow-left-grey.png" />
              </a>
            </div>
          )
        }
        return originalElement;
      }
    }
  }

  state = {
    activeTab: 'students',
    students: {
      all: users,
      isShowingAddNewForm: false,
      paginationOptions: this.paginationOptions('students'),
      feedback: ''
    },
    instructors: {
      all: users,
      isShowingAddNewForm: false,
      isShowingAssignInstructorForm: false,
      paginationOptions: this.paginationOptions('instructors'),
      feedback: '',
      assignInstructorForm: {
        course: '',
        batch: '',
        user: {}
      },
      form: [
        {
          email: '',
          id: uuidv1(),
        }
      ]
    },
    admins: {
      all: users,
      isShowingAddNewForm: false,
      paginationOptions: this.paginationOptions('admins'),
      feedback: '',
      form: [
        {
          email: '',
          id: uuidv1(),
        }
      ]
    },
  }
  // componentWillMount() {

  // }

  componentDidMount() {

  }

  // componentWillReceiveProps(nextProps) {

  // }

  // shouldComponentUpdate(nextProps, nextState) {

  // }

  // componentWillUpdate(nextProps, nextState) {

  // }

  // componentDidUpdate(prevProps, prevState) {

  // }

  componentWillUnmount() {

  }

  closeModal = () => {
    let state = { ...this.state };
    state[this.state.activeTab].isShowingAddNewForm = false;
    this.setState({
      [this.state.activeTab]: state[this.state.activeTab]
    })
  }

  addNew = () => {
    let state = { ...this.state };
    state[this.state.activeTab].isShowingAddNewForm = true;

    this.setState({
      [this.state.activeTab]: state[this.state.activeTab]
    })
  }


  handleTabChange = (e) => {
    this.setState({
      activeTab: e.target.value
    })
  }

  handleSubmit = () => {

  }

  setForm = (payload, index) => {
    const { activeTab } = this.state;
    let form = [ ...this.state[activeTab].form ];
    form[index] = {
      ...form[index],
      ...payload
    }

    this.setState({
      [activeTab]: {
        ...this.state[activeTab],
        form
      }
    })
  }

  setAssignInstructorForm = (value, key) => {
    let form = { ...this.state.instructors.assignInstructorForm };
    let assignInstructorForm = {
      ...form,
      [key]: value
    }

    // console.log(key, value, assignInstructorForm);

    this.setState({
      instructors: {
        ...this.state.instructors,
        assignInstructorForm
      }
    }, () => console.log(this.state))
  }

  add = () => {
    const { activeTab } = this.state;
    let form = [ ...this.state[activeTab].form ];
    form.push({
      email: '',
      id: uuidv1()
    });

    this.setState({
      [activeTab]: {
        ...this.state[activeTab],
        form
      }
    })
  }

  usersView = () => {
    const { activeTab } = this.state;
    return (
      <section className="manage-users">
        <AdminLayout headerName="Manage Users">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 pt-5 pb-5">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 mb-3 col-lg-6 col-sm-12">
                      <Radio.Group onChange={this.handleTabChange} value={activeTab} size="large" buttonStyle="solid">
                        <Radio.Button value="students">Students</Radio.Button>
                        <Radio.Button value="instructors">Instructors</Radio.Button>
                        <Radio.Button value="admins">Admins</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="col-md-12 col-lg-6 col-sm-12 flex-xs-column flex-sm-row justify-content-lg-end d-flex">
                      <Search
                        className="mr-3 mb-3"
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: '180px', height: '42px' }}
                      />
                      {
                        activeTab !== 'students'
                          ? <Button
                              onClick={this.addNew}
                              className="mr-3 mb-3"
                              style={{ height: '42px', width: '105px' }}
                              type="primary"
                              ghost
                            >Add new</Button>
                          : null
                      }
                      <Button className="mb-3" type="danger" style={{ width: '126px', height: '40px' }} >
                        <span>Download</span>
                        <img className="ml-2" src="/static/images/down.png" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="has-full-height has-white-bg">
            <div className="container">
              <div className="row pl-6 pr-6 pt-5">
                <div className="col-md-12">
                  <div className="has-white-bg" style={{ height: '60px' }}>
                    <p className="mb-0">{this.state[activeTab].feedback}</p>
                  </div>
                </div>
              </div>
              <div className="row pl-6 pr-6">
                <div className="col-md-12">
                  <Tabs
                    activeKey={activeTab}
                  >
                    <TabPane tab="students" key="students">
                      <Table
                        scroll={{ x: 1100 }}
                        pagination={this.state.students.paginationOptions}
                        columns={this.columns}
                        dataSource={this.state.students.all}
                      />
                    </TabPane>
                    <TabPane tab="insructors" key="instructors">
                      <Table
                        scroll={{ x: 1100 }}
                        pagination={this.state.instructors.paginationOptions}
                        columns={this.columns}
                        dataSource={this.state.instructors.all}
                      />
                    </TabPane>
                    <TabPane tab="admins" key="admins">
                      <Table
                        scroll={{ x: 1100 }}
                        pagination={this.state.admins.paginationOptions}
                        columns={this.columns}
                        dataSource={this.state.admins.all}
                      />
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    );
  }

  render() {
    const { activeTab } = this.state;
    return (
      <>
        {this.usersView()}
        { this.state[activeTab].isShowingAddNewForm && (
          <Modal
            footer={null}
            wrapClassName="add-new-form-modal"
            width="464px"
            height="314px"
            centered
            onCancel={this.closeModal}
            visible={this.state[activeTab].isShowingAddNewForm}
            title={
              <div className="d-flex align-items-center justify-content-between">
                <h5>Add new {activeTab}</h5>
              </div>
            }
          >
            <InviteUsersForm
              activeTab={activeTab}
              form={this.state[activeTab].form}
              setForm={this.setForm}
              handleSubmit={this.handleSubmit}
              add={this.add}
            />
          </Modal>
        )}
        { this.state.instructors.isShowingAssignInstructorForm && (
          <Modal
            footer={null}
            wrapClassName="assign-instructor-form-modal"
            width="464px"
            height="314px"
            centered
            onCancel={() => this.toggleAssignInstructorForm(false) }
            visible={this.state.instructors.isShowingAssignInstructorForm}
            title={
              <div className="d-flex align-items-center justify-content-between">
                <h5>Assign instructor to course</h5>
              </div>
            }
          >
            <AssignInstructorsForm
              form={this.state.instructors.assignInstructorForm}
              handleSubmit={this.handleSubmit}
              setAssignInstructorForm={this.setAssignInstructorForm}
            />
          </Modal>
        )}
      </>
    )
  }
}

ManageUsers.propTypes = {

};

export default ManageUsers;