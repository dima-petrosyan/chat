// Validators for forms

export const required = (value) => {
	if (value) {
		return undefined
	}
	return 'Value is required'
}

export const maxLengthCreator = (maxLength) => {
	return (value) => {
		if (value && value.length > maxLength) {
			return `Max length is ${maxLength} symbols`
		}
		return undefined
	}
}

