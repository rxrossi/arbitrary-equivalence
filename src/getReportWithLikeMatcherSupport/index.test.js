import like from './likeMatcher'
import getReportWithLikeMatcher from './index';

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

		const answer = getReportWithLikeMatcher(lData, rData);
		// console.log(answer.str)

	})
})

