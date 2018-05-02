import _ from 'lodash';
import React, { Component } from 'react';
import UnitStats from './unit_stats';
import UnitAttributes from './unit_attributes';
import UnitMounts from './unit_mounts';
import Spells from '../spells/spells';
import Abilities from '../abilities/abilities';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class Unit extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isMounted: false,
			mount: '',
			unit: '',
			title: 'Select Type'
		}
		this.handleLoadMount = this.handleLoadMount.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.unit_data.name !== nextProps.unit_data.name) {
			this.setState({
				isMounted: false,
				mount: '',
				unit: '',
				title: 'Select Type'
			})
		}
	}

	handleLoadMount(isMounted, mount) {
		
		this.setState( {
			isMounted,
			mount
		} )

		if (this.props.forCompare) {
			this.props.mounted(mount, this.props.group)
		}
	}

	renderMounts(name) {
		const unit_data = this.props.unit_data.isMultiWizard ? this.state.unit : this.props.unit_data

		if (unit_data.hasMounts) {
			return <UnitMounts
					groupName={name}
					mounts={unit_data.mounts}
					loadMount={(isMounted, mount) => this.handleLoadMount(isMounted, mount)} />
		}
	}

	renderUnit() {
		const { unit_data, forCompare, comparedTo } = this.props
		const { mount, isMounted } = this.state

		if (unit_data == null) return null
		else {
			return (
				<div>
					<h3>{unit_data.name}</h3>
					<UnitStats data={unit_data} isMounted={isMounted} mount={mount} forCompare={forCompare} comparedTo={comparedTo} />
					<UnitAttributes attributes={unit_data.attributes} isMounted={isMounted} mount={mount} />
					<Spells spells={unit_data.spells} />
					<Abilities abilities={unit_data.abilities} isMounted={isMounted} mount={mount} />
					{this.renderMounts(unit_data.name)}
				</div>
			);
		}
	}

	renderWizard() {
		const { unit_data, forCompare, comparedTo } = this.props
		const { mount, isMounted, unit } = this.state
		
		return (
			<div>
				<div className="multi-control">
					<h3>{unit_data.name}</h3>
					<DropdownButton title={this.state.title} id="wizard">
						{this.renderWizardOptions(unit_data.units)}
					</DropdownButton>
				</div>
				<UnitStats data={unit} isMounted={isMounted} mount={mount} forCompare={forCompare} comparedTo={comparedTo} />
				<UnitAttributes attributes={unit.attributes} isMounted={isMounted} mount={mount} />
				<Spells spells={unit.spells} />
				<Abilities abilities={unit.abilities} isMounted={isMounted} mount={mount} />
				{this.renderMounts(unit_data.name)}
			</div>
		);
	}
	renderWizardOptions(units) {
		return _.map(units, (unit, key) => {
			return <MenuItem key={key} onSelect={() => this.handleWizardSelect(unit, key)}>{key}</MenuItem>
		})
	}

	handleWizardSelect(unit, title) {
		this.setState({ unit, title })
	}

	render() {
		return (
			<div className="unit-container">
				{this.props.unit_data.isMultiWizard ? this.renderWizard() : this.renderUnit()}
			</div>
		);
	}
}

export default Unit