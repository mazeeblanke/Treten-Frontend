import Display from "../../components/shared/Display";
const { Header, Sider, Content } = Layout;
import { ROUTES } from "../../lib/constants";
import React, { Component } from "react";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import Link from "next/link";
import AdminLayout from "./AdminLayout";
const Cookies = require("js-cookie");
import Head from "next/head";
import * as actions from "../../store/actions";

export default Page => {
  class withAdminLayout extends Component {
    static async getInitialProps(ctx) {
      if (Page.getInitialProps) {
        await Page.getInitialProps(ctx);
      }
      return {};
    }

    render() {
      return (
        <AdminLayout headerName={Page.headerName} backText={Page.backText}>
          <Head>
            <meta name="csrf-token" content={Cookies.get("XSRF-TOKEN")} />
          </Head>
          <Page className="mt-5" {...this.props} />
        </AdminLayout>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  return withRouter(
    connect(
      mapStateToProps,
      {...actions}
    )(withAdminLayout)
  );
};
