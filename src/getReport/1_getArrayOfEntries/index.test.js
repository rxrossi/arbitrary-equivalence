import getArrayOfEntries from './index';

describe('getArrayOfEntries', () => {

	describe('Non Nested Structures', () => {

		it('works with an array of strings', () => {
			const arr = [
				'John',
				'Mary',
			];

			const expected = [
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

			const answer = getArrayOfEntries(arr);
			expect(answer).toEqual(expected);

		});

		it('works with an array of strings and numbers', () => {
			const arr = [
				0,
				1,
				'third'
			];

			const expected = [
				{
					location: [
						['', 'array'],
						['0', 'number'],
					],
					value: 0,
				},
				{
					location: [
						['', 'array'],
						['1', 'number'],
					],
					value: 1,
				},
				{
					location: [
						['', 'array'],
						['2', 'string'],
					],
					value: 'third',
				}
			];

			const answer = getArrayOfEntries(arr);
			expect(answer).toEqual(expected);
		})

		it('works with an object', () => {
			const obj = {
				name: 'John',
				surname: 'Doe',
				age: 30
			};

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
						['age', 'number'],
					],
					value: 30,
				}
			];

			const answer = getArrayOfEntries(obj);
			expect(answer).toEqual(expected);
		});

	});

	describe('Nested Structures', () => {

		describe('Root is Array', () => {

			it.only('works for an array of arrays', () => {
				const arr = [
					[
						'John',
						'Mary'
					],
					[
						'John2',
						'Mary2'
					],
				];

				const expected = [
					{
						location: [
							['', 'array'],
							['0', 'array'],
							['0', 'string'],
						],
						value: 'John',
					},
					{
						location: [
							['', 'array'],
							['0', 'array'],
							['1', 'string'],
						],
						value: 'Mary',
					},
					{
						location: [
							['', 'array'],
							['1', 'array'],
							['0', 'string'],
						],
						value: 'John2',
					},
					{
						location: [
							['', 'array'],
							['1', 'array'],
							['1', 'string'],
						],
						value: 'Mary2',
					},
				];

				const answer = getArrayOfEntries(arr);
				expect(answer).toEqual(expected);

			});

			it('works for an array of elements', () => {
				const arr = [
					{name: 'John', surname: 'Doe'},
					{name: 'Mary', surname: 'Connor'}
				];

				const expected = [
					{
						location: [
							['', 'array'],
							['0', 'object'],
							['name', 'string'],
						],
						value: 'John',
					},
					{
						location: [
							['', 'array'],
							['0', 'object'],
							['surname', 'string'],
						],
						value: 'Doe',
					},
					{
						location: [
							['', 'array'],
							['1', 'object'],
							['name', 'string'],
						],
						value: 'Mary',
					},
					{
						location: [
							['', 'array'],
							['1', 'object'],
							['surname', 'string'],
						],
						value: 'Connor',
					},
				];

				const answer = getArrayOfEntries(arr);
				expect(answer).toEqual(expected);

			});

		});

		describe('Root is Object', () => {

			it('works for an object with nested object', () => {
				const obj = {
					name: 'John',
					address: {
						city: 'Piracicaba',
						state: 'São Paulo',
					},
				};

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
							['address', 'object'],
							['city', 'string'],
						],
						value: 'Piracicaba',
					},
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['state', 'string'],
						],
						value: 'São Paulo',
					},
				];

				const answer = getArrayOfEntries(obj);
				expect(answer).toEqual(expected);
			});

			it('works for an object with nested array', () => {
				const obj = {
					name: 'John',
					sons: [
						'Jenny',
						'Carl'
					],
				};

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
							['sons', 'array'],
							['0', 'string'],
						],
						value: 'Jenny',
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['1', 'string'],
						],
						value: 'Carl',
					},
				];

				const answer = getArrayOfEntries(obj);
				expect(answer).toEqual(expected);

			});

		});

	});

});
