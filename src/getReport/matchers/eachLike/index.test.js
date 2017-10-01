import eachlike from './index';

describe('Arrays matchers', () => {
	describe('of string and number', () => {
		const eaLikeArr = {
			name: "John",
			surname: "Doe"
		}

		const instance = eachlike(eaLikeArr, 2);

		it('converts to its display value', () => {
			const answer = "eachLike of 2";
			expect(instance.toDisplay()).toEqual(answer);
		});

		it('converts to its like value', () => {
			expect(instance.toValue()).toEqual(eaLikeArr);
		});

		describe('comparison with received value', () => {
			it('works in a true case', () => {
				// expect(instance.compare([
				// 	{name: "Mary", surname: "Connor"},
				// 	{name: "July", surname: "Doe"}
				// ])).toBe(true);
			})
			it('works in a false case', () => {

			})
		});
	})

	describe('of objects', () => {
		it('converts to its display value', () => {

		});

		it('converts to its like value', () => {

		});

		describe('comparison with received value', () => {
			it('works in a true case', () => {

			})
			it('works in a false case', () => {

			})
		});
	})

	describe('of arrays', () => {
		it('converts to its display value', () => {

		});

		it('converts to its like value', () => {

		});

		describe('comparison with received value', () => {
			it('works in a true case', () => {

			})
			it('works in a false case', () => {

			})
		});
	})
})
