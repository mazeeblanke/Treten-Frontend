import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import ListingTable from '../../../../components/shared/ListingTable'
import withRedirect from '../../../layouts/withRedirect'
import TextTruncate from 'react-text-truncate'
import AdminLayout from '../../../layouts/AdminLayout'
import * as actions from '../../../../store/actions'

const entity = 'blog-posts'

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
    this.entity = 'blog-posts'
  }

  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      width: 130,
      key: 2,
    },
    {
      title: 'Author',
      dataIndex: 'author.name',
      key: 3,
      width: 100
    },
    {
      title: 'Body',
      dataIndex: 'body',
      render: (body) => {
        return (
					<TextTruncate
						line={3}
						text={body && body.substr(0, 300).replace(/<\/?[^>]+(>|$)/g, '')}
					/>
        )
      },
      key: 8,
      width: 230
		},
		{
      title: 'Date',
      dataIndex: 'friendlyPublishedAt',
      width: 90,
      key: 5,
    }
  ]

  render () {
    return (
      <section className="listings">
        <AdminLayout headerName="Manage Blogposts">
					<ListingTable 
						columns={this.columns}
						createPage="/d/admin/blog-posts/create"
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
