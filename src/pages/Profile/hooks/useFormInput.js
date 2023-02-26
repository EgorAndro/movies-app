import {useState, useCallback} from 'react';

export const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue);

	const onChange = useCallback(e => {
		setValue(e.target.value);
	}, []);

	return {value, onChange};
};