class cLike {

	constructor(structure) {
		this.value = structure;
	}

	toDisplay() {
		return 'type '+typeof this.value;
	}

	toValue() {
		return this.value;
	}

	compare(valueToCompare) {
		return typeof this.value === typeof valueToCompare;
	}

	toSimpler() {

		let startVal = this.value;

		if (typeof startVal !== 'object') {
			return this
		}

		return getStructure(this.value)

		function getStructure (structure, prevLoc = []) {

			Object.entries(structure).forEach(([name, value]) => {
				if (typeof value === 'object') {
					return getStructure(value, [...prevLoc, name])
				}

				updateObject(startVal, like(value), [...prevLoc, name])
			})

			return startVal;

		}

		function updateObject(object, newValue, stack){

			while(stack.length>1){
				object = object[stack.shift()];
			}

			object[stack.shift()] = newValue;

		}

	}

}

const like = (structure) => {
	return new cLike(structure);
}
export default like;

export const isInstanceOfLike = (object) => {
	return object instanceof cLike;
};

