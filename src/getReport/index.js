import getArrayOfEntries from './1_getArrayOfEntries';
import compareArrayOfEntries from './2_compareArraysOfEntries';
import addBracketsToComparison from './3_addBracketsToComparison';
import entriesToConsoleLog from './4_entriesToConsoleLog';

export default (lData, rData) => {
	const lDataArr = getArrayOfEntries(lData);
	const rDataArr = getArrayOfEntries(rData);
	const { errorCount, arr:vsNoBrkts } = compareArrayOfEntries(lDataArr, rDataArr);
	const vsWithBrkts = addBracketsToComparison(vsNoBrkts);
	// console.log(vsWithBrkts);
	const str = entriesToConsoleLog(vsWithBrkts);

	return {
		errorCount,
		str
	};
}
