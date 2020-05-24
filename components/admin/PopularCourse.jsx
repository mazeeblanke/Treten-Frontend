
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'
// import 'element-theme-default'
// const ElSelect = dynamic(() => import('element-react').then(mod => mod.Select), {
//   ssr: false
// })
// const SelectOption = dynamic(() => import('element-react').then(mod => mod.Select.Option), {
//   ssr: false
// })
import PropTypes from 'prop-types';
import { Select } from 'antd';
const { Option } = Select

const PopularCourse = (props) => {
	
	const { setPopularCourse, number, popularCourses, onSearch } = props

	const [remoteOptions, setRemoteOptions] = useState([])

	useEffect(() => {
		setRemoteOptions(props.coursesOptions.filter((option) => popularCourses[number] === option.id))
	}, props.coursesOptions);

	const onRemoteSearch = (e) => {
		if (e !== '') {
			if (popularCourses[number])
			{
				setPopularCourse('', number )
			} else {
				onSearch(e).then(({data}) => {
					setRemoteOptions(data.data.filter((option) => !Object.values(popularCourses).includes(option.id)))
				})
			}
		}
	}
		return (
			<div className="col-md-6 col-sm-12 col-xs-12 mb-5">
				{/* <Form.Item> */}
					<label htmlFor="popular-course-1" className="pb-3">
						<b>Popular course - {number}</b>
					</label>
					<Select
						showSearch
						allowClear
						onChange={e => {
							setPopularCourse(e, number )
						}}
						size="large"
						showArrow={true}
						filterOption={false}
						notFoundContent="No match"
						onSearch={onRemoteSearch}
						className="has-full-width"
						value={popularCourses[number]}
						defaultActiveFirstOption={false}
						placeholder={`Select popular course - ${number}`}
					>
						{
							remoteOptions.map((option) => (
								<Option key={option.id} value={option.id}>{option.title}</Option>
							))
						}
					</Select>
				{/* </Form.Item> */}
			</div>
		);
	// }
}


PopularCourse.propTypes = {
	
};


export default PopularCourse;
