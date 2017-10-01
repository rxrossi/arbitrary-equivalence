export default (...args) => {
	return new eaClass(...args);
}

class eaClass {
	constructor(value, qty) {
		this.value = value;
		this.qty = qty;
	}

	toValue() {
		return this.value;
	}

	toDisplay() {
		return `eachLike of ${this.qty}`
	}

	compare(receivedValue) {

	}
}
