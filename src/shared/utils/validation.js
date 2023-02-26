export const validation = {
	isEmail(value, pattern) {
		if(pattern.test(value)) return null;

		return 'Provided value should be an email adress.';
	},
	isAlphabetic(value, pattern) {
		if (pattern.test(value)) return null;

		return 'Provided value should have alphabetic characters only.';
	},
	isNumeric(value, pattern) {
		if (pattern.test(value)) return null;

		return 'Provided value should have numeric characters only.';
	},
	minLength(value, minValue) {
		if (value.length >= minValue) return null;

		return `Provided value should have minimum length of ${minValue}.`;
	}
};