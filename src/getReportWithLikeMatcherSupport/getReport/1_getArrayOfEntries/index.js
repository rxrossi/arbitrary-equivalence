function getStructure (structure, preProcessLeft = x => x, arr = [], currentLocation) {

	structure = preProcessLeft(structure)

	if (!currentLocation) {
		currentLocation = [
			['', getType(structure)]
		];
	}

	Object.entries(structure).forEach(([name, value]) => {

		if (getType(value) === 'object' || getType(value) === 'array') {
			return getStructure(
				value,
				preProcessLeft,
				arr,
				[...currentLocation, createLocation(name, value)]
			)
		}
		arr.push(createLine(name, value, structure, currentLocation))
	})

	return arr;
}

export default getStructure;


function createLine (name, value, structure, location) {
	location = [...location, createLocation(name, value)]
	return {
		location: location,
		value,
	}
}


function createLocation(location, structure) {
	// console.log(location, structure)
	return [location, getType(structure)]
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

	if (
		(typeof value).toLowerCase() !==
		(value.constructor.name).toLowerCase()
	) {
		return value.constructor.name;
	}

	return typeof value;
}
