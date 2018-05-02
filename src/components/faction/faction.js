import React, {Component} from 'react';
import UnitMenu from './unit_menu';
import Unit from './unit';
import { importImages, formatTitle } from '../utilities/utility-functions';
import unitData from './data.json';

import './faction.css';

class Faction extends Component {

	constructor(props) {
		super(props)

		this.state = {
			faction: '',
			unit: ''
		}
	}

	componentWillReceiveProps(nextProps) {

		if (this.props.location !== nextProps.location) {
			const factionName = nextProps.match.params.faction
				
			this.setupState(factionName)
		}
	}

	componentDidMount() {
		const factionName = this.props.match.params.faction
		
		this.setupState(factionName)
	}

	setupState(factionName) {

		const faction = Object.keys(unitData).filter( faction => unitData[faction].factions.includes( factionName ) )[0]
		const factionStats = unitData[`${faction}`].units
		// const faction = unitData[`${factionName}`]
		const unitsToRemove = Object.keys(factionStats)
			.filter(unit => factionStats[`${unit}`].excluded
				&& factionStats[`${unit}`].excluded.includes(this.props.match.params.faction));
		const units = {}
		const factionUnits = Object.keys( factionStats )
			.filter( unit => !unitsToRemove.includes(unit))
			.map( unit => {
				units[unit] = factionStats[unit]
			})

		this.setState({
			faction: units,
			unit: units[Object.keys(units)[0]]
		})
	}

	render() {

		const faction = formatTitle(this.props.match.params.faction)
		const images = importImages(require.context('./images/factions', false, /\.(png|jpe?g|svg)$/))

		return (
			<section className='faction-container clearfix'>
				<h2><img src={images[`${this.props.match.params.faction}.png`]} alt={faction} />{faction}</h2>
				<UnitMenu units={this.state.faction} loadUnit={(unit) => this.setState({unit})} />
				<Unit unit_data={this.state.unit} />
			</section>
		);
	}
}

export default Faction