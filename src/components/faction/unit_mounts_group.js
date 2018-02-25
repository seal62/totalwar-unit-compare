import React, { Component } from 'react';
import { ToggleButtonGroup } from 'react-bootstrap';

class UnitMountsGroup extends Component {

	constructor(props) {
		super(props)

		this.state = {
			value: 'No Mount'
		}
	}

	handleChange = (value) => {
		this.setState({ value })
	}

	componentWillReceiveProps(newProps) {
		if(newProps.groupName !== this.props.groupName) {
			this.setState({ value: 'No Mount' })
		}
	}
	
	renderChildren() {
		
		const children = this.props.children
		return React.Children.map(children, child => {
			return child
		})
	}

	render() {
		
		return (
			<form name={this.props.groupName}>
				<ToggleButtonGroup
					type='radio'
					name={this.props.groupName}
					value={this.state.value}
					onChange={this.handleChange}
					//defaultValue='No Mount'
				>
					{this.renderChildren()}
				</ToggleButtonGroup>
			</form>
		);
	}
}

export default UnitMountsGroup;