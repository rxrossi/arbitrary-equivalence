import * as infoCreators from '../infoCreators';

export default (lData, rData) => {

	const essential = lData.map((left) => {
		const right = findBasedOnLocation(rData, left);
		if (!right) {
			return Object.assign({}, left, { info: infoCreators.missing() })
		}

		if (left.value === right.value) {
			return Object.assign({}, left, { info: infoCreators.ok() })
		} else {
			return Object.assign({}, left, { info: infoCreators.different(right.value) });
		}

	})

	const extraneous = rData.filter(right => {
		return !findBasedOnLocation(lData, right);
	}).map((line) => {
		return Object.assign({}, line, { info: infoCreators.extraneous() })
	})

	const finalAnswer = joinArrays(essential, extraneous)

	return finalAnswer;
}

export const findBasedOnLocation = (arr, item) => {
	return arr.find(({ location, name }) => {
		return (areArraysEqual(location, item.location)) && (name === item.name)
	})
}

export const areArraysEqual = (left, right) => {
	if (left.length !== right.length) {
		return false;
	}
	return left.every((element) => {
		return right.indexOf(element) >= 0;
	})
};

export const joinArrays = (left, right) => {
	right.forEach((line) => {
		const lineToInsert = findLineToInsertAfter(left, line) +1;
		left = [
			...left.slice(0, lineToInsert),
			line,
			...left.slice(lineToInsert)
		]
	})
	return left
}

export const findLineToInsertAfter = (arr, { location: extraneousLocation }) => {
	let matchingLineIndex;

	for (var i = 0; i <= extraneousLocation.length; ++i) {
		const partialExtraneousLocation = extraneousLocation.slice(0,i);

		arr.forEach((line, k, arr) => {
			if (areArraysEqual(line.location, partialExtraneousLocation)) {
				matchingLineIndex = k
			}
		})
	}

	return matchingLineIndex || arr.length -1;

}
