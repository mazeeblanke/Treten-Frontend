import {
  Modal,
	Table,
	Menu,
	Button,
	Dropdown,
	Icon,
  Input,
} from 'antd'

import { 
	getListings, 
	getListingEndpoints,
	getListingsPagination, 
	getListingsLoadingState, 
} from '../../store/reducers/listing'

import Router from 'next/router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Display from './Display'
import React, { Component } from 'react'
import notifier from 'simple-react-notifier'
import * as actions from '../../store/actions'
import PaginationNav from './PaginationNav'
import { parsedPaginationTotalText } from '../../lib/helpers'

const { confirm } = Modal
const Search = Input.Search

class ListingTable extends Component {

	state = {
		searchQuery: ''
	}

	search = q => {
		const {
			entity
		} = this.props
    this.setState({ searchQuery: q })
    this.props.fetchListings({
			q,
			entity
    })
	}

	handleDelete = (listing) => {
		const {
			entity
		} = this.props
    this.showConfirm(
      'Are you sure you want to delete this listing ?',
      () => this.props.deleteListing({ listing, entity })
        .then((res) => {
          notifier.success(res.message)
        }).catch((err) => {
					console.log(err)
          err.response && notifier.error(`ERROR! ${err.response.data.message}`)
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
	
	handleTableChange = pagination => {
		const {
			entity
		} = this.props
    this.props.fetchListings({
			entity,
      page: pagination.current,
      q: this.state.searchQuery,
      pageSize: pagination.pageSize,
    })
	}
	
	columns = [
		...this.props.columns,
		{
      title: 'Action',
      key: 'operation',
      width: 90,
      render: listing => {
        const menu = (
          <Menu>
            <Menu.Item>
              <a onClick={() => this.handleDelete(listing)}>Delete</a>
            </Menu.Item>
            <Menu.Item>
              <a onClick={() => Router.push('/d/admin/' + this.props.entity + '/update/' + listing.id)}>Edit</a>
            </Menu.Item>
          </Menu>
        )
        return (
          <div>
            <Display if={listing.isEditing}>
              <Icon type="loading" />
            </Display>
            <Display if={!listing.isEditing}>
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
		}
	]

	render() {
		const {
			createPage,
			listings,
			listingsIsLoading,
			listingsPagination
		} = this.props
		return (
			<div>
				<div className="menu-bar-container">
					<div className="container">
						<div className="row menu-bar pl-6 pr-6 pt-6">
							<div className="col-md-12">
								<div className="row justify-content-between align-items-center">
									<div className="col-md-4  col-sm-12 mb-3">
										<p>
											{parsedPaginationTotalText(
												listingsPagination
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
											onClick={() => Router.push(createPage)}
											className="mb-3"
											type="danger"
											style={{ width: '126px', height: '40px' }}
										>
											<span>Create new</span>
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
							<Table
								rowKey="id"
								columns={this.columns}
								scroll={{ x: 1000 }}
								dataSource={listings}
								loading={listingsIsLoading}
								pagination={listingsPagination}
								onChange={pagination => this.handleTableChange(pagination)}
							/>
						</div>
					</div>
				</div>	
			</div>	
		);
	}
}

const mapStateToProps = (state) => {
  return {
		listings: getListings(state),
		// endpoints: getListingEndpoints(state),
    listingsPagination: {
      ...getListingsPagination(state),
      itemRender: PaginationNav
    },
    listingsIsLoading: getListingsLoadingState(state),
  }
}

export default connect(mapStateToProps, {
  fetchListings: actions.fetchListings,
  deleteListing: actions.deleteListing
})(ListingTable)

