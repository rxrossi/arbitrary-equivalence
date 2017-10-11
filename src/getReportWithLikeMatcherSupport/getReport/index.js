import getArrayOfEntries from './1_getArrayOfEntries';
import compareArrayOfEntries from './2_compareArraysOfEntries';
import addBracketsToComparison from './3_addBracketsToComparison';
import entriesToConsoleLog from './4_entriesToConsoleLog';

export default (lData, rData, compareLineByLineFn, preProcessLeft, postProcess) => {
	const { errorCount, arr:vsNoBrkts } = compareArrayOfEntries(lData, rData, preProcessLeft, compareLineByLineFn);
	const vsWithBrkts = addBracketsToComparison(vsNoBrkts);
	const str = entriesToConsoleLog(vsWithBrkts, postProcess);

	return {
		errorCount,
		str
	};
}
