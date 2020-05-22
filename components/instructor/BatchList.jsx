/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import Schedule from './Schedule'
import ExpandableBlock from '../shared/ExpandableBlock'
import BatchHeader from './BatchHeader'
import Display from '../shared/Display'
import { Icon } from 'antd'
import EmptyState from '../../components/shared/EmptyState'
import { userIsInstructor, userIsAdmin } from '../../store/reducers/user'

const BatchList = (props) => {
	const { 
		user,
		batches,
		editBatch,
		paddingClasses,
		setBatchToDelete,
		setBatchExpandedState
	} = props
	return (
		<section className="course-dashboard-details pt-4" >
			<div className="container">
				<div className="row">
					<div className={`
						col-md-12 col-lg-11 
						col-xl-7 col-xs-12 ${paddingClasses}`
					}>
						<Display if={!batches.length}>
							<div className="mt-7">
								<EmptyState 
									emptyText="You have not created any batch!" 
								/>
							</div>
						</Display>
							{
								batches.map((batch, batchIndex) => {
									return (
										<div key={batch.id} className="row align-items-center">
											<div className="col-md-11">
												<ExpandableBlock
													right={userIsInstructor(user) || userIsAdmin(user)
															? 'View schedule' 
															: (
																<img 
																	className="has-pointer-cursor" 
																	src="/images/close.png"
																	onClick={() =>
																		setBatchToDelete(batch)
																	}
																>
																</img>
															)
													}
													showExpandableIcon={true}
													expanded={batchIndex === 0}
													left={<BatchHeader batch={batch} />}
													onExpanded={
														(expanded) => setBatchExpandedState(
															batch, 
															expanded
														)
													}
													content={
														<Schedule 
															user={user} 
															editBatch={editBatch} 
															batchIndex={batchIndex} 
															batch={batch} 
														/>
													}
												/>
											</div>
											<Display if={!!batch.expanded}>
												<div className="col-md-1">
													<Display if={!batch.isDeleting}>
														<img 
															className="mt-5 has-pointer-cursor" 
															src="/images/close.png"
															onClick={() =>
																setBatchToDelete(batch)
															}
														>
														</img>
													</Display>
													<Display if={!!batch.isDeleting}>
														<Icon type="loading" />
													</Display>
												</div>
											</Display>
										</div>
									)
								})
							}
					</div>
				</div>
			</div>
		</section>
	)
}

BatchList.propTypes = {
	user: PropTypes.object,
	paddingClasses: PropTypes.string,
	setBatchToDelete: PropTypes.func,
	batches: PropTypes.array.isRequired,
	editBatch: PropTypes.func.isRequired,
	setBatchExpandedState: PropTypes.func,
}

export default BatchList
