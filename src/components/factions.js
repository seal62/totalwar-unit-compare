import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatTitle, importImages } from './utilities/utility-functions';

import data from './faction/data.json'
import './factions.css';

class Factions extends React.Component {

	constructor(props) {
		super(props)
		this.state = {

		}
	}

	componentDidMount() {

	}

	renderFactions( factionData ) {

		const images = importImages(require.context('./faction/images/factions', false, /\.(png|jpe?g|svg)$/))
		const factions = factionData.factions
		return _.map(factions, faction => {
			const imgSrc = images[`${faction}.png`]
			return (
				<li key={faction}>
					<Link to={faction}>
						<img src={imgSrc} alt={faction} />
						<p>{formatTitle(faction)}</p>
					</Link>
				</li>
			);
		})
	}

	render() {
		return (
			<section className="factions clearfix">
				<h2>Playable Factions</h2>
				{Object.keys(data).map( faction => (
					<div key={faction} className="faction-row">
						<h3>{formatTitle(faction)}</h3>
						<ul className="factions-container">
							{this.renderFactions(data[faction])}
						</ul>
					</div>
					) )
				}
			</section>
		);
	}
}

export default Factions;