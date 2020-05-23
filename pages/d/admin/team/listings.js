import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import ListingTable from '../../../../components/shared/ListingTable'
import withRedirect from '../../../layouts/withRedirect'
// import TextTruncate from 'react-text-truncate'
import AdminLayout from '../../../layouts/AdminLayout'
import * as actions from '../../../../store/actions'

const entity = 'certifications'

class Listing extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchListings({
				entity
			}))
    ])
    return {}
  }

  constructor(props) {
    super(props)
    this.entity = entity
  }

  columns = [
    {
      title: 'Company',
      dataIndex: 'company',
      width: 160,
      key: 2,
      fixed: 'left'
    },
    {
      title: 'Banner Image',
      dataIndex: 'bannerImage',
      render: (bannerImage) => {
        return (
					<img alt="banner image" width={50} height={30} src={bannerImage}></img>
        )
      },
      key: 8,
      width: 130
		}
  ]

  render () {
    return (
      <section className="listings">
        <AdminLayout headerName="Manage Certifications">
					<ListingTable 
						columns={this.columns}
						createPage="/d/admin/certifications/create"
						entity={entity} 
					/>
        </AdminLayout>
      </section>
    )
  }
}

Listing.propTypes = {}

export default withRedirect(connect(null, {
	fetchListings: actions.fetchListings,
})(Listing))
