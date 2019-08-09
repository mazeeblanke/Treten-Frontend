import React, { Component } from 'react';
import Navbar from '../../components/shared/Navbar';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;


export default (Page) => {
  return class extends Component {

    static async getInitialProps (ctx) {
      let pageProps = {}
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      return { ...pageProps };
    }

    render () {
      return (
        // <>
        //   <Navbar {...this.props} />
        //   <Page {...this.props} />
        // </>

        <div id="treten">
          <Navbar noBoxShadow {...this.props} />
          <Page className="mt-5" {...this.props} />
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </div>
      )
    }
  };
};