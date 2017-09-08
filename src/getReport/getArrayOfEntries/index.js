function getStructure (structure, arr = [], currentLocation) {

	if (!currentLocation) {
		currentLocation = [{
			partial: '',
			type: getType(structure)
		}]
	}

	Object.entries(structure).forEach(([name, value]) => {
		if (typeof value === 'object') {
			// console.log(value)
			return getStructure(value, arr, [...currentLocation, createLocation(name, value)])
		}
		arr.push(createLine(name, value, structure, currentLocation))
	})

	return arr;
}

function createLine (name, value, structure, location) {
	if (isRegularElement(structure)) {
		location = [...location, createLocation(name, name)]
		name = ''
	}
	return {
		location: location,
		name,
		value,
	}
}

export default getStructure;

function createLocation(location, structure) {
	// console.log(location, structure)
	return {
		partial: location,
		type: getType(structure)
	}
}

function getValueByPath (obj, arrOfPath) {
	if (!arrOfPath.length)
		return obj;

	let prop;

	for (var i = 0, iLen = arrOfPath.length - 1; i < iLen; i++) {
		prop = arrOfPath[i];
		var candidate = obj[prop];
		if (candidate !== undefined) {
			obj = candidate;
		} else {
			break;
		}
	}
	return obj[arrOfPath[i]];
}

function getType (value) {
	if (Array.isArray(value)) {
		return 'array';
	}
	return typeof value;
}

function isRegularElement(value) {
	if (getType(value) === 'array') {
		return true
	}
	return false;
}
