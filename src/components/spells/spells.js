import _ from 'lodash';
import React, { Component } from 'react';
import Spell from './spell';
import { importImages } from '../utilities/utility-functions';
import { Popover, OverlayTrigger } from 'react-bootstrap';
import spellData from './spells.json';
import './spells.css';

class Spells extends Component {

	renderSpells(spells) {
		const images = importImages(require.context('./images', false, /\.(png|jpe?g|svg)$/))

		return _.map(spells, spellKey => {
			const spell = spellData[`${spellKey}`]

			const popoverContent = <Spell {...spell} />
			const popover = (
				<Popover id={`popoverSpell${spellKey}`} bsClass="spell-popover popover" >{popoverContent}</Popover>
			);

			const imageSrc = spell.name.replace(/[() .]/g, '-').toLowerCase();
			// console.log(imageSrc)
			return ( //return img with overlaytrigger for popover
				<OverlayTrigger key={`spell-${spellKey}`} trigger={['hover','click']} placement="top" overlay={popover}>
					<span><img className="spell-thumb" src={images[`${imageSrc}.png`]} alt={spell.name} /></span>
				</OverlayTrigger>
			);
		})
	}

	render() {
		const { spells } = this.props

		if (spells) {
			return (
				<div className="spell-container">
					<h4>Spells</h4>
					{this.renderSpells(spells)}
				</div>
			);
		} else {
			return null
		}
	}
}

export default Spells;