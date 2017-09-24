import * as infoCreators from '../infoCreators';
import compareArrays, { findBasedOnLocation, areLocationsEqual, findLineToInsertAfter } from './index';

describe('compareArrays of entries', () => {
	it('correctly returns the answer for lines that should receive OK and DIFFERENT', () => {

		const lData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'Mary',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			}
		];

		const expected = [
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
			}
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive DIFFERENT and MISSING', () => {

		const lData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Watson',
			}
		];

		const expected = [
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
				info: infoCreators.different('Watson')
			}
		];

		expect(compareArrays(lData, rData)).toEqual(expected);
	})

	it('correctly returns the answer for lines that should receive OK and EXTRANEOUS', () => {

		const lData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			}
		];

		const rData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
				name: 'city',
				value: 'NY',
			}
		];


		const expected = [
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
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'}
				],
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
				location: [
					{partial: '', type: 'object'},
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'},
				],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
				],
				name: 'city',
				value: 'NY',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'wife', type: 'object'},
				],
				name: 'name',
				value: 'Joana',
			},
		];

		const rData = [
			{
				location: [
					{partial: '', type: 'object'},
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial: '', type: 'object'},
				],
				name: 'surname',
				value: 'Doe',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
				],
				name: 'state',
				value: 'NY',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
				],
					name: 'city',
					value: 'NY',
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'wife', type: 'object'},
				],
				name: 'name',
				value: 'Joana',
			},
		];

		const expected = [
			{
				location: [
					{partial: '', type: 'object'},
				],
				name: 'name',
				value: 'John',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
				],
				name: 'surname',
				value: 'Doe',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
				],
				name: 'city',
				value: 'NY',
				info: infoCreators.ok()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'address', type: 'object'},
				],
				name: 'state',
				value: 'NY',
				info: infoCreators.extraneous()
			},
			{
				location: [
					{partial: '', type: 'object'},
					{partial: 'wife', type: 'object'},
				],
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
			location: [
				{partial: '', type: 'object'}
			],
			name: 'name',
			value: 'John',
		};

		const rData = [
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'name',
				value: 'Mary',
			},
			{
				location: [
					{partial: '', type: 'object'}
				],
				name: 'surname',
				value: 'Doe',
			}
		];

		expect(findBasedOnLocation(rData, line)).toEqual(rData[0]);
	});
})

describe('areLocationsEqual', () => {
	it('works for a true case', () => {
		const left = [
			{partial: '', type: 'object'}
		];

		const right = [
			{partial: '', type: 'object'}
		];

		expect(areLocationsEqual(left, right)).toBe(true);
	})

	it('works for a false case', () => {
		const left = [
			{partial: 'address', type: 'object'}
		];

		const right = [
			{partial: '', type: 'object'}
		];

		expect(areLocationsEqual(left, right)).toBe(false);
	})

	it('works for a false case, where right side contains left', () => {
		const left = [
			{partial: '', type: 'object'},
		];
		const right = [
			{partial: '', type: 'object'},
			{partial: 'address', type: 'object'},
		];

		expect(areLocationsEqual(left, right)).toBe(false);
	})
})
