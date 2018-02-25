import _ from 'lodash';
import React, { Component } from 'react';
import Ability from './ability';
import { importImages } from '../utilities/utility-functions';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import abilityData from './abilities.json';

class Abilities extends Component {

	renderAbilities(abilities) {
		const images = importImages(require.context('./images', false, /\.(png|jpe?g|svg)$/))

		return _.map(abilities, abilityKey => {
			const ability = abilityData[`${abilityKey}`]

			const popoverContent = <Ability {...ability} />
			const popover = (
				<Popover id={`popoverAbility${abilityKey}`} bsClass="ability-popover popover" >{popoverContent}</Popover>
			);

			let imageSrc = ability.name.replace(/[() .!]/g, '-').toLowerCase()
			// console.log(images)
			// console.log(imageSrc)
			return ( //return img with overlaytrigger for popover
				<OverlayTrigger key={`ability-${abilityKey}`} trigger={['hover','click']} placement="top" overlay={popover}>
					<span><img className="ability-thumb" src={images[`${imageSrc}.png`]} alt={ability.name} /></span>
				</OverlayTrigger>
			);
		})
	}

	render() {
		const {isMounted, mount} = this.props;
		let abilities;
		if (isMounted) {
			abilities = (typeof mount.abilities) !== 'undefined' ? mount.abilities : this.props.abilities;
		} else {
			abilities = this.props.abilities;
		}

		if (abilities && abilities.length > 0) {
			return (
				<div className="ability-container">
					<h4>Abilities</h4>
					{this.renderAbilities(abilities)}
				</div>
			);
		} else {
			return null
		}
	}
}

export default Abilities;