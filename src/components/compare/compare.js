import _ from 'lodash';
import React, { Component } from 'react';
import CompareControl from './compare_control';
import Unit from '../faction/unit';

import './compare.css';

class Compare extends Component {
	
	constructor(props) {
		super(props)

		this.state = {
			unitA: '',
			unitAIsMounted: false,
			unitAMountedStats: '',
			unitB: '',
			unitBIsMounted: false,
			unitBMountedStats: ''
		}
		this.updateWithMount = this.updateWithMount.bind(this)
	}

	unitSelected(unit, group) {
		if (group === 'A') this.setState({unitA: unit, unitAIsMounted: false, unitAMountedStats: ''})
			else this.setState({unitB: unit, unitBIsMounted: false, unitBMountedStats:''})
	}

	updateWithMount(mount, group) {

		let newStats = null;
		if (group === 'A') {
			if (mount) {
				newStats = this.updateStatsWithMount(this.state.unitA, mount)
				this.setState({
					unitAIsMounted: true,
					unitAMountedStats: newStats
				})
			} else this.setState({unitAIsMounted:false, unitAMountedStats: ''})
		} else {
			if (mount) {
				newStats = this.updateStatsWithMount(this.state.unitB, mount)
				this.setState({
					unitBIsMounted: true,
					unitBMountedStats: newStats
				})
			} else this.setState({unitBIsMounted: false, unitBMountedStats: ''})
		}
	}

	updateStatsWithMount(unit, mount) {
		
		const subStats = (value, key) => {
			const stats = {}
			_.map(value, (subVal, subKey) => {
				if (mount[key][subKey])	{
					stats[subKey] = subVal + mount[key][subKey]
				} else {
					stats[subKey] = subVal
				}
			})
			return stats
		}

		const newStats = {}
		_.map(unit, (value, key) => {
			if ((key === 'weapon-strength' || key === 'missile-damage') && mount[key]) {
				newStats[key] = subStats(value, key)
			} else if (key === 'attributes') {
				newStats[key] = mount[key]
			} else {
				if (mount[key]) {
					newStats[key] = value + mount[key]
				} else {
					newStats[key] = value
				}
			}
		});
		return newStats
	}

	render() {

		let forCompare = false
		if (this.state.unitA !== '' && this.state.unitB !== '') forCompare = true

		return (
			<section className="compare-container clearfix">
				<div className="compare-col-A">
					<CompareControl letter='A' unitSelected={(unit,group) => this.unitSelected(unit,group)} />
					<Unit
						unit_data={this.state.unitA}
						forCompare={forCompare}
						comparedTo={this.state.unitBIsMounted ? this.state.unitBMountedStats : this.state.unitB}
						mounted={(mount, group) => this.updateWithMount(mount, group)}
						group="A" />
				</div>
				<div className="compare-col-B">
					<CompareControl letter='B' unitSelected={(unit,group) => this.unitSelected(unit,group)} />
					<Unit
						unit_data={this.state.unitB}
						forCompare={forCompare}
						comparedTo={this.state.unitAIsMounted ? this.state.unitAMountedStats : this.state.unitA}
						mounted={(mount, group) => this.updateWithMount(mount, group)}
						group="B" />
				</div>
			</section>
		);
	}
}

export default Compare