import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const SpecialAttack = ({image, attribute, content}) => {

	let attriValue = content ? content.split('||')[1] : null

	const tooltip = (
		<Tooltip id={`tooltip${attribute.name}`}>
			<div>{attribute.name}</div>
			<div>{attriValue}</div>
		</Tooltip>
	);
	console.log( image )
	return (
		<OverlayTrigger placement="top" trigger={['hover', 'click']} overlay={tooltip}>
			<img
				src={`/images/attributes/${image}.png`}
				className="special-attack"
				alt="special attack" />
		</OverlayTrigger>
	);
}

export default SpecialAttack