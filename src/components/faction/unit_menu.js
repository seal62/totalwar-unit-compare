import _ from 'lodash';
import React from 'react';
import { Panel, PanelGroup } from 'react-bootstrap';

export default ({units, loadUnit}) => { //instead of (props)
	
	function renderUnits(type) {

		const returnValue = _.map(units, unit => {
			
			if (unit.type === type) {
				return <li key={unit.name} onClick={() => loadUnit(unit)}>{unit.name}</li>
			}
		});

		return _.filter(returnValue)
	}

	function renderLists() {
		
		const types = ['Legendary Lords', 'Lords', 'Heroes',
				'Infantry', 'Missile Infantry','Cavalry & Chariots',
				'Missile Cavalry & Chariots', 'Monsters & Beasts',
				'Missile Monsters & Beasts', 'Flying War Machines',
				'Artillery & War Machines', 'Rare Monsters & Beasts',
				'Constructs', 'Rare Constructs']

		let i = 0

		return _.map(types, type => {
			i++

			const unitsToRender = renderUnits(i)

			if(!_.isEmpty(unitsToRender)) return (
				<Panel key={type} header={type} eventKey={i}>
					<ul>
						{unitsToRender}
					</ul>
				</Panel>
			);
		});

	}

	return (
		<div className="unit-list-container">
			<PanelGroup defaultActiveKey={1} accordion>
				{renderLists()}
			</PanelGroup>
		</div>
	);
}