import React, { Component } from 'react';

class Footer extends Component {
	
	render() {

		const version = 'Mortal Empires v1.3.0'

		return (
			<footer className="footer">
				<p>Unit stats are taken from build {version} based on ultra unit settings.</p>
        <p>All rights belong to Creative Assembly and Games Workshop</p>
			</footer>
		);
	}
}

export default Footer