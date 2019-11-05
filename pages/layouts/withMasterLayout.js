const { SubMenu } = Menu;
import Head from 'next/head'; 
import { Layout, Menu } from "antd";
const Cookies = require('js-cookie');
import React, { Component } from "react";
const { Header, Content, Footer } = Layout;
import Navbar from "../../components/shared/Navbar";
import "simple-react-notifications/dist/index.css";

export default Page => {
  return class extends Component {
    static async getInitialProps(ctx) {
      let pageProps = {};
      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps(ctx);
      }

      return { ...pageProps };
    }

    render() {
      return (
        // <>
        //   <Navbar {...this.props} />
        //   <Page {...this.props} />
        // </>

        <div id="treten">
					<Head>
          	<meta name="csrf-token" content={Cookies.get("XSRF-TOKEN")} />
					</Head>
          <Navbar noBoxShadow {...this.props} />
          <Page className="mt-5" {...this.props} />
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </div>
      );
    }
  };
};
