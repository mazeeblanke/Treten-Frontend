import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdminLayout from '../../layouts/AdminLayout';
import { Tabs, Button, Select, Modal } from 'antd';
import EmptyState from '../../../components/shared/EmptyState';
import Display from '../../../components/shared/Display';
import { connect } from 'react-redux';
import ResourcesForm from '../../../components/shared/ResourcesForm'

const { TabPane } = Tabs;
const { Option } = Select;

class Resources extends Component {
  constructor(props) {
    super(props);

  }

  state = {
    resourcesForm: {
      title: null,
      course: null,
      file: null
    },
    isShowingAddResourcesForm: false,
    materials: [
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
      {
        title: 'Resource title goes here and if its long, the next line',
        resourceSumary: 'PDF, 45 pages. 24 MB',
        role: 'Role on the team',
      },
    ]
  }

  componentWillMount() {

  }

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

  handleSubmit = () => {

  }

  addNew = () => {
    this.setState({
      isShowingAddResourcesForm: true
    })
  }

  closeModal = () => {
    this.setState({
      isShowingAddResourcesForm: false
    })
  }

  setResourcesForm = ({ name, value}) => {
    this.setState({
      resourcesForm: {
        ...this.state.resourcesForm,
        [name]: value
      }
    }, () => console.log(this.state.resourcesForm))
  }

  renderResourcesView () {
    return (
      <AdminLayout headerName="Resources" action={
        <Display if={this.props.user.role === 'instructor' || this.props.user.role === 'admin'}>
          <Button style={{ width: '102px', height: '42px' }} type="danger" onClick={this.addNew}>Add new</Button>
        </Display>
      }>
        <section className="student-resources has-full-height">
          <div className="has-white-bg">
            <div className="container mt-5-neg">
              <div className="row has-border-bottom">
                <div className="col-md-12 pr-6 pl-6">
                  <div className="student-resources__menu-bar row justify-content-sm-between">
                    <div className="col-sm-12 col-lg-3 col-md-4 mt-4 mb-4">
                      <Select defaultValue="All categories" style={{ width: 182 }}>
                        <Option value="jack">Jack</Option>
                        <Option value="none">None</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                    <div className="col-sm-12 col-lg-4 col-md-5 offset-md-3 d-flex justify-content-md-end align-items-center mt-4 mb-4">
                      <span className="mr-3">
                        <b>Sort By:</b>
                      </span>
                      <Select defaultValue="none" style={{ width: 120 }}>
                        <Option value="jack">Jack</Option>
                        <Option value="none">None</Option>
                        <Option value="disabled" disabled>
                          Disabled
                        </Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container has-height-85">
            {!this.state.materials.length && (
              <div className="row has-full-height">
                <div className="col-md-12 pr-6 pl-6">
                  <EmptyState emptyText="No resources found" />
                </div>
              </div>
            )}

            {this.state.materials.length && (
              <div className="course-materials pt-4 mb-8">
                <div className="row">
                  <div className="col-md-12 pl-6 pr-6">
                    <div className="mt-4 row">
                      {
                        this.state.materials.map((material) => (
                          <div className="col-md-6 col-lg-4 col-xl-3 mb-4 pb-3">
                            <div className="card border-0">
                              <div className="card-body">
                                <h6 className="card-title mt-3 mb-2 pb-0">
                                  { material.title }
                                </h6>
                                <small>
                                  { material.resourceSumary }
                                </small>
                                <p className="mt-2 d-flex align-items-center">
                                  <b className="mr-1">Download</b>
                                  <img src="/static/images/arrow-right.png" />
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>
      </AdminLayout>
    );
  }

  render() {
    return (
      <>
        { this.renderResourcesView() }
        { this.state.isShowingAddResourcesForm && (
            <Modal
              footer={null}
              wrapClassName="batch-form-modal"
              width="464px"
              height="514px"
              centered
              onCancel={this.closeModal}
              visible={this.state.isShowingAddResourcesForm}
              title={
                <div className="d-flex align-items-center justify-content-between">
                  <h5>Add new resource</h5>
                </div>
              }
            >
              <ResourcesForm
                resourcesForm={this.state.resourcesForm}
                showBatchForm={this.showBatchForm}
                setResourcesForm={this.setResourcesForm}
                handleSubmit={this.handleSubmit}
              />
            </Modal>
        )}
      </>
    );
  }
}

Resources.propTypes = {

};

// Resources.headerName = "Resources"

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Resources);