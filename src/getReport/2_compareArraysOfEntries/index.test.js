import * as infoCreators from '../infoCreators';
import compareArrays, { findBasedOnLocation, areLocationsEqual, findLineToInsertAfter } from './index';

describe('compareArrays of entries', () => {
	it('correctly returns the answer for lines that should receive OK and DIFFERENT', () => {

			const lData = [
				{
					location: [
						['', 'array'],
						['0', 'string'],
					],
					value: 'John',
				},
				{
					location: [
						['', 'array'],
						['1', 'string'],
					],
					value: 'Mary',
				}
			];

			const rData = [
				{
					location: [
						['', 'array'],
						['0', 'string'],
					],
					value: 'John',
				},
				{
					location: [
						['', 'array'],
						['1', 'string'],
					],
					value: 'Joana',
				}
			];

			const expected = [
				{
					location: [
						['', 'array'],
						['0', 'string'],
					],
					value: 'John',
					info: infoCreators.ok()
				},
				{
					location: [
						['', 'array'],
						['1', 'string'],
					],
					value: 'Mary',
					info: infoCreators.different('Joana')
				}
			];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive DIFFERENT and MISSING', () => {
	})

	it('correctly returns the answer for lines that should receive OK and EXTRANEOUS', () => {
	})

	it('correctly returns the answer for lines that should receive OK and EXTRANEOUS in a more complex case', () => {
	})
})

describe('findLineToInsertAfter', () => {
	it('return the correct index for a object that has a nested object', () => {
		const essential = [
			{
				location: [],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: ['address'],
				name: 'city',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: ['address', 'sub'],
				name: 'subcity',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: ['address'],
				name: 'state',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
		];

		const extraneous = 	{
			location: ['address', 'sub', 'subsub'],
			name: 'state',
			value: 'NY',
			info: infoCreators.extraneous()
		};

		expect(findLineToInsertAfter(essential, extraneous)).toBe(2);
	})
})

describe('findBasedOnLocation', () => {
	it('return the line on the given object', () => {
		const	location = [
			['', 'object'],
			['surname', 'string']
		];

		const rData = [
			{
				location: [
					['', 'object'],
					['name', 'string']
				],
				value: 'Mary',
			},
			{
				location: [
					['', 'object'],
					['surname', 'string']
				],
				value: 'surname',
			}
		];

		expect(findBasedOnLocation(rData, location)).toEqual(rData[1]);
	});
})

describe('areLocationsEqual', () => {
	it('works for a true case', () => {
		const left = [
			['', 'object']
		];

		const right = [
			['', 'object']
		];

		expect(areLocationsEqual(left, right)).toBe(true);
	})

	it('works for a false case', () => {
		const left = [
			['', 'array']
		];

		const right = [
			['', 'object']
		];

		expect(areLocationsEqual(left, right)).toBe(false);
	})

	it('works for a false case, where right side contains left', () => {
		const left = [
			['', 'object']
		];
		const right = [
			['', 'object'],
			['address', 'object']
		];

		expect(areLocationsEqual(left, right)).toBe(false);
	})
})
