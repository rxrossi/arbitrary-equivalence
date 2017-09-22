import getReport from './index';

describe('getReport integration tests', () => {
	describe('Simple objects (no nest)', () => {
		it('works when everything is ok', () => {
			const lObj = {
				name: 'John',
			};
			const rObj = {
				name: 'John',
			};

			const answer = getReport(lObj, rObj)

			console.log(answer)
		});

		it('works when it has a extraneous', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
				name: 'John',
				surname: 'Doe'
			};

			const answer = getReport(lObj, rObj);

			console.log(answer);
		});

		it('works when has a missing pair', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
			};

			const answer = getReport(lObj, rObj);

			console.log(answer);
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

			const answer = getReport(lObj, rObj);

			console.log(answer);
		});

		it('works when a pair is different', () => {
			const lObj = {
				name: 'John',
			};

			const rObj = {
				name: 'Mary',
			};

			const answer = getReport(lObj, rObj);

			console.log(answer);
		});
	})

	describe('Simple arrays (no nests)', () => {
		it('it works when everything is ok', () => {
			const lArr = [
				'John'
			];
			const rArr = [
				'John'
			];
			const answer = getReport(lArr, rArr);

			console.log(answer)
		})

		it('it works when everything is ok', () => {
			const lArr = [
				'John',
				'Mary'
			];
			const rArr = [
				'John',
				'Mary'
			];
			const answer = getReport(lArr, rArr)
			console.log(answer)
		})
	})

	describe.only('Arrays with nest', () => {
		it('works when each element is an object', () => {
			const lArr = [
				{ name: 'John', surname: 'Doe'},
				{ name: 'Mary', surname: 'Connor'}
			];

			const rArr = [
				{ name: 'John', surname: 'Doe'},
				{ name: 'Mary', surname: 'Doe'}
			];

			const answer = getReport(lArr, rArr);
			console.log(answer);
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

			const answer = getReport(lArr, rArr);
			console.log(answer);
		})
	});

});
