import getReport from './index';

describe.skip('getReport integration tests (Visual Only, does not have expects)', () => {
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

	it('compare array to object', () => {
		const lData = [ 'one', 'two'];
		const rData = {
			name: 'John'
		}
		const { errorCount, str } = getReport(lData, rData);
		console.log(str)
	})
});
