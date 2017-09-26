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

function getEnd({value, info, location}) {

	const [ name, type ] = location[location.length-1];

	const printValue = type === 'string' ? `"${value}"` : value;

	const comma = info.received || isOpeningBracket(value) || isRoot(location) ? '' : ','

	let str = colorize(`${name}: ${printValue}${comma}`, info);

	if (isElement(location)) {
		str = colorize(`${name}: `.dim, info)+colorize(`${printValue}`, info);
	} else if (isRoot(location) || isClosingBracket(value)) {
		str = colorize(`${printValue}${comma}`, info);
	}


	if (info.received) {
		const received = typeof info.received === 'string' ? `"${info.received}"` : info.received;
		str += ' was expected, received '
		str += colorize(`${received},`, info);
	}

	return str
};

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
	let str;
	// if (isBracket(line.value)) {
	// 	str = indent(line.location.length -1)
	// } else {
		str = indent(line.location.length-1);
	// }

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
