import _ from 'lodash';
import React, { Component } from 'react';
// import UnitMountButton from './unit_mount_button';
import UnitMountsGroup from './unit_mounts_group';
import { Tooltip, OverlayTrigger, ToggleButton } from 'react-bootstrap';
import { importImages, unformatTitle } from '../utilities/utility-functions';

class UnitMounts extends Component {

	renderMounts(groupName) {

		const {mounts, loadMount} = this.props
		const images = importImages(require.context('./images/mounts', false, /\.(png|jpe?g|svg)$/))
		
		return _.map(mounts, (mount, key) => {

			const imageName = unformatTitle(key)
			const imgSrc = images[`${imageName}.png`]

			const tooltip = (
				<Tooltip id={`tooltip${key}`}>{key}</Tooltip>
			);

			return (
				<ToggleButton key={key} name={groupName} value={key} onChange={() => loadMount(true, mount)} >
					<OverlayTrigger placement="bottom" overlay={tooltip}>
						<img src={imgSrc} alt={key}/>
					</OverlayTrigger>
				</ToggleButton>
			);
		})
	}

	render() {
		const { groupName } = this.props

		return (
			<div className="mounts-container">
				<h4>Mounts</h4>
				<UnitMountsGroup groupName={groupName}>
					<ToggleButton name={groupName} value='No Mount' onChange={() => this.props.loadMount(false, '')} >
						No Mount
					</ToggleButton>
					{this.renderMounts(groupName)}
				</UnitMountsGroup>
			</div>
		);
	}
}

export default UnitMounts;