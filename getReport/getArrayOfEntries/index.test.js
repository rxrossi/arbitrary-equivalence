import getArrayOfEntries, { types } from './index';

describe('getArrayOfEntries', () => {
	describe('plain structure (no nests)', () => {
		it('correctly converts a object', () => {

			const obj = {
				name: 'John',
				surname: 'Doe'
			};

			const expected = [
				{
					location: [],
					name: 'name',
					value: 'John',
					type: types.pair,
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
					type: types.pair,
				}
			];

			const answer = getArrayOfEntries(obj);

			expect(answer).toEqual(expected);

		})

		it('correctly converts a plain array', () => {
			const arr = [
				'one',
				'two'
			];

			const expected = [
				{
					location: [],
					name: '0',
					value: 'one',
					type: types.element,
				},
				{
					location: [],
					name: '1',
					value: 'two',
					type: types.element,
				}
			];

			const answer = getArrayOfEntries(arr)
			expect(answer).toEqual(expected);
		})
	});

	describe('nested structures', () => {
		it('correctly converts object with nested object', () => {

			const obj = {
				name: 'John',
				surname: 'Doe',
				address: {
					city: 'NYC',
					state: 'NY',
				}
			};

			const expected = [
				{
					location: [],
					name: 'name',
					value: 'John',
					type: types.pair,
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
					type: types.pair,
				},
				{
					location: ['address'],
					name: 'city',
					value: 'NYC',
					type: types.pair,
				},
				{
					location: ['address'],
					name: 'state',
					value: 'NY',
					type: types.pair,
				},
			];

			const answer = getArrayOfEntries(obj);

			expect(answer).toEqual(expected);

		})

		it('correctly converts object with nested array', () => {

			const obj = {
				name: 'John',
				surname: 'Doe',
				sons: [
					'Kathy',
					'Monique'
				]
			};

			const expected = [
				{
					location: [],
					name: 'name',
					value: 'John',
					type: types.pair,
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
					type: types.pair,
				},
				{
					location: ['sons'],
					name: '0',
					value: 'Kathy',
					type: types.element,
				},
				{
					location: ['sons'],
					name: '1',
					value: 'Monique',
					type: types.element,
				},
			];

			const answer = getArrayOfEntries(obj);

			expect(answer).toEqual(expected);

		})
	})
	it('correctly convets an array where each element is a object', () => {
		const people = [
			{name: 'John', city: 'NY'},
			{name: 'Bart', city: 'Springfield'},
		];
		const expected = [
			{
				location: ['0'],
				name: 'name',
				value: 'John',
				type: types.pair,
			},
			{
				location: ['0'],
				name: 'city',
				value: 'NY',
				type: types.pair,
			},
			{
				location: ['1'],
				name: 'name',
				value: 'Bart',
				type: types.pair,
			},
			{
				location: ['1'],
				name: 'city',
				value: 'Springfield',
				type: types.pair,
			}
		]
		const answer = getArrayOfEntries(people)
		expect(answer).toEqual(expected);
	})
})
