import * as infoCreators from '../infoCreators';
import compareArrays, { findBasedOnLocation, areLocationsEqual, findLineToInsertAfter } from './index';

describe('Not using custom comparison function', () => {
		describe('compareArrays of entries', () => {
			it('correctly returns the answer for lines that should receive OK and DIFFERENT', () => {

				const lData = [
					"John",
					"Mary",
				];

				const rData = [
					"John",
					"Joana",
				];

				const expectedErrorCount = 1;

				const expectedArr = [
					{
						location: [
							['', 'array'],
							['0', 'string'],
						],
						value: 'John',
						printableValue: 'John',
						printableReceived: 'John',
						appendStr: undefined,
						info: infoCreators.ok()
					},
					{
						location: [
							['', 'array'],
							['1', 'string'],
						],
						value: 'Mary',
						printableValue: 'Mary',
						printableReceived: 'Joana',
						appendStr: undefined,
						info: infoCreators.different('Joana')
					}
				];

				const { errorCount, arr } = compareArrays(lData, rData);
				// console.log(
				// 	JSON.stringify(arr, null, 2)
				// )

				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(1);
			})

			it('correctly returns the answer for lines that should receive DIFFERENT and MISSING', () => {

				const lData = {
					address: {
						city: 'Piracicaba',
						state: 'São Paulo'
					}
				};

				const rData = {
					address: {
						city: 'Campinas'
					}
				}

				const expectedArr = [
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['city', 'string'],
						],
						value: 'Piracicaba',
						printableValue: 'Piracicaba',
						printableReceived: 'Campinas',
						appendStr: undefined,
						info: infoCreators.different('Campinas')
					},
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['state', 'string'],
						],
						value: 'São Paulo',
						printableValue: 'São Paulo',
						printableReceived: undefined,
						appendStr: undefined,
						info: infoCreators.missing()
					}
				];

				const { errorCount, arr } = compareArrays(lData, rData);
				// console.log(
				// 	JSON.stringify(arr, null, 2)
				// )
				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(2);
			})

			it.only('correctly returns the answer for lines that should receive OK and EXTRANEOUS', () => {

				const lData = {
					sons: [
						"Carl",
						"Lucy"
					]
				};

				const rData = {
					sons: [
						"Carl",
						"Lucy",
						"Mary"
					]
				}

				const expectedArr = [
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['0', 'string'],
						],
						value: 'Carl',
						info: infoCreators.ok()
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['1', 'string'],
						],
						value: 'Lucy',
						info: infoCreators.ok()
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['2', 'string'],
						],
						value: 'Mary',
						info: infoCreators.extraneous()
					},
				];

				const { errorCount, arr } = compareArrays(lData, rData);
				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(1);
			})

			it('correctly returns the answer for lines that should receive OK and EXTRANEOUS in a more complex case', () => {

				const lData = {
					name: 'Carl',
					address: {
						city: 'New York'
					}
				};

				const rData = {
					name: 'Carl',
					surname: 'Doe',
					address: {
						city: 'New York'
					}
				}

				const expectedArr = [
					{
						location: [
							['', 'object'],
							['name', 'string'],
						],
						value: 'Carl',
						info: infoCreators.ok()
					},
					{
						location: [
							['', 'object'],
							['surname', 'string'],
						],
						value: 'Doe',
						info: infoCreators.extraneous()
					},
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['city', 'string']
						],
						value: 'New York',
						info: infoCreators.ok()
					},
				];

				const { errorCount, arr } = compareArrays(lData, rData);
				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(1);
			})
		})

	describe('findLineToInsertAfter', () => {
		it('return the correct index for a object that has a nested object', () => {
			const essential = [
				{
					location: [
						['', 'object'],
						['name', 'string'],
					],
					value: 'Carl',
					info: infoCreators.ok()
				},
				{
					location: [
						['', 'object'],
						['surname', 'string'],
					],
					value: 'Doe',
					info: infoCreators.extraneous()
				},
				{
					location: [
						['', 'object'],
						['address', 'object'],
						['city', 'string']
					],
					value: 'New York',
					info: infoCreators.ok()
				},
				{
					location: [
						['', 'object'],
						['address', 'object'],
						['state', 'object'],
						['keyOne', 'string'],
					],
					value: 'ValueOne',
					info: infoCreators.ok()
				},
				{
					location: [
						['', 'object'],
						['address', 'object'],
						['state', 'string']
					],
					value: 'New York',
					info: infoCreators.ok()
				},
			];

			const extraneous1 = {
				location: [
					['', 'object'],
					['age', 'number'],
				],
				value: 30
			};

			const extraneous2 = {
				location: [
					['', 'object'],
					['address', 'object'],
					['state', 'object'],
					['keyTwo', 'string'],
				],
				value: 'valTwo',
				info: infoCreators.ok()
			}

			expect(findLineToInsertAfter(essential, extraneous1)).toBe(1);
			expect(findLineToInsertAfter(essential, extraneous2)).toBe(3);
		})
	})

	describe('findBasedOnLocation', () => {
		it('returns the value if it is a string', () => {
			const	location = [
				['', 'object'],
				['surname', 'string']
			];

			const rData = {
				name: 'Jhon',
				surname: 'Doe',
			};

			expect(findBasedOnLocation(rData, location)).toEqual(rData.surname);
		});

		it('returns a nest in if the location is one', () => {
			const	location = [
				['', 'object'],
				['address', 'object']
			];

			const rData = {
				name: 'Jhon',
				surname: 'Doe',
				address: {
					city: 'Piracicaba',
					state: 'SP',
				}
			};

			expect(findBasedOnLocation(rData, location)).toEqual(rData.address);
		})

		it('returns the correct value in case location is an array', () => {
			const location = [
				['', 'object'],
				['sons', 'array'],
				['0', 'object'],
				['name', 'string'],
			];

			const rData = {
				name: 'John',
				sons: [
					{name: 'Jenny', age: 15},
					{name: 'Carl',  age: 10},
				]
			}
			const expected = rData.sons[0].name;
			const answer = findBasedOnLocation(rData, location);
			expect(answer).toEqual(expected);
		})
	})

	describe('areLocationsEqual (does not consider path type, only path)', () => {
		it('works for a true case', () => {
			const left = [
				['', 'object']
			];

			const right = [
				['', 'object']
			];

			expect(areLocationsEqual(left, right)).toBe(true);
		})

		it('works for a true case when type if different', () => {
			const left = [
				['', '']
			];

			const right = [
				['', 'object']
			];

			expect(areLocationsEqual(left, right)).toBe(true);
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
})
