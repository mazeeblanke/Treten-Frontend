import React, { Component } from "react";
import { Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
import Display from "../../components/shared/Display";
import { withRouter } from "next/router";
import { ROUTES } from "../../lib/helpers";
import Link from 'next/link';

export default Page => {
  class withAdminLayout extends Component {
    state = {
      collapsed: false,
      activeRoute: this.props.router.pathname
    };

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed
      });
    };

    routeChangeComplete = activeRoute => {
      this.setState({
        activeRoute
      });
    };

    componentDidMount() {
      this.props.router.events.on(
        "routeChangeComplete",
        this.routeChangeComplete
      );
    }

    componentWillUnmount() {
      this.props.router.events.off(
        "routeChangeComplete",
        this.routeChangeComplete
      );
    }

    static async getInitialProps(ctx) {
      let pageProps = {};
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      return { ...pageProps };
    }

    render() {
      return (
        <Layout id="treten" style={{ margin: "0rem" }}>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="d-flex justify-content-sm-between align-items-center sidenav-top">
              <div className="logo m-4">
                <Link href="/">
                 <img className="has-pointer-cursor" src="/static/images/admin/logo.png" />
                </Link>
              </div>

              <Display if={!this.state.collapsed}>
                <img
                  src="/static/images/menu.png"
                  className="trigger"
                  type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                  onClick={this.toggle}
                />
              </Display>
            </div>

            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[this.state.activeRoute]}

            >
              <Menu.Item
                className={` ${ this.props.router.pathname.includes('course') ? 'ant-menu-item-selected' : '' }`}
                onClick={() =>
                  this.props.router.push(ROUTES.STUDENT_DASHBOARD_COURSES)}
                key={ROUTES.STUDENT_DASHBOARD_COURSES}
              >
                <img
                  className={`mr-3`}
                  src={
                    this.props.router.pathname.includes('course')
                      ? "/static/images/admin/syllabus-red.svg"
                      : "/static/images/admin/syllabus.svg"
                  }
                />
                <span className="is-white ml-4 pl-1">My courses</span>
              </Menu.Item>
              <Menu.Item
                onClick={() =>
                  this.props.router.push(ROUTES.STUDENT_DASHBOARD_RESOURCES)}
                key={ROUTES.STUDENT_DASHBOARD_RESOURCES}
              >
                <img
                  className="mr-3"
                  src={
                    this.props.router.pathname ===
                    ROUTES.STUDENT_DASHBOARD_RESOURCES
                      ? "/static/images/admin/resources-red.svg"
                      : "/static/images/admin/resources.svg"
                  }
                />
                <span className="is-white ml-4 pl-1">Resources</span>
              </Menu.Item>
              <Menu.Item
               onClick={ () => this.props.router.push(ROUTES.STUDENT_DASHBOARD_NOTIFICATIONS)}
               key={ROUTES.STUDENT_DASHBOARD_NOTIFICATIONS}>
                <img
                  className="mr-3"
                  src={
                    this.props.router.pathname ===
                    ROUTES.STUDENT_DASHBOARD_NOTIFICATIONS
                      ? "/static/images/admin/notifications-red.svg"
                      : "/static/images/admin/notifications.svg"
                  }
                />
                <span className="is-white ml-4 pl-1">Notifications</span>
              </Menu.Item>
              <Menu.Item
               onClick={ () => this.props.router.push(ROUTES.STUDENT_DASHBOARD_MESSAGES)}
               key={ROUTES.STUDENT_DASHBOARD_MESSAGES}>
                <img
                  className="mr-3"
                  src={
                    this.props.router.pathname ===
                    ROUTES.STUDENT_DASHBOARD_MESSAGES
                      ? "/static/images/admin/chat-red.svg"
                      : "/static/images/admin/chat.svg"
                  }
                />
                <span className="is-white ml-4 pl-1">Messages</span>
              </Menu.Item>
              <Menu.Item className="mt-15" key="6">
                <img className="mr-3" src="/static/images/admin/catalog.svg" />
                <span className="is-white ml-4 pl-1">Course catalog</span>
              </Menu.Item>
              <Menu.Item
                className={` ${ this.props.router.pathname.includes('profile') ? 'ant-menu-item-selected' : '' }`}
                onClick={ () => this.props.router.push(ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS)}
                key={ROUTES.STUDENT_DASHBOARD_PROFILEDETAILS}>
                <img
                  className="mr-2 rounded-circle"
                  style={{ marginLeft: "-10px" }}
                  src="/static/images/admin/Man Wearing Blue Shirt Smiling Outside · Free Stock Photo.png"
                />
                <span className="is-white ml-4 pl-1">My profile</span>
              </Menu.Item>
              <Menu.Item key="8">
                <img
                  className="mr-3"
                  style={{ marginLeft: "-9px" }}
                  src="/static/images/admin/forum.svg"
                />
                <span className="is-white ml-4 pl-1">Forum</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              className="d-flex"
              style={{ background: "#fff", padding: 0 }}
            >
              <div className="container">
                <div className="row align-items-center has-full-height">
                  <div className="col-md-12 d-flex align-items-center pr-6 pl-6">
                    <Display if={this.state.collapsed}>
                      <div>
                        <img
                          src="/static/images/menu-black.png"
                          className="trigger mr-3"
                          type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                          onClick={this.toggle}
                        />
                      </div>
                    </Display>
                    <div className="">
                      <Display if={Page.headerName}>
                        <h5 className="m-0 main-header">{ Page.headerName }</h5>
                      </Display>
                      <Display if={!Page.headerName}>
                        <div>
                          <img onClick={this.props.router.back} className="mr-3 has-cursor-pointer" src="/static/images/arrow-left.png" ></img>
                          <span>{ Page.backText }</span>
                        </div>
                      </Display>
                    </div>
                  </div>
                </div>
              </div>
            </Header>
            <Content
              style={{
                background: "#fff",
                minHeight: 280
              }}
            >
              <Page className="mt-5" {...this.props} />
            </Content>
          </Layout>
        </Layout>
      );
    }
  }

  return withRouter(withAdminLayout);
};
