import * as infoCreators from '../infoCreators';

export default (lines) => {
	const returnLines = []

	lines.forEach((line, i, arr) => {

		returnLines.push(...getOpeningBracketLines(
			arr[i-1],
			arr[i],
			arr
		))

		returnLines.push(line)

		returnLines.push(...getClosingBracketLines(
			arr[i],
			arr[i+1],
			arr
		))
	})

	return returnLines;

};

export const getLinesWithSameStartingLocation = (givenLocArr, lines) => {
	givenLocArr = keepOnlyArrayAndObjects(givenLocArr);

	return lines.filter((line) => {
		const slicedLoc = line.location.slice(0, givenLocArr.length);
		return givenLocArr.every(([gPart, gType]) =>
			slicedLoc.find(([partFromLines, typeFromLines]) =>
				gPart === partFromLines &&
				gType === typeFromLines
			)
		)
	})
};

export const getOverallInfoOfSubset = (lines, finalInfo) => {
	lines.forEach(({info}) => {
		if (!finalInfo) {
			finalInfo = info;
		} else if (finalInfo.type !== info.type) {
			finalInfo = infoCreators.different();
		}
	})
	if (finalInfo.type === infoCreators.different().type) {
		return infoCreators.different();
	}
	return finalInfo;
};

export const getOpeningBracketLines = (
	previousLine = { location: [] },
	currentLine,
	arr
) => {

	const currentLineLoc = keepOnlyArrayAndObjects(currentLine.location);

	const nestsToOpen = currentLineLoc.filter(([partial, type]) =>
		!previousLine.location.find(([prevPartial, prevType]) =>
			prevPartial === partial && prevType === type
		)
	);

	return [
		...createLine(currentLineLoc, nestsToOpen, 'open', arr)
	]

};

export const getClosingBracketLines = (
	currentLine,
	nextLine = { location: []},
	arr
) => {


	const currentLineLoc = keepOnlyArrayAndObjects(currentLine.location);

	const nestsToClose = currentLineLoc.filter(([partial, type]) =>
		!nextLine.location.find(([nextPartial, nextType]) =>
			partial === nextPartial && type === nextType
		)
	);

	return [
		...createLine(currentLineLoc, nestsToClose, 'close', arr).slice().reverse()
	]

}

function createLine(
	fullLocationArr, nestsToOpen, closeOrOpen, arr, returnLines = []
) {

	nestsToOpen.forEach((item, i) => {

		const keep = i + 1 + ( fullLocationArr.length - nestsToOpen.length)

		const [thisPartial, thisType] = nestsToOpen[i];

		const info = getOverallInfoOfSubset(
			getLinesWithSameStartingLocation(fullLocationArr.slice(0, keep), arr)
		)

		returnLines.push({
			location: fullLocationArr.slice(0, keep),
			value: putBracket(thisType, closeOrOpen),
			info
		})

	})

	return returnLines;

	function putBracket(type, closeOrOpen) {
		if (type === 'object') {
			if (closeOrOpen === 'open') {
				return '{'
			}
			return '}'
		}

		if (closeOrOpen === 'open') {
			return '['
		}
		return ']'
	}

}

export function readInfoFromLines(lines) {
	return infoCreators.ok();
}

const keepOnlyArrayAndObjects = location =>
	location.filter(([partial, type]) => type === 'array' || type === 'object')
