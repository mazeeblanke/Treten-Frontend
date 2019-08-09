import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content } = Layout;
import Display from '../../components/shared/Display';
import Link from 'next/link';
import Router from 'next/router';

export default (Page) => {
  return class extends Component {

    state = {
      collapsed: false,
    };

    toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    }


    static async getInitialProps (ctx) {
      let pageProps = {}
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      return { ...pageProps };
    }

    render () {
      return (

          <Layout id="treten" style={{ margin: '0rem'}}>

            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div className="d-flex justify-content-sm-between align-items-center sidenav-top">
                <div className="logo m-4">
                  <img src="/static/images/admin/logo.png" />
                </div>

                <Display if={!this.state.collapsed}>
                  <img
                    src="/static/images/menu.png"
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Display>
              </div>

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item onClick={() => Router.push('/d/student/courses')} key="1">
                  <img className="mr-3" src="/static/images/admin/syllabus.svg" />
                  <span className="is-white ml-4">My courses</span>
                </Menu.Item>
                <Menu.Item onClick={() => Router.push('/d/student/resources')} key="2">
                  <img className="mr-3" src="/static/images/admin/resources.svg" />
                  <span className="is-white ml-4">Resources</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <img className="mr-3" src="/static/images/admin/notifications.svg" />
                  <span className="is-white ml-4">Notifications</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <img className="mr-3" src="/static/images/admin/chat.svg" />
                  <span className="is-white ml-4">Messages</span>
                </Menu.Item>

                <Menu.Item className="mt-15" key="6">
                  <img className="mr-3" src="/static/images/admin/catalog.svg" />
                  <span className="is-white ml-4">Course catalog</span>
                </Menu.Item>
                <Menu.Item key="7">
                  <img className="mr-2 rounded-circle" style={{ marginLeft: '-10px' }} src="/static/images/admin/Man Wearing Blue Shirt Smiling Outside · Free Stock Photo.png" />
                  <span className="is-white ml-4">My profile</span>
                </Menu.Item>
                <Menu.Item key="8">
                  <img className="mr-3" style={{ marginLeft: '-9px' }} src="/static/images/admin/forum.svg" />
                  <span className="is-white ml-4">Forum</span>
                </Menu.Item>

              </Menu>
            </Sider>
            <Layout>
              <Header className="d-flex" style={{ background: '#fff', padding: 0 }}>
                <Display if={this.state.collapsed}>
                  <div>
                    <img
                      src="/static/images/menu-black.png"
                      className="trigger ml-5"
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={this.toggle}
                    />
                  </div>
                </Display>
                <div className="d-flex align-items-center ml-3 has-full-height">
                  <h5 className="m-0">My Courses</h5>
                </div>
              </Header>
              <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
              }}
              >
                <Page className="mt-5" {...this.props} />
              </Content>
            </Layout>
          </Layout>

      )
    }
  };
};