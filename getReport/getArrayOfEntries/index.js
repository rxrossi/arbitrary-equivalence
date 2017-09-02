export const types = {
	pair: 'pair',
	element: 'element'
}

function getStructure (structure, arr = [], currentLocation = []) {
	Object.entries(structure).forEach(([name, value]) => {
		if (typeof value === 'object') {
			return getStructure(value, arr, [...currentLocation, name])
		}
		arr.push(createLine(name, value, structure, currentLocation))
	})
	return arr;
}

function createLine (name, value, structure, location) {
	const type = getTypeOfLine(structure);
	return {
		location,
		name,
		value,
		type
	}
}

function getTypeOfLine(structure) {
	if (Array.isArray(structure)) {
		return types.element
	}
	if (typeof structure === 'object') {
		return types.pair;
	}
}

export default getStructure;
