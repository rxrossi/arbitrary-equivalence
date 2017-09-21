import colors from 'colors';

import * as infoCreators from '../infoCreators';
import { indent, objLineToStr } from './index';

describe('reportToConsoleLog (multiple lines)', () => {
	//get a multiple line report to try
	//at first try to just console.log it, don't write a test
})

describe('reportToConsoleLog single line', () => {
	describe('Pairs and elements, nested or on root', () => {

		it('prints a normal pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			};

			const expected =
				'   '.inverse.dim
				+
				indent(1).dim
				+
				'name: John'.dim;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a missing pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.missing()
			};

			const expected =
				' + '.inverse.green
				+
				indent(1).green
				+
				'name: John'.green;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a extraneous pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.extraneous()
			};

			const expected =
				' - '.inverse.red
				+
				indent(1).red
				+
				'name: John'.red;

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a different pair correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
				info: infoCreators.different('Mary')
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'name: John'.yellow
				+
				' '
				+
				'was expected, received'
				+
				' '
				+
				'Mary'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a pair that is inside a one level deep nest', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NYC',
				info: infoCreators.missing()
			};

			const expected =
				' + '.inverse.green
				+
				indent(2).green
				+
				'city: NYC'.green

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a pair that is inside two level deep nest', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
					{partial: 'subAddress', type: 'object'}
				],
				name: 'subCity',
				value: 'subCityVal',
				info: infoCreators.different('NYC')
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(3).yellow
				+
				'subCity: subCityVal'.yellow
				+
				' was expected, received '
				+
				'NYC'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a element on the root correctly', () => {
			const line = {
				location: [
					{partial: '', type: 'array'}
				],
				name: '',
				value: 'John',
				info: infoCreators.different('Mary')
			}

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'John'.yellow
				+
				' was expected, received '
				+
				'Mary'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);

		})

	})

	describe('Opening brackets', () => {

		it('prints a opening bracket correctly', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
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

		it('prints a opening object one level deep', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'address',
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
					{partial: '', type: 'object'},
					{partial: 'children', type: 'array'}
				],
				name: 'children',
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

	})

	describe('Closing Brackets', () => {
		it('prints the closing line and root object', () => {
			const line =	{
				location: [
					{partial: '', type: 'object'}
				],
				name: '',
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

		it('prints a closing object one level deep', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: '',
				value: '}',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				'}'.yellow

			// console.log(expected)
			const answer = objLineToStr(line);
			// console.log(answer);
			expect(answer).toEqual(expected);
		})

		it('prints a closing array one level deep', () => {
			const line = {
				location: [
					{partial: '', type: 'object'},
					{partial: 'children', type: 'array'}
				],
				name: '',
				value: ']',
				info: infoCreators.different()
			};

			const expected =
				' ! '.inverse.yellow
				+
				indent(1).yellow
				+
				']'.yellow

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
