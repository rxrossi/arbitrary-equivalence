import addBrackets, {
	getOpeningBracketLines,
	getClosingBracketLines,
	getOverallInfoOfSubset,
	getLinesWithSameStartingLocation
} from './index.js';

import * as infoCreators from '../infoCreators';

describe('addBrackets', () => {
	it('works for a simple object', () => {

		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
				info: infoCreators.ok()
			}
		];

		const expected = [
			{
				location: [
					['', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
				],
				value: '}',
				info: infoCreators.ok()
			},
		];

		const answer = addBrackets(lines);
		expect(answer).toEqual(expected);

	});

	it('works for a simple array', () => {
		const arr = [
			{
				location: [
					['', 'array'],
					['0', 'number'],
				],
				value: 0,
				info: infoCreators.different(1)
			},
			{
				location: [
					['', 'array'],
					['1', 'string'],
				],
				value: 'two',
				info: infoCreators.ok()
			}
		];

		const expected = [
			{
				location: [
					['', 'array'],
				],
				value: '[',
				info: infoCreators.different()
			},
			{
				location: [
					['', 'array'],
					['0', 'number'],
				],
				value: 0,
				info: infoCreators.different(1)
			},
			{
				location: [
					['', 'array'],
					['1', 'string'],
				],
				value: 'two',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'array'],
				],
				value: ']',
				info: infoCreators.different()
			},
		];

		const answer = addBrackets(arr);
		expect(answer).toEqual(expected);
	});

	it('works for a more complex object', () => {
		const arr = [
			{
				location: [
					['', 'array'],
					['0', 'object'],
					['name', 'string']
				],
				value: 'John',
				info: infoCreators.different('Carl')
			},
			{
				location: [
					['', 'array'],
					['1', 'object'],
					['name', 'string']
				],
				value: 'Mary',
				info: infoCreators.ok()
			}
		]

		const expected = [
			{
				location: [
					['', 'array'],
				],
				value: '[',
				info: infoCreators.different()
			},
			{
				location: [
					['', 'array'],
					['0', 'object'],
				],
				value: '{',
				info: infoCreators.different()
			},
			{
				location: [
					['', 'array'],
					['0', 'object'],
					['name', 'string']
				],
				value: 'John',
				info: infoCreators.different('Carl')
			},
			{
				location: [
					['', 'array'],
					['0', 'object'],
				],
				value: '}',
				info: infoCreators.different()
			},
			{
				location: [
					['', 'array'],
					['1', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'array'],
					['1', 'object'],
					['name', 'string']
				],
				value: 'Mary',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'array'],
					['1', 'object'],
				],
				value: '}',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'array'],
				],
				value: ']',
				info: infoCreators.different()
			},
		];

		const answer = addBrackets(arr);
		expect(answer).toEqual(expected);
	});
});

describe('getLinesWithSameStartingLocation', () => {
	it('works when location is root', () => {
		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
			},
			{
				location: [
					['', 'object'],
					['address', 'object'],
					['city', 'string'],
				],
				value: 'Piracicaba',
			}
		];

		const location = [
			['', 'object'],
			['surname', 'string'],
		];

		const expected = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
			},
			{
				location: [
					['', 'object'],
					['address', 'object'],
					['city', 'string'],
				],
				value: 'Piracicaba',
			}
		];

		const answer = getLinesWithSameStartingLocation(location, lines);
		expect(answer).toEqual(expected);
	})

	it("works when location is inside a object's nest", () => {
		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
			},
			{
				location: [
					['', 'object'],
					['address', 'object'],
					['city', 'string'],
				],
				value: 'Piracicaba',
			},
			{
				location: [
					['', 'object'],
					['address', 'object'],
					['State', 'string'],
				],
				value: 'SP',
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
			}
		];

		const location = [
			['', 'object'],
			['address', 'object'],
			['country', 'string'],
		];

		const expected = [
		{
			location: [
				['', 'object'],
				['address', 'object'],
				['city', 'string'],
			],
			value: 'Piracicaba',
		},
			{
				location: [
					['', 'object'],
					['address', 'object'],
					['State', 'string'],
				],
				value: 'SP',
			}
		];

		const answer = getLinesWithSameStartingLocation(location, lines);
		expect(answer).toEqual(expected);
	})
})

describe('getOverallInfoOfSubset', () => {
	it('works for an OK case', () => {

		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
				info: infoCreators.ok()
			}
		];

		const answer = getOverallInfoOfSubset(lines);
		const expected = infoCreators.ok();

		expect(answer).toEqual(expected);
	});

	it('works for an DIFFERENT case with a single pair in the object', () => {

		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.different('Mary')
			}
		];

		const answer = getOverallInfoOfSubset(lines);
		const expected = infoCreators.different();

		expect(answer).toEqual(expected);
	})

	it('works for an DIFFERENT case with multiple lines', () => {

		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.different('Mary')
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
				info: infoCreators.different('Connor')
			},
			{
				location: [
					['', 'object'],
					['age', 'string'],
				],
				value: 30,
				info: infoCreators.ok()
			}
		];

		const answer = getOverallInfoOfSubset(lines);
		const expected = infoCreators.different();
		expect(answer).toEqual(expected);
	});

	it('works for an missing case', () => {

		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.missing()
			},
			{
				location: [
					['', 'object'],
					['surname', 'string'],
				],
				value: 'Doe',
				info: infoCreators.missing()
			},
		];

		const answer = getOverallInfoOfSubset(lines);
		const expected = infoCreators.missing();
		expect(answer).toEqual(expected);

	})
})

