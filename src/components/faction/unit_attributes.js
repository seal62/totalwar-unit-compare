import _ from 'lodash';
import React from 'react';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import { importImages } from '../utilities/utility-functions';
import attributesData from './attributes.json';

export default ({attributes, isMounted, mount}) => {

	const images = importImages(require.context('../abilities/images', false, /\.(png|jpe?g|svg)$/))

	function renderAttributes() {

		let attributesToMap

		if (isMounted) {
			attributesToMap = (typeof mount.attributes) !== 'undefined' ? mount.attributes : attributes
		} else {
			attributesToMap = attributes
		}

		return _.map(attributesToMap, (value, key) => {
			const attribute = attributesData[`${key}`]
			if ( attribute.name !== 'Poison!' ) {
				// console.log(attribute)
				const popoverText = attribute.text.replace('**', value) //assumes only 1 value to replace
				const popover = (
					<Popover id={`popover${key}`} title={attribute.name}>{popoverText}</Popover>
				);

				const imageSrc = attribute.name.replace(/[() .!]/g, '-').toLowerCase();
				const image = images[`${imageSrc}.png`]
				// console.log( imageSrc )
				const placeholder = () => {
					if (attribute.isNegative) {
						return <svg height="20" width="30"><polygon points="15,10 7,25 23,25" style={{fill:"red"}} transform='rotate(180) translate(-30 -30)' /></svg> 
					} else {
						return <svg height="20" width="30"><polygon points="15,5 5,25 25,25" style={{fill:"green"}} /></svg>
					}
				}

				return ( //return img with overlaytrigger for popover
					<OverlayTrigger key={key} trigger={['hover','click']} placement="top" overlay={popover}>
						<span
							style={image &&
								attribute.name !== 'Magical Attacks' &&
								attribute.name !== 'Flaming Attacks' &&
								attribute.name !== 'Armour-Piercing' &&
								attribute.name !== 'Shielded' &&
								attribute.name !== 'Sundered Armour' &&
								attribute.name !== 'Frostbite!'
								? {verticalAlign:"text-bottom"}
								: null
							}
						>
							{image &&
								attribute.name !== 'Magical Attacks' &&
								attribute.name !== 'Flaming Attacks' &&
								attribute.name !== 'Armour-Piercing' &&
								attribute.name !== 'Shielded' &&
								attribute.name !== 'Sundered Armour' &&
								attribute.name !== 'Frostbite!'
								? <img src={image} alt={attribute.name} />
								: placeholder()
							}
						</span>
					</OverlayTrigger>
				);
			} else return null;
		})
	}

	return (
		<div className={attributes ? "attributes-container" : "hidden"}>
			<h4>Attributes</h4>
			{renderAttributes()}
		</div>
	);
}