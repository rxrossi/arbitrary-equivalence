import * as infoCreators from '../infoCreators';
import colors from 'colors';

export default (lines) => {
	let str='';

	lines.forEach(line => {
		str += objLineToStr(line)+'\n';
	})

	return str;
}

export const objLineToStr = (line) => {

	let str = getStart(line);
	str += getIndent(line)
	str += getEnd(line) //pair, element, opening/closing bracket

	return str;

};

function getEnd({value, info, location}, postProcessVal = defaultPosProcessVal) {

	const [ name, type ] = location[location.length-1];

	const { printValue, printReceived } = postProcessVal(value, type, info);

	let str = colorize(`${name}: `, info);//don't dim name

	if (isElement(location) && !isRoot(location)) { //dim name
		str = colorize(`${name}: `.dim, info);
	} else if (isRoot(location) || isClosingBracket(value)) {//don't add name
		str = '';
	}


	if (printValue) {
		str += colorize(printValue, info);
	}

	if (info.received) {
		str += ' was expected, received '
		str += colorize(`${printReceived}`, info);
	}

	const comma = isOpeningBracket(value) || isRoot(location) ? '' : ',';
	if (comma) {
		str += colorize(comma, info); //add comma if necessary
	}
	return str
};

function defaultPosProcessVal(value, type, info) {
	const printValue = type === 'string' ? `"${value}"` : `${value}`;
	let printReceived = '';

	if (info.received) {
		printReceived = typeof info.received === 'string' ? `"${info.received}"` : info.received;
	}

	return {
		printValue,
		printReceived
	}
}

function isElement(location) {
	const index = location.length-2 > 0 ? location.length-2 : 0;
	const [ name, type ] = location[index];
	return type === 'array'
}

function isRoot(location) {
	return location.length === 1;
}

function getStart ({info}) {
	switch (info.type) {
		case infoCreators.ok().type:
			return colorize('   '.inverse, info);
		case infoCreators.different().type:
			return colorize(' ! '.inverse, info);
		case infoCreators.missing().type:
			return colorize(' + '.inverse, info);
		case infoCreators.extraneous().type:
			return colorize(' - '.inverse, info);
	}
};

function getIndent(line) {
	const str = indent(line.location.length-1);
	return colorize(str, line.info);
};

function isBracket(value) {
	return value === '[' ||
		value === ']' ||
		value === '{' ||
		value === '}'
}

function isOpeningBracket(value) {
	return value === '[' ||
		value === '{'
}

function isClosingBracket(value) {
	return value === ']' ||
		value === '}'
}


export const indent = (level = 0) => {
	let spaces = "——";
	for (var i = 0; i < level; ++i) {
		spaces += "——"
	}
	return spaces+" ";
};

function colorize(str, info) {

	switch (info.type) {
		case infoCreators.ok().type:
			str = str.dim;
			break;
		case infoCreators.different().type:
			str = str.yellow;
			break;
		case infoCreators.missing().type:
			str = str.green;
			break;
		case infoCreators.extraneous().type:
			str = str.red;
			break;
	}

	return str;
};
