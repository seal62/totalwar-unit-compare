import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { importImages } from './utilities/utility-functions';

import data from './faction/data.json'
import './nav.css';

class Nav extends Component {

	renderFactions() {

		const images = importImages(require.context('./faction/images/factions', false, /\.(png|jpe?g|svg)$/))

		return _.map(data, (faction, key) => {

			const imgSrc = images[`${key}.png`]

			return (
				<Link key={key} to={key}>
					<img src={imgSrc} alt={key} />
				</Link>
			);
		})
	}

	render() {
		return (
			<nav className="faction-nav">
				<div className="nav-container">
					<div className="nav-links">
						<h1><Link to='/factions'>Choose your Faction</Link></h1>
						<h2><span>&nbsp;&nbsp;or&nbsp;&nbsp;</span><Link to='/compare'>Compare Units</Link></h2>
					</div>
					<div className="nav-icons">{this.renderFactions()}</div>
				</div>
			</nav>
		);
	}
}

export default Nav