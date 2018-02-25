import React, { Component } from 'react';
import { Tooltip, OverlayTrigger, ToggleButton } from 'react-bootstrap';
import { importImages, unformatTitle } from '../utilities/utility-functions';

class UnitMountButton extends Component {

	handleClick() {
		const {values, loadMount} = this.props

		loadMount(true, values)
	}

	render() {

		const images = importImages(require.context('./images/mounts', false, /\.(png|jpe?g|svg)$/))
		const {buttonName, groupName} = this.props

		const imageName = unformatTitle(buttonName)
		const imgSrc = images[`${imageName}.png`]

		const tooltip = (
			<Tooltip id={`tooltip${buttonName}`}>{buttonName}</Tooltip>
		);

		return (
				<ToggleButton name={groupName} value={buttonName} onChange={() => this.handleClick()} >
					<OverlayTrigger key={buttonName} placement="bottom" overlay={tooltip}>
						<img src={imgSrc} alt={buttonName}/>
					</OverlayTrigger>
				</ToggleButton>
			
		);
	}
}

export default UnitMountButton;