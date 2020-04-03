/* eslint-disable */
import PropTypes from 'prop-types'
import { CSVLink } from 'react-csv'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import StarRatings from 'react-star-ratings'
import TextTruncate from 'react-text-truncate'
import * as actions from '../../../store/actions'
import AdminLayout from '../../layouts/AdminLayout'
import withRedirect from '../../layouts/withRedirect'
import {
  Menu,
  Table,
  Input,
  Button,
  // Select, 
  Tooltip,
  Modal,
  Dropdown,
  Icon
} from 'antd'
import { parsedPaginationTotalText } from '../../../lib/helpers'
import {
  getCourseReviews,
  getCourseReviewsPagination,
  getCourseReviewsLoadingState,
  reviewIsApproved,
} from '../../../store/reducers/courseReviews'
import notifier from 'simple-react-notifier'
import PaginationNav from '../../../components/shared/PaginationNav'
import Display from '../../../components/shared/Display'
// import { reviewIsApproved } from '../../../store/reducers/courseReviews'

const { confirm } = Modal
const Search = Input.Search
// const { Option } = Select 

class ManageReviews extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchReviews())
    ])
    return {}
  }

  constructor(props) {
    super(props)
    this.csvDownloadRef = React.createRef()
  }

  state = {
    searchQuery: '',
    loadingCSV: '',
    csvData: [],
  }

  columns = [
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: 50,
      key: 5,
      // fixed: 'left',
    },
    {
      title: 'Name',
      dataIndex: 'enrollee.name',
      width: 130,
      key: 2,
    },
    {
      title: 'Course',
      dataIndex: 'course.title',
      key: 3,
      width: 130
    },
    {
      title: 'Number of stars',
      dataIndex: 'rating',
      key: 7,
      width: 130,
      render: (rating) => {
        return (
          <StarRatings
            starDimension="15px"
            starSpacing="3px"
            rating={rating}
            starRatedColor="#E12828"
            numberOfStars={5}
            name='rating'
          />
        )
      }
    },
    {
      title: 'Review message',
      dataIndex: 'reviewText',
      // fixed: 'right',
      // align: 'right',
      render: (reviewText) => {
        return (
          <Tooltip title={reviewText}>
            <TextTruncate
              line={3}
              text={reviewText}
            />
          </Tooltip>
        )
      },
      key: 8,
      width: 230
    },
    {
      title: 'Approval',
      dataIndex: 'approved',
      // fixed: 'right',
      // align: 'right',
      key: 38,
      width: 130,
      render: (approved) => {
        return (
          approved
            ? <div style={{ width: 130 }} className="tag is-success">Approved</div>
            : <div style={{ width: 130 }} className="tag is-grey">Not approved</div>
        )
      }
    },
    // {
    //   title: 'Publication',
    //   dataIndex: 'published',
    //   // fixed: 'right',
    //   // align: 'right',
    //   key: 28,
    //   width: 150,
    //   render: (published) => {
    //     return (
    //       published
    //         ? <div className="tag is-success">Published</div>
    //         : <div className="tag is-grey">Not published</div>
    //     )
    //   }
    // },
    {
      title: 'Action',
      key: 'operation',
      width: 90,
      render: review => {
        const menu = (
          <Menu>
            <Menu.Item disabled={reviewIsApproved(review)}>
              <a
                disabled={reviewIsApproved(review)}
                onClick={() => this.handleApproval(true, review)}
              >
                Approve
              </a>
            </Menu.Item>
            <Menu.Item disabled={!reviewIsApproved(review)}>
              <a
                disabled={!reviewIsApproved(review)}
                onClick={() => { reviewIsApproved(review) && this.handleApproval(false, review) }}
              >
                Disapprove
              </a>
            </Menu.Item>
            <Menu.Item>
              <a onClick={() => this.handleDelete(review)}>Delete</a>
            </Menu.Item>
          </Menu>
        )
        return (
          <div>
            <Display if={review.isEditing}>
              <Icon type="loading" />
            </Display>
            <Display if={!review.isEditing}>
              <Dropdown overlay={menu} placement="bottomLeft">
                <Button>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="mr-3">Action</span>
                    <img src="/static/images/select.png" />
                  </div>
                </Button>
              </Dropdown>
            </Display>
          </div>
        )
      }
      // render: (item, review) => (
      //   <div>
      //     <Select defaultValue="Action" style={{ width: 85, height: 42 }}>
      //       <Option key="approve" onClick={() => this.handleApproval(1, review)}>Approve</Option>
      //       <Option key="disapprove" onClick={() => this.handleApproval(0, review)}>Disapprove</Option>
      //     </Select>
      //   </div>
      // ),
    },
  ]

  csvFileName = 'Reviews.csv'

  handleApproval = (approved, review) => {
    console.log(approved, review)
    const action = approved ? 'approve' : 'disapprove'
    this.showConfirm(
      `Are you sure you want to ${action} this review ?`,
      () => this.props.handleApproval({ approved, review })
        .then((res) => {
          notifier.success(res.message)
        }).catch((err) => {
          notifier.error(`ERROR! ${err.response.data.message}`)
        })
    )
  }

  handleDelete = (review) => {
    this.showConfirm(
      'Are you sure you want to delete this review ?',
      () => this.props.deleteReview(review)
        .then((res) => {
          notifier.success(res.message)
        }).catch((err) => {
          notifier.error(`ERROR! ${err.response.data.message}`)
        })
    )
  }

  showConfirm = (content, handleOk, handleCancel) => {
    confirm({
      content,
      onOk () {
        handleOk && handleOk()
      },
      onCancel () {
        handleCancel && handleCancel()
      },
    })
  }

  search = q => {
    this.setState({ searchQuery: q })
    this.props.fetchReviews({
      q
    })
  }

  downloadCSV = () => {
    this.setState({
      loadingCSV: true
    })
    this.props.downloadCSV('reviews').then(res => {
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

  handleTableChange = pagination => {
    this.props.fetchReviews({
      page: pagination.current,
      q: this.state.searchQuery,
      pageSize: pagination.pageSize,
    })
  }

  render () {
    const {
      courseReviews,
      courseReviewsIsLoading,
      courseReviewsPagination,
    } = this.props
    return (
      <section className="reviews">
        <AdminLayout headerName="Manage Reviews">
          <div className="menu-bar-container">
            <div className="container">
              <div className="row menu-bar pl-6 pr-6 pt-6">
                <div className="col-md-12">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-4  col-sm-12 mb-3">
                      <p>
                        {parsedPaginationTotalText(
                          courseReviewsPagination
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
                        <img className="ml-2" src="/static/images/down.png" alt="arrow down" />
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
                  columns={this.columns}
                  scroll={{ x: 1000 }}
                  dataSource={courseReviews}
                  loading={courseReviewsIsLoading}
                  pagination={courseReviewsPagination}
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

ManageReviews.propTypes = {}

const mapStateToProps = (state) => {
  return {
    courseReviews: getCourseReviews(state),
    courseReviewsPagination: {
      ...getCourseReviewsPagination(state),
      itemRender: PaginationNav
    },
    courseReviewsIsLoading: getCourseReviewsLoadingState(state),
  }
}

export default withRedirect(connect(mapStateToProps, {
  downloadCSV: actions.downloadCSV,
  fetchReviews: actions.fetchReviews,
  deleteReview: actions.deleteReview,
  handleApproval: actions.handleApproval,
})(ManageReviews))
