import getReportWithLikeMatcherSupport from '../getReportWithLikeMatcherSupport';
import like from '../getReportWithLikeMatcherSupport/likeMatcher'

export default (...args) => {
	return new eaClass(...args);
}

class eaClass {
	constructor(value, qtyComparisonOperator, expectedQty, compareFn) {
		this.value = value;
		this.qtyComparisonOperator = qtyComparisonOperator;
		this.expectedQty = expectedQty;
	}

	toValue() {
		return this.value;
	}

	toDisplay() {
		return `eachLike which items quantity is ${this.qtyComparisonOperator} ${this.expectedQty}`
	}

	compare(receivedValue) {
		let answer;

		let firstErrorIndex;
		let firstErrorStr;
		let lastComparisonStr;
		let returnStr = '';
		let totalErrCount = 0;
		let errType;

		const receivedLenght = receivedValue.length;

		if (!isLengthOk(receivedLenght, this.qtyComparisonOperator, this.expectedQty)) {
			errType = errorTypes.amountOfItems;
			return {
				receivedLenght,
				expectedQty: this.expectedQty,
				qtyComparisonOperator: this.qtyComparisonOperator,
				error: {
					type: errType,
				}
			}
		} else {
			receivedValue.forEach((val, i) => {
				let likeVal = like(Object.assign({}, this.value))
				answer = getReportWithLikeMatcherSupport(
					likeVal,
					val
				)

				if (answer.errorCount > 0) {
					if (!(firstErrorIndex >= 0)) {
						firstErrorIndex = i;
						firstErrorStr = answer.str
						errType = errorTypes.structure;
					}
					totalErrCount += 1;
				}

				lastComparisonStr = answer.str

			});
		}



		return {
			receivedLenght,
			qtyComparisonOperator: this.qtyComparisonOperator,
			expectedQty: this.expectedQty,
			error: firstErrorIndex ? {
				type: errType,
				total: totalErrCount,
				firstErrorIndex,
			} : false,
			strFromCompare: firstErrorStr ? firstErrorStr : answer.str,
		}
	}
}

export function isLengthOk(receivedLenght, symbol, num) {
	switch (symbol) {
		case '>':
			return receivedLenght > num;
		case '<':
			return receivedLenght < num;
		case '=':
			return receivedLenght = num;
		case '<=':
			return receivedLenght <= num;
		case '>=':
			return receivedLenght >= num;
		default:
			throw(`Unkown symbol: ${symbol}`)
	}
}

export const errorTypes = {
	amountOfItems: 'AMOUNT_OF_ITEMS',
	structure: 'STRUCTURE',
}

export function compareErrorsToString({
	error,
	receivedLenght,
	expectedQty,
	qtyComparisonOperator,
	strFromCompare,
}) {

	const { type, firstErrorIndex, total } = error;

	if (type === errorTypes.structure) {
		return `received ${receivedLenght} items, first error at ${firstErrorIndex}, total errors: ${total}`+'\n'+
			strFromCompare
	} else {
		return `expected received quantity to be ${qtyComparisonOperator} ${expectedQty}, received: ${receivedLenght}`
	}

}

