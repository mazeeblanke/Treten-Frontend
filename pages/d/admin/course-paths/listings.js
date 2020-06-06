import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import ListingTable from '../../../../components/shared/ListingTable'
import withRedirect from '../../../layouts/withRedirect'
import TextTruncate from 'react-text-truncate'
import AdminLayout from '../../../layouts/AdminLayout'
import * as actions from '../../../../store/actions'

const entity = 'course-paths'

class Listing extends Component {
  static async getInitialProps ({ reduxStore }) {
    await Promise.all([
      reduxStore.dispatch(actions.fetchListings({
        entity
      }))
    ])
    return {}
  }

  constructor (props) {
    super(props)
    this.entity = entity
  }

  columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 130,
      key: 2
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description) => {
        return (
          <TextTruncate
            line={3}
            text={description && description.replace(/<\/?[^>]+(>|$)/g, '') || '-'}
          />
        )
      },
      key: 8,
      width: 230
    },
    {
      title: 'Banner Image',
      dataIndex: 'bannerImage',
      render: (bannerImage) => {
        return (
          <img alt="banner image" width={100} height={60} src={bannerImage}></img>
        )
      },
      key: 8,
      width: 230
    }
  ]

  render () {
    return (
      <section className="listings">
        <AdminLayout headerName="Manage Course Path">
          <ListingTable
            columns={this.columns}
            createPage="/d/admin/course-paths/create"
            entity={entity}
          />
        </AdminLayout>
      </section>
    )
  }
}

Listing.propTypes = {}

export default withRedirect(connect(null, {
  fetchListings: actions.fetchListings
})(Listing))