describe('getClosingBracketLines', () => {
	it('works when it is the last line of an object', () => {
		const currentLine = {
			location: [
				['', 'object'],
				['name', 'string']
			],
			value: 'John',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'object']
				],
				value: '}',
				info: infoCreators.ok()
			}
		];

		const answer = getClosingBracketLines(currentLine, undefined, [currentLine]);
		expect(answer).toEqual(expected);
	})

	it('works when it is the last line of an array', () => {

		const currentLine = {
			location: [
				['', 'array'],
				['0', 'string']
			],
			value: 'John',
			info: infoCreators.ok()
		};

		const expected = [
		{
			location: [
				['', 'array'],
			],
			value: ']',
			info: infoCreators.ok()
		}
		];

		const answer = getClosingBracketLines(currentLine, undefined, [currentLine]);
		// console.log(answer[0])
		expect(answer).toEqual(expected);
	})

	it('works when it is the last line of an object and has to close two brackets', () => {
		const currentLine = {
			location: [
				['', 'object'],
				['address', 'object'],
				['city', 'string']
			],
			value: 'NYC',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'object'],
					['address', 'object']
				],
				value: '}',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object']
				],
				value: '}',
				info: infoCreators.ok()
			}
		];

		const answer = getClosingBracketLines(currentLine, undefined, [currentLine]);
		expect(answer).toEqual(expected);
	})

	it('works when both lines are given and there is no need to close', () => {
		const lines = [
			{
				location: [
					['', 'object'],
					['name', 'string']
				],
				value: 'John',
			},
			{
				location: [
					['', 'object'],
					['city', 'string'],
				],
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

	it('correctly closes two brackets using the correct info (ok, different, missing or extraneous)', () => {
		const arr = [
			{
				location: [
					['', 'array'],
					['0', 'object'],
					['name', 'string']
				],
				value: 'John',
				info: infoCreators.different('Carl')
			},
			{
				location: [
					['', 'array'],
					['1', 'object'],
					['name', 'string']
				],
				value: 'Mary',
				info: infoCreators.ok()
			}
		];

		const previousLine = arr[1];

		const answer = getClosingBracketLines(previousLine, undefined, arr);
		const expected = [
			{
				location: [
					['', 'array'],
					['1', 'object'],
				],
				value: '}',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'array'],
				],
				value: ']',
				info: infoCreators.different()
			}
		];

		expect(answer).toEqual(expected);

	})
})

describe('getOpeningBracketLines', () => {

	it('works when it is the first line of an object', () => {
		const currentLine = {
			location: [
				['', 'object'],
				['name', 'string'],
			],
			value: 'John',
			info: infoCreators.ok()
		};
		const expected = [
			{
				location: [
					['', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine, [currentLine]);
		expect(answer).toEqual(expected);
	})

	it('works when it is the first line of an array', () => {
		const currentLine = {
			location: [
				['', 'array'],
				['0', 'string'],
			],
			value: 'John',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'array'],
				],
				value: '[',
				info: infoCreators.ok()
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine, [currentLine]);
		expect(answer).toEqual(expected);
	})

	it('works when opening a nest directly', () => {
		const currentLine = {
			location: [
				['', 'object'],
				['address', 'object'],
				['city', 'string'],
			],
			value: 'Piracicaba',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'object']
				],
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['address', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			}
		];

		const answer = getOpeningBracketLines(undefined, currentLine, [currentLine]);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when it is opening in the middle of an object ', () => {
		const previousLine = {
			location: [
				['', 'object'],
				['name', 'string'],
			],
			value: 'John',
			info: infoCreators.ok()
		};

		const currentLine = {
			location: [
				['', 'object'],
				['address', 'object'],
				['city', 'string'],
			],
			value: 'Piracicaba',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'object'],
					['address', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			}
		];

		const answer = getOpeningBracketLines(previousLine, currentLine, [previousLine, currentLine]);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when it is opening two nests from changing locations', () => {
		const previousLine = {
			location: [
				['', 'object'],
				['differentAddress', 'object'],
				['city', 'string']
			],
			value: 'dCITY',
			info: infoCreators.ok()
		};

		const currentLine = {
			location: [
				['', 'object'],
				['regularAddress', 'object'],
				['regularSubAddress', 'object'],
				['city', 'string']
			],
			value: 'NYC',
			info: infoCreators.ok()
		};

		const expected = [
			{
				location: [
					['', 'object'],
					['regularAddress', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			},
			{
				location: [
					['', 'object'],
					['regularAddress', 'object'],
					['regularSubAddress', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			},
		];

		const answer = getOpeningBracketLines(previousLine, currentLine, [currentLine, previousLine]);
		// console.log(JSON.stringify(answer, null, 2))
		expect(answer).toEqual(expected);
	})

	it('works when there is no need to add brackets', () => {
		const previousLine = {
			location: [
				['', 'array'],
				['0', 'string'],
			],
			value: 'John',
			info: infoCreators.ok()
		};
		const currentLine = {
			location: [
				['', 'array'],
				['1', 'string'],
			],
			value: 'Mary',
			info: infoCreators.ok()
		};

		const expected = [];

		const answer = getOpeningBracketLines(previousLine, currentLine, [currentLine, previousLine]);
		expect(answer).toEqual(expected);
	})

})
