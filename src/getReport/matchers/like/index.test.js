import like, { isInstanceOfLike } from './index';

describe('Simple matcher', () => {

	describe('instanceof function', () => {
		it('returns true if it is an instance', () => {
			const instance = like('aVal');
			expect(isInstanceOfLike(instance)).toBe(true);
		});

		it('returns false if it is not an instance', () => {
			const testFn = (val) => val;
			const instance = testFn('aVal');
			expect(isInstanceOfLike(instance)).toBe(false);
		});

		it('return itself when using toSimpler() method', () => {
			const instance = like('aVal');
			expect(instance.toSimpler()).toEqual(instance);
		})

	})

	describe('Strings and Numbers', () => {
		describe('String', () => {
			const value = 'Mary';

			it('converts to its display value', () => {
				const instance = like(value);
				const answer = 'type string';
				expect(instance.toDisplay()).toEqual(answer);
			});

			it('converts to its like value', () => {
				const instance = like(value);
				const answer = 'Mary';
				expect(instance.toValue()).toEqual(answer);
			});

			describe('Compares to a received value to see if it is equal or not', () => {
				it('works when it should return true', () => {
					const instance = like('Mary');
					const input = 'John';
					const answer = true;
					expect(instance.compare(input)).toBe(answer);
				});

				it('works when it should return false', () => {
					const instance = like('Mary');
					const input = 1;
					expect(instance.compare(input)).toBe(false);
				});
			})
		})

		describe('Numbers', () => {

			it('converts to its display value', () => {
				const instance = like(2)
				const answer = 'type number';
				expect(instance.toDisplay()).toEqual(answer);
			});

			it('converts to its like value', () => {
				const instance = like(2)
				const answer = 2;
				expect(instance.toValue()).toEqual(answer);
			});
		})
	})

	describe('Objects', () => {

		it('converts to like value (to be used by mocker)', () => {
			const testObject = {
				name: 'July',
				surname: 'Doe',
			};
			const instance = like(testObject);
			expect(instance.toValue()).toEqual(testObject);
		});

		it('converts to instances of single numbers or strings', () => {
			const testObject = {
				name: 'July',
				surname: 'Doe',
				extra: 'extraVal',
				address: {
					city: 'Piracicaba',
					state: 'SP',
					sub: {
						subKey: 'subVal'
					}
				},
				sons: [
					'Ana',
					'John',
				]
			};

			const answer = {
				name: like('July'),
				surname: like('Doe'),
				extra: like('extraVal'),
				address: {
					city: like('Piracicaba'),
					state: like('SP'),
					sub: {
						subKey: like('subVal')
					}
				},
				sons: [
					like('Ana'),
					like('John'),
				]
			};

			const instance = like(testObject);

			expect(instance.toSimpler()).toEqual(answer);
		});
	})
})
