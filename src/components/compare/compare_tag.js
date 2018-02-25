import React from 'react';

export default ({valueOne, valueTwo}) => {

	function difference() {

		return Math.round(valueOne - valueTwo)
	}

	function determineClass(diff) {

		let compareClass = ''

		if (diff > 0) compareClass = 'greater'
		else if (diff < 0) compareClass = 'less'
		else compareClass = 'hidden'

		return compareClass
	}

	const value = difference()
	const diffClass = determineClass(value)

	return (
		<span className={`compare-tag ${diffClass} m-hidden`}>
			{value}
		</span>
	);
}