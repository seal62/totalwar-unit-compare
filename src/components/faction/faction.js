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
		const faction = unitData[`${factionName}`]

		this.setState({
			faction: faction,
			unit: faction[Object.keys(faction)[0]]
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