import * as infoCreators from '../infoCreators';
import compareArrays, { findBasedOnLocation, areLocationsEqual, findLineToInsertAfter } from './index';

describe('Not using custom comparison function', () => {
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

				const expectedErrorCount = 1;

				const expectedArr = [
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

				const { errorCount, arr } = compareArrays(lData, rData);

				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(1);
			})

			it('correctly returns the answer for lines that should receive DIFFERENT and MISSING', () => {
				const lData = [
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
					}
				];

				const rData = [
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['city', 'string'],
						],
						value: 'Campinas',
					},
				];

				const expectedArr = [
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['city', 'string'],
						],
						value: 'Piracicaba',
						info: infoCreators.different('Campinas')
					},
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['state', 'string'],
						],
						value: 'São Paulo',
						info: infoCreators.missing()
					}
				];

				const { errorCount, arr } = compareArrays(lData, rData);
				expect(arr).toEqual(expectedArr);
				expect(errorCount).toBe(2);
			})

			it('correctly returns the answer for lines that should receive OK and EXTRANEOUS', () => {
				const lData = [
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['0', 'string'],
						],
						value: 'Carl',
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['1', 'string'],
						],
						value: 'Lucy',
					},
				];

				const rData = [
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['0', 'string'],
						],
						value: 'Carl',
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['1', 'string'],
						],
						value: 'Lucy',
					},
					{
						location: [
							['', 'object'],
							['sons', 'array'],
							['2', 'string'],
						],
						value: 'Mary',
					},
				];

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
				const lData = [
					{
						location: [
							['', 'object'],
							['name', 'string'],
						],
						value: 'Carl',
					},
					{
						location: [
							['', 'object'],
							['address', 'object'],
							['city', 'string']
						],
						value: 'New York',
					},
				];

				const rData = [
					{
						location: [
							['', 'object'],
							['name', 'string'],
						],
						value: 'Carl',
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
							['address', 'object'],
							['city', 'string']
						],
						value: 'New York',
					},
				];

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
				// console.slog(
				// 	JSON.stringify(answer, null, 2)
				// )
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

		it('works if last location type is different', () => {
			const	location = [
				['', 'object'],
				['surname', 'number']
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
