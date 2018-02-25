import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { formatTitle, importImages } from './utilities/utility-functions';

import data from './faction/data.json'
import './factions.css';

export default (props) => {

	function renderFactions() {

		const images = importImages(require.context('./faction/images/factions', false, /\.(png|jpe?g|svg)$/))
		
		return _.map(data, (faction, key) => {

			const imgSrc = images[`${key}.png`]
			return (
				<li key={key}>
					<Link to={key}>
						<img src={imgSrc} alt={key} />
						<p>{formatTitle(key)}</p>
					</Link>
				</li>
			);
		})
	}

	return (
		<section className="factions clearfix">
			<h2>Playable Factions</h2>
			<ul className="factions-container">
				{renderFactions()}
			</ul>
		</section>
	);
}