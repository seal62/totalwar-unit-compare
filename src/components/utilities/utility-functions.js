import _ from 'lodash';

export function formatTitle(toFormat) {
  // console.log( toFormat )
	let formatStr = (typeof toFormat) === 'string' ? toFormat.replace('-', ' ') : ''

	return _.startCase(formatStr)
}

export function unformatTitle(toFormat) {
	let formatStr = _.lowerCase(toFormat)
	return formatStr.replace(' ', '-')
}

export function importImages(r) {
	let images = {}
	r.keys().map((item, index) => {
		images[item.replace('./','')] = r(item)
	})
	return images
}