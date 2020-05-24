import { getTransactions } from '../../../store/reducers/transactions'
import { parsedPaginationTotalText } from '../../../lib/helpers'
import { TRANSACTIONS_COLUMNS } from '../../../lib/constants'
import withRedirect from '../../layouts/withRedirect'
import AdminLayout from '../../layouts/AdminLayout'
import * as actions from '../../../store/actions'
import { Table, Input, Button } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CSVLink } from 'react-csv'
import PropTypes from 'prop-types'
import PaginationNav from '../../../components/shared/PaginationNav'

const Search = Input.Search

class Transactions extends Component {
  static async getInitialProps ({ reduxStore }) {
    await reduxStore.dispatch(actions.fetchTransactions())
    return {}
  }

  constructor (props) {
    super(props)
    this.csvDownloadRef = React.createRef()
  }

  state = {
    loadingCSV: false,
    csvData: [],
    searchQuery: ''
  };

  handleTableChange = pagination => {
    this.props.fetchTransactions({
      page: pagination.current,
      q: this.state.searchQuery
    })
  }

  downloadCSV = () => {
    this.setState({
      loadingCSV: true
    })

    this.props.downloadCSV('transactions').then(res => {
      this.setState({
        loadingCSV: false,
        csvData: res
      })

      this.csvDownloadRef.current.link.click()
    }).catch(() => {
      this.setState({
        loadingCSV: false
      })
    })
  };

  search = q => {
    this.setState({ searchQuery: q })
    this.props.fetchTransactions({
      q
    })
  };

  csvFileName = 'Transactions.csv';

  render () {
    return (
      <section className="transactions">
        <AdminLayout headerName="Transactions">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 pt-6">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4  col-sm-12 mb-3">
                      <p>
                        {parsedPaginationTotalText(
                          this.props.transactions.pagination
                        )}
                      </p>
                    </div>
                    <div className="col-md-8 col-sm-12 justify-content-md-end d-flex">
                      <Search
                        className="mr-3 mb-3"
                        placeholder="Search"
                        onSearch={value => this.search(value)}
                        onChange={e => this.search(e.target.value)}
                        style={{ width: '180px', height: '42px' }}
                      />
                      <Button
                        loading={this.state.loadingCSV}
                        onClick={this.downloadCSV}
                        className="mb-3"
                        type="danger"
                        style={{ width: '126px', height: '40px' }}
                      >
                        <span>Download</span>
                        <img className="ml-2" src="/images/down.png" alt="arrow down" />
                      </Button>
                      {
                        <CSVLink
                          ref={this.csvDownloadRef}
                          data={this.state.csvData}
                          filename={this.csvFileName}
                          target="_blank"
                          style={{ display: 'none' }}
                        >
                          {' '}
                          Download
                        </CSVLink>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row pl-6 pr-6">
              <div className="col-md-12">
                <Table
                  rowKey="id"
                  loading={this.props.transactions.isLoadingTransactions}
                  scroll={{ x: 1000 }}
                  pagination={this.props.transactions.pagination}
                  columns={TRANSACTIONS_COLUMNS}
                  dataSource={this.props.transactions.all}
                  onChange={pagination => this.handleTableChange(pagination)}
                />
              </div>
            </div>
          </div>
        </AdminLayout>
      </section>
    )
  }
}

Transactions.propTypes = {
  downloadCSV: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
  fetchTransactions: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    transactions: {
      ...state.transactions,
      all: getTransactions(state),
      pagination: {
        ...state.transactions.pagination,
        itemRender: PaginationNav
      }
    }
  }
}

export default connect(
  mapStateToProps,
  {
    fetchTransactions: actions.fetchTransactions,
    downloadCSV: actions.downloadCSV
  }
)(withRedirect(Transactions))
