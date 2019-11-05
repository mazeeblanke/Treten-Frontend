import AdminLayout from "../../layouts/AdminLayout";
import React, { Component } from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import {
  Table,
  Input,
  Button,
  Select,
  Radio,
  Tabs,
  Modal,
  Menu,
  Dropdown
} from "antd";
import InviteUsersForm from "../../../components/shared/InviteUsersForm";
import AssignInstructorsForm from "../../../components/instructor/AssignInstructorsForm";
const uuidv1 = require("uuid/v1");
const Search = Input.Search;
const { Option } = Select;
const { TabPane } = Tabs;
import capitalize from "capitalize";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import { parsedPaginationTotalText } from "../../../lib/helpers";

class ManageUsers extends Component {

  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchInstructors()),
      reduxStore.dispatch(actions.fetchStudents())
    ]);
    return {};
  }

  constructor(props) {
    super(props);
    this.csvDownloadRef = React.createRef();
  }

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 190,
      fixed: true,
      key: 12
    },
    {
      title: "Email address",
      dataIndex: "email",
      width: 150,
      key: 112
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      width: 180,
      key: 1112
    },
    {
      title: "Status",
      dataIndex: "status",
      key: 38,
      width: 150,
      render: status => {
        return status === "active" ? (
          <div className="tag is-success">Active</div>
        ) : (
          <div className="tag is-grey">Not active</div>
        );
      }
    },
    {
      title: "Sign up date and time",
      dataIndex: "created_at",
      width: 190,
      key: 332
    },
    {
      title: "Action",
      key: "operation",
      width: 90,
      render: row => {
        let menu = (
          <Menu>
            <Menu.Item>
              <a onClick={() => this.toggleAssignInstructorForm(true, row)}>
                Assign course
              </a>
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
      }
    }
  ];

  toggleAssignInstructorForm = (visibility, row) => {
    this.props.setAddUsersModal({
      payload: false,
      userType: this.state.activeTab
    });
  };

  state = {
    activeTab: "students",
    loadingCSV: false,
    csvData: [],
    searchQuery: ''
  };

  // componentDidMount() {
  //   this.props.fetchInstructors();
  //   this.props.fetchStudents();
  // }

  componentWillUnmount() {}

  // closeModal = () => {
  //   let state = { ...this.state };
  //   state[this.state.activeTab].isShowingAddNewForm = false;
  //   this.setState({
  //     [this.state.activeTab]: state[this.state.activeTab]
  //   })
  // }

  setAddNewFormVisibility = (visibility = true) => {
    this.props.setAddUsersModal({
      payload: visibility,
      userType: this.state.activeTab
    });
  };

  handleTabChange = e => {
    this.setState({
      activeTab: e.target.value
    });
  };

  handleSubmit = () => {};

  // setForm = (payload, index) => {
  //   const { activeTab } = this.state;
  //   let form = [...this.state[activeTab].form];
  //   form[index] = {
  //     ...form[index],
  //     ...payload
  //   }

  //   this.setState({
  //     [activeTab]: {
  //       ...this.state[activeTab],
  //       form
  //     }
  //   })
  // }

  setAssignInstructorForm = (value, key) => {
    let form = { ...this.state.instructors.assignInstructorForm };
    let assignInstructorForm = {
      ...form,
      [key]: value
    };

    this.setState(
      {
        instructors: {
          ...this.state.instructors,
          assignInstructorForm
        }
      },
      () => console.log(this.state)
    );
  };

  add = () => {
    // const { activeTab } = this.state;
    // let form = [...this.state[activeTab].form];
    // form.push({
    //   email: '',
    //   id: uuidv1()
    // });
    // this.setState({
    //   [activeTab]: {
    //     ...this.state[activeTab],
    //     form
    //   }
    // })
  };

  // showParsedTotal = parsedPaginationTotalText(pagination);

  downloadCSV = () => {
    this.setState({
      loadingCSV: true
    });

    this.props.downloadCSV(this.state.activeTab).then(res => {
      this.setState({
        loadingCSV: false,
        csvData: res
      });

      this.csvDownloadRef.current.link.click();
    }).catch(() => {
      this.setState({
        loadingCSV: false
      });
    })
  };

  handleTableChange = (pagination, type) => {
    this.props[`fetch${type}`]({
      page: pagination.current,
      q: this.state.searchQuery
    });
  };

  search = q => {
    this.setState({ searchQuery: q })
    this.props[`fetch${capitalize(this.state.activeTab)}`]({
      q
    });
  };

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
                      <Radio.Group
                        onChange={this.handleTabChange}
                        value={activeTab}
                        size="large"
                        buttonStyle="solid"
                      >
                        <Radio.Button value="students">Students</Radio.Button>
                        <Radio.Button value="instructors">
                          Instructors
                        </Radio.Button>
                        <Radio.Button value="admins">Admins</Radio.Button>
                      </Radio.Group>
                    </div>
                    <div className="col-md-12 col-lg-6 col-sm-12 flex-xs-column flex-sm-row justify-content-lg-end d-flex">
                      <Search
                        className="mr-3 mb-3"
                        placeholder="Search"
                        onSearch={value => this.search(value)}
                        onChange={e => this.search(e.target.value)}
                        style={{ width: "180px", height: "42px" }}
                      />
                      {activeTab !== "students" ? (
                        <Button
                          onClick={() => this.setAddNewFormVisibility()}
                          className="mr-3 mb-3"
                          style={{ height: "42px", width: "105px" }}
                          type="primary"
                          ghost
                        >
                          Add new
                        </Button>
                      ) : null}
                      <Button
                        loading={this.state.loadingCSV}
                        onClick={this.downloadCSV}
                        className="mb-3"
                        type="danger"
                        style={{ width: "126px", height: "40px" }}
                      >
                        <span>Download</span>
                        <img className="ml-2" src="/static/images/down.png" />
                      </Button>
                      {
                        <CSVLink
                          ref={this.csvDownloadRef}
                          data={this.state.csvData}
                          filename={`${this.state.activeTab}.csv`}
                          target="_blank"
                          style={{ display: "none" }}
                        >
                          {" "}
                          Download
                        </CSVLink>
                      }
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
                  <div className="has-white-bg" style={{ height: "60px" }}>
                    <p className="mb-0">
                      {parsedPaginationTotalText(this.props[activeTab].pagination)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row pl-6 pr-6">
                <div className="col-md-12">
                  <Tabs activeKey={activeTab}>
                    <TabPane tab="students" key="students">
                      <Table
                        rowKey="id"
                        loading={this.props.students.isLoading}
                        scroll={{ x: 1100 }}
                        pagination={this.props.students.pagination}
                        columns={this.columns}
                        dataSource={this.props.students.all}
                        onChange={pagination =>
                          this.handleTableChange(pagination, "Students")
                        }
                      />
                    </TabPane>
                    <TabPane tab="insructors" key="instructors">
                      <Table
                        rowKey="id"
                        loading={this.props.instructors.isLoading}
                        scroll={{ x: 1100 }}
                        pagination={this.props.instructors.pagination}
                        columns={this.columns}
                        dataSource={this.props.instructors.all}
                        onChange={pagination =>
                          this.handleTableChange(pagination, "Instructors")
                        }
                      />
                    </TabPane>
                    <TabPane tab="admins" key="admins">
                      {/* <Table
                        scroll={{ x: 1100 }}
                        pagination={this.state.admins.paginationOptions}
                        columns={this.columns}
                        dataSource={this.state.admins.all}
                      /> */}
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    );
  };

  render() {
    const { activeTab } = this.props;
    return (
      <>
        {this.usersView()}
        {/* { this.props[activeTab].isShowingAddNewForm && (
          <Modal
            footer={null}
            wrapClassName="add-new-form-modal"
            width="464px"
            height="314px"
            centered
            onCancel={this.closeModal}
            visible={this.props[activeTab].isShowingAddNewForm}
            title={
              <div className="d-flex align-items-center justify-content-between">
                <h5>Add new {activeTab}</h5>
              </div>
            }
          >
            <InviteUsersForm
              activeTab={activeTab}
              form={this.props[activeTab].form}
              setForm={this.setForm}
              handleSubmit={this.handleSubmit}
              add={this.add}
            />
          </Modal>
        )} */}
        {this.props.instructors.isShowingAddNewForm && (
          <Modal
            footer={null}
            wrapClassName="assign-instructor-form-modal"
            width="464px"
            height="314px"
            centered
            onCancel={() => this.setAddNewFormVisibility(false)}
            visible={this.props.instructors.isShowingAddNewForm}
            title={
              <div className="d-flex align-items-center justify-content-between">
                <h5>Assign instructor to course</h5>
              </div>
            }
          >
            <AssignInstructorsForm
              form={this.props.instructors.assignInstructorForm}
              handleSubmit={this.handleSubmit}
              setAssignInstructorForm={this.setAssignInstructorForm}
            />
          </Modal>
        )}
      </>
    );
  }
}

ManageUsers.propTypes = {};

const mapStateToProps = state => {
  return {
    instructors: {
      ...state.admin.manageUsers.instructors,
      all: state.admin.manageUsers.instructors.byIds.map(i => {
        return state.admin.manageUsers.instructors.all[i];
      })
    },
    students: {
      ...state.admin.manageUsers.students,
      all: state.admin.manageUsers.students.byIds.map(i => {
        return state.admin.manageUsers.students.all[i];
      })
    }
  };
};

export default connect(
  mapStateToProps,
  { ...actions }
)(ManageUsers);
