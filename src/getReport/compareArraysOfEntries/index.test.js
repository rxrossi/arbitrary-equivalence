import * as infoCreators from '../infoCreators';
import compareArrays, { findBasedOnLocation, areArraysEqual, findLineToInsertAfter } from './index';

describe('compareArrays of entries', () => {
	it('correctly returns the answer for lines that should receive OK and DIFFERENT', () => {

		const lData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [],
				name: 'name',
				value: 'Mary',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			}
		];

		const expected = [
			{
				location: [],
				name: 'name',
				value: 'John',
				info: infoCreators.different('Mary')
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			}
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive DIFFERENT and MISSING', () => {

		const lData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [],
				name: 'surname',
				value: 'Watson',
			}
		];

		const expected = [
			{
				location: [],
				name: 'name',
				value: 'John',
				info: infoCreators.missing()
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.different('Watson')
			}
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive OK and EXTRANEOUS', () => {

		const lData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: ['address'],
				name: 'city',
				value: 'NY',
			}
		];


		const expected = [
			{
				location: [],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: ['address'],
				name: 'city',
				value: 'NY',
				info: infoCreators.extraneous()
			}
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive OK and EXTRANEOUS in a more complex case', () => {

		const lData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: ['address'],
				name: 'city',
				value: 'NY',
			},
			{
				location: ['wife'],
				name: 'name',
				value: 'Joana',
			},

		];

		const rData = [
			{
				location: [],
				name: 'name',
				value: 'John',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: ['address'],
				name: 'state',
				value: 'NY',
			},
			{
				location: ['address'],
					name: 'city',
					value: 'NY',
			},
			{
				location: ['wife'],
				name: 'name',
				value: 'Joana',
			},

		];



		const expected = [
			{
				location: [],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: ['address'],
				name: 'city',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: ['address'],
				name: 'state',
				value: 'NY',
				info: infoCreators.extraneous()
			},
			{
				location: ['wife'],
				name: 'name',
				value: 'Joana',
				info: infoCreators.ok()
			},
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
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
		const line = {
			location: [],
			name: 'name',
			value: 'John',
		};

		const rData = [
			{
				location: [],
				name: 'name',
				value: 'Mary',
			},
			{
				location: [],
				name: 'surname',
				value: 'Doe',
			}
		];

		expect(findBasedOnLocation(rData, line)).toEqual(rData[0]);
	});
})

describe('areArraysEqual', () => {
	it('works for a true case', () => {
		const left = [
			'one',
			'two'
		];

		const right = [
			'one',
			'two'
		];

		expect(areArraysEqual(left, right)).toBe(true);
	})

	it('works for a false case', () => {
		const left = [
			'one',
			'three'
		];

		const right = [
			'one',
			'two'
		];

		expect(areArraysEqual(left, right)).toBe(false);
	})

	it('works for a false case, where right side contains left', () => {
		const left = [
			'one',
			'two'
		];

		const right = [
			'one',
			'two',
			'three'
		];

		expect(areArraysEqual(left, right)).toBe(false);
	})
})
