import * as infoCreators from '../infoCreators';
import getArrayOfEntries from '../1_getArrayOfEntries';

export default (lData, rData, preProcessLeft, comparisonFn = defaultComparisonFunction) => {
	// no need for duplicated args, I could call 1_getArraysOfEntries directly from here

	let lArrOfLines = getArrayOfEntries(lData, preProcessLeft);
	let rArrOfLines = getArrayOfEntries(rData);

	let errorCount = 0;

	const essential = lArrOfLines.map((left) => { //I'm thinking about extracting this
		const right = findBasedOnLocation(rData, left.location);
		const { ok, printableValue, printableReceived, appendStr } = comparisonFn(left.value, right)
		if (!right) {
			errorCount += 1;
			return Object.assign({}, left,
				{ info: infoCreators.missing() },
				{ printableValue, printableReceived, appendStr }
			)
		}


		if (ok) {
			return Object.assign({}, left,
				{ info: infoCreators.ok() },
				{ printableValue, printableReceived, appendStr }
			)
		} else {
			errorCount += 1;
			return Object.assign({}, left,
				{ info: infoCreators.different(right) },
				{ printableValue, printableReceived, appendStr }
			);
		}

	})

	const extraneous = rArrOfLines.filter(right => { //I'm thinking about extracting this one
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

const defaultComparisonFunction = (lVal, rVal) => {
	return {
		ok: lVal === rVal,
		printableValue: lVal,
		printableReceived: rVal,
		appendStr: undefined
	}
}

export function findBasedOnLocation (dataStructure, location) {
	const relevantPartOfLocation = location.map(loc => loc[0]).slice(1);
	return deepFind (dataStructure, relevantPartOfLocation)
}

function deepFind (obj, path) {
    for (var i=0, len=path.length; i<len; i++){
        obj = obj[path[i]];
    };
    return obj;
};

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

