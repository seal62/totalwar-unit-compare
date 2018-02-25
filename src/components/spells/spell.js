import _ from 'lodash';
import React from 'react';
import { formatTitle } from '../utilities/utility-functions';

export default (props) => {

	function renderDetails() {
		return _.map(props, (value, key) => {
			if ((typeof value) !== 'object' && !excludeKey(key)) {
				return (
					<tr key={key}>
						<td style={{paddingRight: '10px', width: '40%', fontWeight: 'bold'}}>
							{key !== 'typeDesc' ? formatTitle(key) : null}
						</td>
						<td style={{width: '60%'}}>{value}</td>
					</tr>
				);
			}
		});
	}

	function renderEffects() {
		const determineClass = (key) => {
			const returnClass = String(key).slice(0, -1);
			return returnClass;
		}
		let i = 0
		return _.map(props.effects, (effect, key) => {
			i ++
			return (
				<tr key={i}><td className={determineClass(key) === 'green' ? 'positive' : 'negative'}>{effect}</td></tr>
			);
		});
	}

	function excludeKey(key) {
		const keysToExclude = ['lore','name','subtitle','description','cost', 'recharge', 'wind-up-time', 'effects']

		for (var i = 0; i < keysToExclude.length; i++) {
			if (key === keysToExclude[i]) return true
		}
		return false
	}

	return (
		<div className="spell-container">
			<div className="spell-header">
				<h2>{props.name}</h2>
				<p>{props.description}</p>
			</div>
			<div className="spell-body">
				<div className="spell-subheader">
					<h3>{props.subtitle}</h3>
					<p>{props.cost} {props.recharge}</p>
				</div>
				<div className="spell-details">
					<table className="spell-details-left">
						<tbody>
							{renderDetails()}
						</tbody>
					</table>
					<table className="spell-details-right">
						<tbody>
							<tr><td style={{fontWeight: 'bold'}}>Effects</td></tr>
							{renderEffects()}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}