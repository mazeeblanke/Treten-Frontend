import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAdminLayout from '../../layouts/withAdminLayout';
import { Tabs, Button, Select } from 'antd';
import EmptyState from '../../../components/shared/EmptyState';

const { TabPane } = Tabs;
const { Option } = Select;

class Resources extends Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <section className="student-resources has-full-height">
        <div className="container has-height-85">
          <div className="row">
            <div className="col-md-12 pr-6 pl-6">
              <div className="student-resources__menu-bar row justify-content-sm-between">
                <div className="col-sm-12 col-lg-3 col-md-4 mt-3">
                  <Select defaultValue="All categories" style={{ width: 182 }}>
                    <Option value="jack">Jack</Option>
                    <Option value="none">None</Option>
                    <Option value="disabled" disabled>
                      Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                  </Select>
                </div>
                <div className="col-sm-12 col-lg-3 col-md-5 offset-md-3 d-flex justify-content-md-end align-items-center mt-3">
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


          <div className="row has-full-height">
            <div className="col-md-12 pr-6 pl-6">
              <EmptyState emptyText="No resources found" />
            </div>
          </div>

        </div>
      </section>
    );
  }
}

Resources.propTypes = {

};

Resources.headerName = "Resources"

export default withAdminLayout(Resources);