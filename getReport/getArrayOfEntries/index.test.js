import getArrayOfEntries from './index';

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
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
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
				},
				{
					location: [],
					name: '1',
					value: 'two',
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
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
				},
				{
					location: ['address'],
					name: 'city',
					value: 'NYC',
				},
				{
					location: ['address'],
					name: 'state',
					value: 'NY',
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
				},
				{
					location: [],
					name: 'surname',
					value: 'Doe',
				},
				{
					location: ['sons'],
					name: '0',
					value: 'Kathy',
				},
				{
					location: ['sons'],
					name: '1',
					value: 'Monique',
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
			},
			{
				location: ['0'],
				name: 'city',
				value: 'NY',
			},
			{
				location: ['1'],
				name: 'name',
				value: 'Bart',
			},
			{
				location: ['1'],
				name: 'city',
				value: 'Springfield',
			}
		]
		const answer = getArrayOfEntries(people)
		expect(answer).toEqual(expected);
	})
})
