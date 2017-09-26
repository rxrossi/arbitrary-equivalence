import colors from 'colors';

import * as infoCreators from '../infoCreators';
import linesArrToStr, { indent, objLineToStr } from './index';

describe('reportToConsoleLog (multiple lines)', () => {
	//get a multiple line report to try
	//at first try to just console.log it, don't write a test
	it('a single pair object', () => {
		const lines = [
			{
				location: [
					['', 'object'],
				],
				value: '{',
				info: infoCreators.missing()
			},
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
				],
				value: '}',
				info: infoCreators.missing()
			}
		];

		const expectedPair =
			' + '.inverse.green
			+
			indent(1).green
			+
			'name: "John",'.green;

		const expectedOpening =
			' + '.inverse.green
			+
			indent().green
			+
			'{'.green;

		const expectedClosing =
			' + '.inverse.green
			+
			indent().green
			+
			'}'.green;

		const expected =
			expectedOpening+'\n'+
			expectedPair+'\n'+
			expectedClosing+'\n';

		const answer = linesArrToStr(lines);

		// console.log(answer)
		// console.log(expected);
		expect(answer).toEqual(expected);

	})
})

describe('reportToConsoleLog single line', () => {
	describe('Pairs and elements, nested or on root', () => {

		it('prints a normal pair correctly', () => {
			const line =	{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent(1).dim
				+
				'name: "John",'.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a missing pair correctly', () => {
			const line =	{
				location: [
					['', 'object'],
					['name', 'string']
				],
				value: 'John',
				info: infoCreators.missing()
			};

			const expected =
				' + '.inverse.green
				+
				indent(1).green
				+
				'name: "John",'.green;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a extraneous pair correctly', () => {
			const line =	{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.extraneous()
			};

			const expected =
				' - '.inverse.red
				+
				indent(1).red
				+
				'name: "John",'.red;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a different pair correctly', () => {
			const line =	{
				location: [
					['', 'object'],
					['name', 'string'],
				],
				value: 'John',
				info: infoCreators.different('Mary')
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'name: "John"'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'"Mary",'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a different pair correctly when the "received" value is a number', () => {
			const line =	{
				location: [
					['', 'object'],
					['age', 'number'],
				],
				value: 30,
				info: infoCreators.different(31)
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'age: 30'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'31,'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);

		})

		it('prints a pair that is inside a one level deep nest', () => {
			const line = {
				location: [
					['', 'object'],
					['address', 'object'],
					['city', 'string'],
				],
				value: 'NYC',
				info: infoCreators.missing()
			};

			const expected =
				' + '.inverse.green
				+
				indent(2).green
				+
				'city: "NYC",'.green

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a pair that is inside two level deep nest', () => {
			const line = {
				location: [
					['', 'object'],
					['address', 'object'],
					['subAddress', 'object'],
					['subCity', 'string'],
				],
				value: 'subCityVal',
				info: infoCreators.different('NYC')
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(3).yellow
				+
				'subCity: "subCityVal"'.yellow
				+
				' was expected, received '
				+
				'"NYC",'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a element on the root correctly', () => {
			const line = {
				location: [
					['', 'array'],
					['0', 'string']
				],
				value: 'John',
				info: infoCreators.different('Mary')
			}

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'0: '.dim.yellow
				+
				'"John"'.yellow
				+
				' was expected, received '
				+
				'"Mary",'.yellow

			const answer = objLineToStr(line);
			// console.log(expected)
			// console.log(answer);
			expect(answer).toEqual(expected);

		})


	})

	describe('Opening brackets', () => {

		it('prints a opening bracket correctly on an object', () => {
			const line =	{
				location: [
					['', 'object'],
				],
				value: '{',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent().dim
				+
				'{'.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a opening bracket correctly on an array', () => {
			const line =	{
				location: [
					['', 'array'],
				],
				value: '[',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent().dim
				+
				'['.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a opening object one level deep', () => {
			const line = {
				location: [
					['', 'object'],
					['address', 'object'],
				],
				value: '{',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'address: {'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('print a opening array two levels deep', () => {
			const line = {
				location: [
					['', 'object'],
					['children', 'array'],
				],
				value: '[',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'children: ['.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints an array inside of an array', () => {
			const line = {
				location: [
					['', 'array'],
					['0', 'array'],
				],
				name: '0',
				value: '[',
				info: infoCreators.different()
			};

			const answer = objLineToStr(line);

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'0: '.dim.yellow
				+
				'['.yellow;

			// console.log(expected);
			expect(answer).toEqual(expected);
			// console.log(answer);
		});
	});

	describe('Closing Brackets', () => {
		it('prints the closing line and root object', () => {
			const line =	{
				location: [
					['', 'object'],
				],
				value: '}',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent().dim
				+
				'}'.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a opening bracket correctly on an array', () => {
			const line =	{
				location: [
					['', 'array'],
				],
				value: ']',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent().dim
				+
				']'.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a closing object one level deep', () => {
			const line = {
				location: [
					['', 'object'],
					['address', 'object'],
				],
				value: '}',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'},'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a closing array one level deep', () => {
			const line = {
				location: [
					['', 'object'],
					['children', 'array'],
				],
				value: ']',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'],'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})
	})

})

describe('Indent function', () => {
	it('works for root brackets', () => {
		expect(indent(0)).toBe('—— ');
		expect(indent()).toBe('—— ');
	})

	it('works for root', () => {
		expect(indent(1)).toBe('———— ');
	})

	it('works for one level nest', () => {
		expect(indent(2)).toBe('—————— ');
	})
})
