import Display from "../../components/shared/Display";
const { Header, Sider, Content } = Layout;
import { ROUTES } from "../../lib/helpers";
import React, { Component } from "react";
import { withRouter } from "next/router";
import { connect } from 'react-redux'
import { Layout, Menu } from "antd";
import Link from 'next/link';
import AdminLayout from './AdminLayout';

export default Page => {

  class withAdminLayout extends Component {
    render () {
      return (
        <AdminLayout headerName={Page.headerName} backText={Page.backText}>
          <Page className="mt-5" {...this.props} />
        </AdminLayout>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.user
    }
  }

  return withRouter(connect(mapStateToProps, {})(
    withAdminLayout
  ));
};
