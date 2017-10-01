import getReport from './getReport';
import { isInstanceOfLike } from './matchers/like';

export default (lData, rData) => {
	const preProcessL =  val => val.toSimpler();

	const compareLineByLineFn = (lVal, rVal) => {
		return lVal.compare(rVal)
	};

	function postProcess(value, type, info) {
		if (isInstanceOfLike(value)) {
			value = value.toDisplay()
		}

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

	return answer;
}
