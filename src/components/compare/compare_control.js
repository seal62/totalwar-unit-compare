import _ from 'lodash';
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { formatTitle, unformatTitle } from '../utilities/utility-functions';

import unitData from '../faction/data.json';

class CompareControl extends Component {
	constructor(props) {
		super(props)

		this.state = {
			factionTitle: 'Pick a Faction',
			unitTitle: 'First pick a Faction',
			faction: '',
			unit: '',
			factionPicked: false,
			multiSelected: false,
			multiName: ''
		}
	}

	factionSelected(faction) {
		this.setState({
			factionTitle: formatTitle(faction),
			faction: faction,
			factionPicked: true,
			unitTitle: 'Pick a Unit',
			multiSelected: false,
			multiName: ''
		})
		//this.props.unitSelected('', this.props.letter) // Removes unit when faction chosen - BUG passes NaN into compare tag
	}

	unitSelected(unit) {
		if (unit.isMultiWizard) {
			this.setState({
				unitTitle: unit.name,
				unit: '',
				multiSelected: true,
				multiName: 'Pick a Type'
			})
			// TODO call to remove previous unit stats
		} else {
			this.setState({
				unitTitle: unit.name,
				unit: unit,
				multiSelected: false,
				multiName: ''
			})
			this.props.unitSelected(unit, this.props.letter)
		}
	}

	multiTypeSelected(unit, name) {
		unit["name"] = this.state.unitTitle
		this.setState({
			unit,
			multiName: name
		})
		this.props.unitSelected(unit, this.props.letter)
	}

	renderFactionDropDown() {

		return _.map(unitData, (faction, key) => {
			return <MenuItem key={key} onSelect={() => this.factionSelected(key)}>{formatTitle(key)}</MenuItem>
		});
	}

	renderUnitDropDown() {
		let units = null;
		if ( this.state.faction ) {
			units = unitData[`${this.state.faction}`].units	
		}

		if (units == null) {
			// return select faction first message
		} else {
			return _.map(units, (unit, key) => {
				return <MenuItem key={key} onSelect={() => this.unitSelected(unit)}>{unit.name}</MenuItem>
			})
		}
	}

	renderMultiUnitDropDown() {
		const units = unitData[`${this.state.faction}`].units[`${unformatTitle(this.state.unitTitle)}`].units

		return _.map(units, (unit, key) => {
			return <MenuItem key={key} onSelect={() => this.multiTypeSelected(unit, key)}>{formatTitle(key)}</MenuItem>
		})
	}

	render() {
		const { letter } = this.props
		const disabled = this.state.factionPicked ? false : true
		return (
			<div className="compare-controls">
				<DropdownButton title={this.state.factionTitle} id={`faction${letter}`} >
					{this.renderFactionDropDown()}
				</DropdownButton>
				<DropdownButton title={this.state.unitTitle} id={`unit${letter}`} disabled={disabled} >
					{this.renderUnitDropDown()}
				</DropdownButton>
				{ this.state.multiSelected &&
					<DropdownButton title={this.state.multiName} id={`multi${letter}`}>
						{this.renderMultiUnitDropDown()}
					</DropdownButton>
				}
			</div>
		);
	}
}

export default CompareControl