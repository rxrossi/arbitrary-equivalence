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

		it.only('works when a pair is different', () => {
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
});
