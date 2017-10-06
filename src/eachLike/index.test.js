import eachlike, { isLengthOk, errorTypes, compareErrorsToString } from './index';

describe('Arrays matchers', () => {
	describe('of string and number', () => {
		const eaLikeArr = {
			name: "John",
			surname: "Doe"
		}

		const instance = eachlike(eaLikeArr, '>=', 2);

		it('converts to its display value', () => {
			const answer = "eachLike which items quantity is >= 2";
			expect(instance.toDisplay()).toEqual(answer);
		});

		it('converts to its like value', () => {
			expect(instance.toValue()).toEqual(eaLikeArr);
		});

		describe('comparison with received value', () => {

			it('works in a true case', () => {
				const received = [
					{name: "Name", surname: "Connor"},
					{name: "July", surname: "Doe"}
				]

				const { error, strFromCompare } = instance.compare(received)

				expect(error).toBe(false);

			});

			it('works in a false case, one of the objects is different', () => {
				const received = [
					{name: "Mary", surname: "Connor"},
					{surname: "Doe"},
					{name: "Mary"},
				];
				const { error, strFromCompare, receivedLenght, qtyComparisonOperator } = instance.compare(received)

				expect(error.type).toEqual(errorTypes.structure);
				expect(error.total).toBe(2);
				expect(error.firstErrorIndex).toBe(1);
				expect(receivedLenght).toBe(3);
				expect(qtyComparisonOperator).toEqual('>=');
			});

			it('works in a false case, the received length is lower', () => {
				const { error, receivedLenght, totalErrCount, expectedQty, qtyComparisonOperator } = instance.compare([
					{name: "Mary", surname: "Connor"},
				])
				expect(error.type).toEqual(errorTypes.amountOfItems);
				expect(receivedLenght).toBe(1);
				expect(expectedQty).toBe(2);
				expect(qtyComparisonOperator).toEqual('>=');
			});

		});
	})

})

describe.skip('compare errors to string', () => {
	it('works for a STRUCTURE error', () => {
		const error = {
			type: errorTypes.structure,
			total: 1,
			firstErrorIndex: 1
		};

		const answer = {
			qtyComparisonOperator: '>',
			receivedLenght: 2,
			expectedQty: 1,
			strFromCompare: 'some string from compare',
			error
		};

		console.log(compareErrorsToString(answer))

	})

	it('works for a QTY error', () => {

		const error = {
			type: errorTypes.amountOfItems,
		};

		const answer = {
			qtyComparisonOperator: '>',
			receivedLenght: 1,
			expectedQty: 2,
			strFromCompare: undefined,
			error
		};

		console.log(compareErrorsToString(answer))

	})
})
