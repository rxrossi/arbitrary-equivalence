import * as infoCreators from '../infoCreators';

export default (lData, rData, comparisonFn = defaultComparisonFunction) => {

	let errorCount = 0;

	// console.log(lData[1])

	const essential = lData.map((left) => {
		const right = findBasedOnLocation(rData, left.location);
		if (!right) {
			errorCount += 1;
			return Object.assign({}, left, { info: infoCreators.missing() })
		}

		if (comparisonFn(left.value, right.value)) {
			return Object.assign({}, left, { info: infoCreators.ok() })
		} else {
			errorCount += 1;
			return Object.assign({}, left, { info: infoCreators.different(right.value) });
		}

	})

	const extraneous = rData.filter(right => {
		return !findBasedOnLocation(lData, right.location);
	}).map((line) => {
		return Object.assign({}, line, { info: infoCreators.extraneous() })
	})

	errorCount += extraneous.length;

	const finalAnswer = joinArrays(essential, extraneous)

	return {
		arr: finalAnswer,
		errorCount
	};
}

const defaultComparisonFunction = (lVal, rVal) => lVal === rVal

export const findBasedOnLocation = (arr, desiredLocation) => arr.find(({ location }) => areLocationsEqual(location, desiredLocation))

export const areLocationsEqual = (left, right) => {
	if (left.length !== right.length) {
		return false;
	}
	return left.every(([lPartial, lType]) => right.find(([rPartial, rType]) => lPartial === rPartial))
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

	extraneousLocation = keepOnlyArrayAndObjects(extraneousLocation);
	// console.log(extraneousLocation)
	for (var i = 0; i <= extraneousLocation.length; ++i) {
		const partialExtraneousLocation = extraneousLocation.slice(0,i);

		arr.forEach((line, k, arr) => {
			if (areLocationsEqual(keepOnlyArrayAndObjects(line.location), partialExtraneousLocation)) {
				matchingLineIndex = k
			}
		})
	}

	if (matchingLineIndex === 0) {
		return 0;
	}

	return matchingLineIndex || arr.length -1;
}

const keepOnlyArrayAndObjects = location =>
	location.filter(([partial, type]) => type === 'array' || type === 'object')

