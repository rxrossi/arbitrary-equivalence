import * as infoCreators from '../infoCreators';

export default (line) => {

	let str = getStart(line);
	str += getIndent(line)
	str += getEnd(line) //pair, element, opening/closing bracket

	return str;

}

function getEnd({name, value, info, location}) {

	let str = colorize(`${name}: ${value}`, info);

	if (name === '') {
		str = colorize(`${value}`, info);
	}

	if (info.received) {
		str += ' was expected, received '
		str += colorize(info.received, info);
	}

	return str
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
	if (isBracket(line)) {
		str = indent(line.location.length -1)
	} else {
		str = indent(line.location.length);
	}

	return colorize(str, line.info);

	function isBracket({value}) {
		return value === '[' ||
			value === ']' ||
			value === '{' ||
			value === '}'
	}
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
}
