import React from 'react'
import PropTypes from 'prop-types'

const ScrollTo = (props) => {
	const {
		href
	} = props

	const scroll = () => {
		requestAnimationFrame(() => {
			const el = document.querySelector(props.href)
			if (el) {
				el.scrollIntoView({
					behaviour: 'smooth',
					block: 'center'
				})
			}
		})
	}

	return (
		<a href={href} onClick={scroll}>
			{props.children}
		</a>
	)
}


ScrollTo.propTypes = {
	href: PropTypes.string
}


export default ScrollTo;
