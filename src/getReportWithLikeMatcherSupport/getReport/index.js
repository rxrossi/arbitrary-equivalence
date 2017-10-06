import getArrayOfEntries from './1_getArrayOfEntries';
import compareArrayOfEntries from './2_compareArraysOfEntries';
import addBracketsToComparison from './3_addBracketsToComparison';
import entriesToConsoleLog from './4_entriesToConsoleLog';

export default (lData, rData, compareLineByLineFn, preProcessLeft, postProcess) => {
	const lDataArr = getArrayOfEntries(lData, preProcessLeft);
	const rDataArr = getArrayOfEntries(rData);
	const { errorCount, arr:vsNoBrkts } = compareArrayOfEntries(lDataArr, rDataArr, compareLineByLineFn);
	const vsWithBrkts = addBracketsToComparison(vsNoBrkts);
	// console.log(vsWithBrkts);
	const str = entriesToConsoleLog(vsWithBrkts, postProcess);

	return {
		errorCount,
		str
	};
}
