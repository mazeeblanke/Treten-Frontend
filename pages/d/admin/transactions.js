import AdminLayout from '../../layouts/AdminLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Input, Button } from "antd";

const Search = Input.Search;

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    width: 100,
    key: 5,
    fixed: 'left',
  },
  {
    title: "Invoice ID",
    dataIndex: "invoice_id",
    width: 180,
    key: 1
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 180,
    key: 2,
  },
  {
    title: "Email Address",
    dataIndex: "email",
    // fixed: 'right',
    key: 3,
    width: 180
  },
  {
    title: "Description",
    dataIndex: "description",
    // fixed: 'right',
    key: 7,
    width: 230
  },
  {
    title: "Amount (N)",
    dataIndex: "amount",
    // fixed: 'right',
    align: 'right',
    key: 8,
    width: 130
  },
];



class Transactions extends Component {
  constructor(props) {
    super(props);

  }

  paginationOptions = {
    showTotal: (total, range) => {
      if (this.state.feedback !== `Showing ${range[0]} - ${range[1]} of ${total}`) {
        this.setState({
          feedback: `Showing ${range[0]} - ${range[1]} of ${total}`
          // feedback: `${range[0]}-${range[1]} of ${total} items`
        })
      }
    },
    pageSize: 7,
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

  state = {
    feedback: '',
    transactions: [
      {
        key: "1",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "13",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "2",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "20",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "3",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "4",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "40",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "1",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "13",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "2",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "20",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "3",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (Remote)"
      },
      {
        key: "4",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
      {
        key: "40",
        course: "CCNA R&S",
        status: "Active",
        date: "01/02/2019",
        name: "Sheldon Cooper",
        amount: "250,000",
        invoice_id: "TRETEN5c3f3500c0ea3",
        email: "coopernewski@outlook.com",
        description: "CCNA R&S (On demand)"
      },
    ],
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

  render() {
    return (
      <section className="transactions">
        <AdminLayout headerName="Transactions">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 pt-6">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4  col-sm-12 mb-3">
                      <p>{this.state.feedback}</p>
                    </div>
                    <div className="col-md-8 col-sm-12 justify-content-md-end d-flex">
                      <Search
                        className="mr-3 mb-3"
                        placeholder="Search"
                        onSearch={value => console.log(value)}
                        style={{ width: '180px', height: '42px' }}
                      />
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
          <div className="container">
            <div className="row pl-6 pr-6">
              <div className="col-md-12">
                <Table scroll={{ x: 1000 }} pagination={this.paginationOptions} columns={columns} dataSource={this.state.transactions} />
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    );
  }
}

Transactions.propTypes = {

};

export default Transactions;