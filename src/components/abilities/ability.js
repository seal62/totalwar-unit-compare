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
		const keysToExclude = ['name','subtitle','description', 'recharge', 'wind-up-time', 'effects', 'desc', 'atype']

		for (var i = 0; i < keysToExclude.length; i++) {
			if (key === keysToExclude[i]) return true
		}
		return false
	}

	return (
		<div className="ability-container">
			<div className="ability-header">
				<h2>{props.name}</h2>
				<p>{props.description}</p>
			</div>
			<div className="ability-body">
				<div className="ability-subheader">
					<h3>{props.subtitle}</h3>
					<p>{props.cost} {props.recharge}</p>
				</div>
				<div className="ability-details">
					<table className="ability-details-left">
						<tbody>
							{renderDetails()}
						</tbody>
					</table>
					<table className="ability-details-right">
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