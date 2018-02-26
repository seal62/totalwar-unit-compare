import _ from 'lodash';
import React from 'react';
import CompareTag from '../compare/compare_tag';
import SpecialAttack from './special_attack';

import Attributes from './attributes.json';
import { formatTitle } from '../utilities/utility-functions';

export default ({data, isMounted, mount, forCompare, comparedTo}) => {

	function renderStats() {
		return _.map(data, (value, key) => {
			if ((typeof value) !== 'object' && !excludeKey(key)) {
				const modifier = mountModifier(key, false, '')

				const compValue = (typeof value) === 'string' ? value : value + modifier
				const compareTag = forCompare ? renderCompareTag(compValue, key) : ''

				const hideOnZero = () => {
					if (key === 'range' || key === 'ammunition') {
						return compValue <= 0 ? 'hidden' : ''
					}
					return ''
				}

				const specialAttackIcon = (type) => {

					let images;
					const spAttackAttributes = ["37","38","124","81","83","87","94","112","115","127","129"] //attribute indeces to match
					const unitAttributes = isMounted ? mount.attributes : data.attributes

					if (type === 'melee-attack') {
						images = _.map(unitAttributes, (value, index) => {
							let attriValue = value ? value.split('|')[0] : null
							attriValue = attriValue && attriValue.charAt(attriValue.length-1) === ' ' ? attriValue.slice(0, -1) : attriValue
							if (spAttackAttributes.includes(index) && (attriValue === 'Melee' || attriValue === 'Melee & Ranged')) {
								let attribute = Attributes[`${index}`]
								return <SpecialAttack key={index} image={index} content={value} attribute={attribute} />
							}
						})

					} else if (type === 'ammunition') {

						images = _.map(unitAttributes, (value, index) => {
							let attriValue = value ? value.split('|')[0] : null
							attriValue = attriValue && attriValue.charAt(attriValue.length-1) === ' ' ? attriValue.slice(0, -1) : attriValue
							if (spAttackAttributes.includes(index) && (attriValue === 'Ranged' || attriValue === 'Melee & Ranged')) {
								let attribute = Attributes[`${index}`]
								return <SpecialAttack key={index} image={index} content={value} attribute={attribute} />
							}
						})
					}

					if ((typeof images) !== 'undefined') {
						return (
							<div className="special-attack-container">
								{images}
							</div>
						);
					}
				}

				const mobileCompareClass = () => {
					console.log( compareTag )
					const {valueOne, valueTwo} = compareTag.props;
					if ( valueOne > valueTwo ) return 'positive-number'
						else if ( valueOne < valueTwo ) return 'negative-number'
						else return '';
				}

				return (
					<tr key={key} className={hideOnZero()}>
						<td>
							<div className={key !== 'melee-attack' && key !== 'ammunition' ? 'fullWidth' : 'sp-container'}>
								{formatTitle(key)}
							</div>
							{specialAttackIcon(key)}
						</td>
						<td className={forCompare && compareTag ? mobileCompareClass() : ''}>{compValue}{compareTag}</td>
					</tr>
				)
				
			} else if (!excludeKey(key)) {

				const totalsVal = renderTotals(key, value)
				const compareTag = forCompare ? renderCompareTag(value, key) : ''

				const mobileCompareClass = () => {
					console.log( compareTag )
					const {valueOne, valueTwo} = compareTag.props;
					if ( valueOne > valueTwo ) return 'positive-number'
						else if ( valueOne < valueTwo ) return 'negative-number'
						else return '';
				}

				return (
					<tr key={key} className={totalsVal <= 0 ? 'hidden' : null}>
						<td className="sub-container" colSpan="2">
						<table className="unit-substats"><tbody>
							<tr>
								<td>{formatTitle(key)}</td>
								<td className={forCompare && compareTag ? mobileCompareClass() : ''}>{totalsVal}{compareTag}</td>
							</tr>
							{renderSubStats(value, key)}
					</tbody></table></td></tr>
				);
			}
		});
	}

	function renderCompareTag(unitVal, key) {
		if (key === 'weapon-strength' || key === 'missile-damage') {
			const unitOneTotals = renderTotals(key, unitVal)
			const unitTwoTotals = renderTotals(key, comparedTo[`${key}`], true)
			//console.log(`${unitOneTotals} || ${unitTwoTotals} || ${key}`)
			if (unitOneTotals != null && unitTwoTotals != null) {
				return <CompareTag valueOne={unitOneTotals} valueTwo={unitTwoTotals} />
			} else return ''
		} else if ((typeof unitVal) !== 'string') {
			const unitTwo = comparedTo[`${key}`]
			//console.log(`${unitVal} || ${unitTwo} || ${key}`)
			if (unitVal != null && unitTwo != null) {
				return <CompareTag valueOne={unitVal} valueTwo={unitTwo} />
			} else return ''
		} else return ''
	}
	function renderSubCompareTag(unitVal, key, subKey) {

		let unitTwo
		const unitTwoParent = comparedTo[`${key}`]
		
		if (unitTwoParent != null) {
			unitTwo = comparedTo[`${key}`][`${subKey}`]
			//console.log(`${unitVal} || ${unitTwo} || ${key}`)
			if (unitVal != null && unitTwo != null) return <CompareTag valueOne={unitVal} valueTwo={unitTwo} />
				else return ''
		} else return ''

	}

	function renderTotals(key, values, ignoreMount) {
		
		const ws = (values) => {
			let total = 0
			
			_.map(values, (value, key) => {
				const modifier = ignoreMount ? 0 : mountModifier(key, true, 'weapon-strength')
				if (key !== 'bonus-vs-infantry' && key !== 'bonus-vs-large') {
					value += modifier
					total += value
				}
			})
			return total
		}

		const md = (values) => {
			let total = 0
			let p = 0
			let rt = 0

			_.map(values, (value, key) => {
				const modifier = ignoreMount ? 0 : mountModifier(key, true, 'missile-damage')
				
				if (key === 'number-of-projectiles') {
					p = value += modifier
				} else if (key === 'reload-time') {
					rt = value += modifier
				} else if (key !== 'bonus-vs-large' && key !== 'bonus-vs-infantry') {
					total += ( value += modifier )
				}
			})

			if (total !== 0) total = (total * p) / rt
			
			return Math.ceil(total * 10)
		}
		
		switch (key) {
			case 'weapon-strength':
				const wp = ws(values)
				return wp
			case 'missile-damage':
				const mp = md(values)
				return mp
			default:
				return ''
		}
	}

	function renderSubStats(value, key) {

		return _.map(value, (subVal, subKey) => {
			let modifier = 0
			let mountSubVal = mount[`${key}`]
			
			if (isMounted && (typeof mountSubVal) !== 'undefined') {
				const modAmount = mount[`${key}`][`${subKey}`]
				if (typeof modAmount !== 'undefined') {
					modifier = Math.round( modifier += modAmount)
				}
			}

			if (forCompare) {
				const subAmount = subVal + modifier
				const compareTag = renderSubCompareTag(subAmount, key, subKey)
				return (
					<tr key={subKey} className={(subVal + modifier) <= 0 ? 'hidden' : null}>
						<td>{formatTitle(subKey)}</td><td>{subVal += modifier}{compareTag}</td>
					</tr>
				)
			}
			else return (
				<tr key={subKey} className={(subVal + modifier) <= 0 ? 'hidden' : null}>
					<td>{formatTitle(subKey)}</td><td>{subVal += modifier}</td>
				</tr>
			)
		})
	}

	function mountModifier(key, isSub, subKey) {
		let modifier = 0
		if (isMounted) {
			
			const mountKey = isSub ? mount[`${subKey}`] : mount[`${key}`]

			if ((typeof mountKey) !== 'undefined' && isSub) {
				
				const modAmount =  mountKey[`${key}`]
				modifier += modAmount
				
			} else if ((typeof mountKey) !== 'undefined') modifier += mountKey
			
		}
		return modifier
	}

	function excludeKey(key) {
		const keysToExclude = ['name','type','attributes','hasMounts','mounts', 'abilities', 'spells', 'isMultiWizard']

		for (var i = 0; i < keysToExclude.length; i++) {
			if (key === keysToExclude[i]) return true
		}

		return false

	}

	return (
		<table className="unit-stats"><tbody>{renderStats()}</tbody></table>
	);
}

// function getImageFromType(type) {
// 	//["37","38","42","81","83","87","94","112","115"]
// 	switch (type) {
// 		case "37" :
// 			return 'Magical-Attacks'
// 		case "38" :
// 			return 'Flaming-Attacks'
// 		case "42" :
// 			return 'Poison-Attacks'
// 		case "81" :
// 			return 'Armour-Sundering'
// 		case "83" :
// 			return 'Brunt'
// 		case "87" :
// 			return 'Discouraged'
// 		case "94" :
// 			return 'Blinded'
// 		case "112" :
// 			return 'Contaminated'
// 		case "115" :
// 			return 'Weeping-Blade'
// 		default :
// 			return ''
// 	}
// }