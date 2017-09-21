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

			const answer = getArrayOfEntries(obj);
			// console.log(answer[0])

			expect(answer).toEqual(expected);

		})

		it('correctly converts a plain array', () => {
			const arr = [
				'one',
				'two'
			];

			const expected = [
				{
					location: [
						{partial: '', type: 'array'},
						{partial: '0', type: 'string'}
					],
					name: '',
					value: 'one',
				},
				{
					location: [
						{partial: '', type: 'array'},
						{partial: '1', type: 'string'}
					],
					name: '',
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
					location: [
						{partial:'', type:'object'}
					],
					name: 'name',
					value: 'John',
				},
				{
					location: [
						{partial:'', type:'object'}
					],
					name: 'surname',
					value: 'Doe',
				},
				{
					location: [
						{partial:'', type:'object'},
						{partial:'address', type:'object'}
					],
					name: 'city',
					value: 'NYC',
				},
				{
					location: [
						{partial:'', type:'object'},
						{partial:'address', type:'object'}
					],
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
					location: [
						{partial:'', type:'object'},
					],
					name: 'name',
					value: 'John',
				},
				{
					location: [
						{partial:'', type:'object'},
					],
					name: 'surname',
					value: 'Doe',
				},
				{
					location: [
						{partial:'', type:'object'},
						{partial:'sons', type:'array'},
						{partial:'0', type:'string'},
					],
					name: '',
					value: 'Kathy',
				},
				{
					location: [
						{partial:'', type:'object'},
						{partial:'sons', type:'array'},
						{partial:'1', type:'string'},
					],
					name: '',
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
			'three'
		];
		const expected = [
			{
				location: [
					{partial:'', type:'array'},
					{partial:'0', type:'object'}
				],
				name: 'name',
				value: 'John',
			},
			{
				location: [
					{partial:'', type:'array'},
					{partial:'0', type:'object'}
				],
				name: 'city',
				value: 'NY',
			},
			{
				location: [
					{partial:'', type:'array'},
					{partial:'1', type:'object'}
				],
				name: 'name',
				value: 'Bart',
			},
			{
				location: [
					{partial:'', type:'array'},
					{partial:'1', type:'object'}
				],
				name: 'city',
				value: 'Springfield',
			},
			{
				location: [
					{partial:'', type:'array'},
					{partial:'2', type:'string'}
				],
				name: '',
				value: 'three',
			}
		]
		const answer = getArrayOfEntries(people)
		expect(answer).toEqual(expected);
	})
})
