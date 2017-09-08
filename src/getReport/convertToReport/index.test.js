import {
	addBrackets,
	getOpeningBracketLines,
	getClosingBracketLines,
	getOverallInfoOfSubset,
	getLinesWithSameStartingLocation
} from './index.js';

import * as infoCreators from '../infoCreators';

describe('convertToReport', () => {

})

describe('getLinesWithSameStartingLocation', () => {
	it('works when location is root', () => {
		const location = [
			{partial: '', type: 'object'}
		];

		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '}',
				info: infoCreators.ok()
			}
		];

		expect(getLinesWithSameStartingLocation(location, lines)).toEqual(lines);
	})

	it('works when location is a nest', () => {
		const location = [
			{partial: '', type: 'object'},
			{partial: 'address', type: 'object'},
		];

		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'addtionalInfo',
				value: 'ap23',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			}
		];

		const expected = [
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'addtionalInfo',
				value: 'ap23',
				info: infoCreators.ok()
			},
		];

		const answer = getLinesWithSameStartingLocation(location, lines);
		// console.log(JSON.stringify(answer, null, 2));
		expect(answer).toEqual(expected);
	})
})

describe('addBrackets', () => {
	it('works for a simple object', () => {

		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			}
		];

		const expected = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '}',
				info: infoCreators.ok()
			}
		];

		const answer = addBrackets(lines);

		expect(answer).toEqual(expected);
	});

	it('works for a more complex object', () => {

		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.different('DC')
			}
		];

		const expected = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
				info: infoCreators.different()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'address',
				value: '{',
				info: infoCreators.different()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.different('DC')
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: '',
				value: '}',
				info: infoCreators.different()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
					name: '',
					value: '}',
					info: infoCreators.different()
			}
		];

		const answer = addBrackets(lines);
		// console.log(JSON.stringify(answer, null, 2));

		expect(answer).toEqual(expected);
	})
})

describe('getOverallInfoOfSubset', () => {
	it('works for an OK case', () => {
		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'age',
				value: 36,
				info: infoCreators.ok()
			},
		];
		const answer = getOverallInfoOfSubset(lines);
		expect(answer).toEqual(infoCreators.ok());
	})

	it('works for an DIFFERENT case', () => {
		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.different('Mary')
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'age',
				value: 36,
				info: infoCreators.ok()
			},
		];
		const answer = getOverallInfoOfSubset(lines);
		expect(answer).toEqual(infoCreators.different());
	});

	it('works for an missing case', () => {
		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.missing()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.missing()
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'age',
				value: 36,
				info: infoCreators.missing()
			},
		];
		const answer = getOverallInfoOfSubset(lines);
		expect(answer).toEqual(infoCreators.missing());
	})
})

describe('getClosingBracketLines', () => {
	it('works when it is the last line of an object', () => {
		const currentLine = {
			location: [
				{partial: '', type: 'object'}
			],
			name: 'name',
			value: 'John',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '}',
			}
		];

		const answer = getClosingBracketLines(currentLine, undefined);
		expect(answer).toEqual(expected);
	})

	it('works when it is the last line of an object', () => {
		const currentLine = {
			location: [
				{partial: '', type: 'object'},
				{partial: 'address', type: 'object'}
			],
			name: 'city',
			value: 'NYC',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: '',
				value: '}',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '}',
			}
		];

		const answer = getClosingBracketLines(currentLine, undefined);
		expect(answer).toEqual(expected);
	})

	it('works when both lines are given', () => {
		const lines = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
			}
		];

		const expected = [];

		const info = {
			info: infoCreators.ok()
		};

		const answer = getClosingBracketLines(lines[0], lines[1], info);
		// console.log(JSON.stringify(answer, null, 2));
		expect(answer).toEqual(expected);
	})
})

describe('getOpeningBracketLines', () => {
	it('works when it is the first line of an object', () => {
		const currentLine = {
			location: [
				{partial: '', type: 'object'}
			],
			name: 'name',
			value: 'John',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine);
		expect(answer).toEqual(expected);
	})

	it('works when it is the first line of an array', () => {
		const currentLine = {
			location: [
				{partial: '', type: 'array'}
			],
			name: '',
			value: 'John',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'array'}
				],
				name: '',
				value: '[',
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine);
		expect(answer).toEqual(expected);
	})

	it('works when opening a nest directly', () => {
		const currentLine = {
			location: [
				{partial: '', type: 'object'},
				{partial: 'address', type: 'object'}
			],
			name: 'cty',
			value: 'NYC',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
				value: '{',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'address',
				value: '{',
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when it is opening in the middle of an object ', () => {
		const previousLine = {
			location: [
				{partial: '', type: 'object'}
			],
			name: 'name',
			value: 'John',
		};

		const currentLine = {
			location: [
				{partial: '', type: 'object'},
				{partial: 'address', type: 'object'}
			],
			name: 'city',
			value: 'NYC',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'address',
				value: '{',
			}
		];

		const answer = getOpeningBracketLines(previousLine, currentLine);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when it is opening in the from changing locations', () => {
		const previousLine = {
			location: [
				{partial: '', type: 'object'},
				{partial: 'differentAddress', type: 'object'}
			],
			name: 'city',
			value: 'diff',
		};

		const currentLine = {
			location: [
				{partial: '', type: 'object'},
				{partial: 'address', type: 'object'},
				{partial: 'subAddress', type: 'object'}
			],
			name: 'city',
			value: 'NYC',
		};

		const expected = [
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'address',
				value: '{',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'subAddress',
				value: '{',
			},
		];

		const answer = getOpeningBracketLines(previousLine, currentLine);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when there is no need to add brackets', () => {
		const previousLine = {
			location: [
				{partial: '', type: 'array'}
			],
			name: '',
			value: 'John',
		};
		const currentLine = {
			location: [
				{partial: '', type: 'array'}
			],
			name: '',
			value: 'Mary',
		};

		const expected = [];

		const answer = getOpeningBracketLines(previousLine, currentLine);
		expect(answer).toEqual(expected);
	})

})
