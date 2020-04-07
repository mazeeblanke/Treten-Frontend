import React, { Component } from 'react'
import { getModel } from '../../../../store/reducers/form'
import Form from '../../../../components/shared/Form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import AdminLayout from '../../../layouts/AdminLayout'
import Router from 'next/router'
import { Button } from 'antd'
import Display from '../../../../components/shared/Display'

class Create extends Component {
	static async getInitialProps ({ req }) {
    return {
			id: req && (parseInt(req.params.id, 10))
		}
	} 
	
	render() {
		const {
			id,
			model
		} = this.props
		return (
			<section className="manage">
				<AdminLayout headerName="Manage Blogpost">
					<div className="menu-bar-container">
						<div className="container">
							<div className="row menu-bar pl-6 pr-6 has-border-bottom">
								<div className="col-md-12">
									<div className="row justify-content-between align-items-center">
										<div className="col-md-4 col-sm-12">
											<h4 className="m-0 pt-6 pb-6">
												<b>{ Number.isInteger(id) ? 'Update' : 'Create' } Blogpost</b>
											</h4>
										</div>
										<div style={{ alignItems: 'baseline' }} className="col-md-8 col-sm-12 justify-content-md-end d-flex">
											<a onClick={() => Router.push('/d/admin/blog-posts/listings')}>All Blogposts</a>
											<Display if={Number.isInteger(id)}>
												<Button
													onClick={() => Router.push('/d/admin/blog-posts/create')}
													className="mb-3 ml-3"
													type="danger"
													style={{ width: '126px', height: '40px' }}
												>
													<span>Create new</span>
												</Button>
											</Display>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="container">
						<Form
							entity='blog-posts'
							id={Number.isInteger(id) && id}
						/>
					</div>
				</AdminLayout>	
			</section>	
		);
	}
}

const mapStateToProps = (state) => {
	return {
		model: getModel(state)
	}
}

Create.propTypes = {
	model: PropTypes.object,
}

export default connect(mapStateToProps)(Create);
