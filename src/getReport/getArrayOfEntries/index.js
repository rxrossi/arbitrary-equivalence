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
	return {
		location,
		name,
		value,
	}
}

export default getStructure;
