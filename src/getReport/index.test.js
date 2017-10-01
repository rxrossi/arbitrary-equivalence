import getReport from './index';
import like, { isInstanceOfLike } from './matchers/like/index';

describe('getReport integration tests (Visual Only, does not have expects)', () => {
	describe('Simple objects (no nest)', () => {
		it('works when everything is ok', () => {
			const lObj = {
				name: 'John',
			};
			const rObj = {
				name: 'John',
			};

			const { errorCount, str } = getReport(lObj, rObj)

			console.log(str)
		});

		it('works when it has a extraneous', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
				name: 'John',
				surname: 'Doe'
			};

			const { errorCount, str } = getReport(lObj, rObj);

			console.log(str);
		});

		it('works when has a missing pair', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
			};

			const { errorCount, str } = getReport(lObj, rObj);

			console.log(str);
		});

		it('works when a pair is different', () => {
			const lObj = {
				surname: 'Doe',
				name: 'John',
			};

			const rObj = {
				surname: 'Connor',
				name: 'John',
			};

			const { errorCount, str } = getReport(lObj, rObj);

			console.log(str);
		});

		it('works when a pair is different', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
				name: 'Mary',
			};

			const { errorCount, str } = getReport(lObj, rObj);

			console.log(str);
		});
	})

	describe('Simple arrays (no nests)', () => {
		it('works when everything is ok', () => {
			const lArr = [
				'John'
			];
			const rArr = [
				'John'
			];
			const { errorCount, str } = getReport(lArr, rArr);

			console.log(str)
		})

		it('works when everything is ok', () => {
			const lArr = [
				'John',
				'Mary'
			];
			const rArr = [
				'John',
				'Mary'
			];
			const { errorCount, str } = getReport(lArr, rArr);
			console.log(str)
		})

		it('works when comparing numbers (info is different)', () => {
			const lArr = [
				0,
				'Mary'
			];
			const rArr = [
				2,
				'Mary'
			];

			const { errorCount, str } = getReport(lArr, rArr);
			console.log(str)
		})

		it('works when comparing numbers (info is missing and OK)', () => {
			const lArr = [
				1,
				2,
			];
			const rArr = [
				1,
			];
			const { errorCount, str } = getReport(lArr, rArr);
			console.log(str)
		})
	})

	describe('Arrays with nest', () => {
		it('works when each element is an object', () => {
			const lArr = [
				{ name: 'John', surname: 'Doe'},
				{ name: 'Mary', surname: 'Connor'}
			];

			const rArr = [
				{ name: 'John', surname: 'Doe'},
				{ name: 'Mary', surname: 'Doe'}
			];

			const { errorCount, str } = getReport(lArr, rArr);
			console.log(str)
		})

		it('works when each element is an array', () => {
			const lArr = [
				['john', 'mary'],
				['lucy', 'joana'],
			];

			const rArr = [
				['john', 'mary'],
				['kj', 'joana'],
			];

			const { errorCount, str } = getReport(lArr, rArr);
			console.log(str)
		})
	});
});

describe('getReport integration tests using matchers (like only)', () => {
	it('works for a simple case', () => {
		const lData = like({
			name: 'John',
			surname: 'Doe',
		});

		const rData = {
			name: 'Mary',
			surname: 2,
			city: 'London',
		};

		const preProcessL =  val => val.toSimpler();


		const compareLineByLineFn = (lVal, rVal) => {
			return lVal.compare(rVal)
		};

		function postProcess(value, type, info) {
			if (isInstanceOfLike(value)) {
				value = value.toDisplay()
			}
			// value = value.toDisplay() ? value.toDisplay() : value;
			const printValue = type === 'string' ? `"${value}"` : `${value}`;
			let printReceived = '';

			if (info.received) {
				printReceived = typeof info.received === 'string' ? `"${info.received}"` : info.received;
			}

			return {
				printValue,
				printReceived
			}
		}

		const answer = getReport(lData, rData, compareLineByLineFn, preProcessL, postProcess);

		console.log(answer.str)

	})
})
