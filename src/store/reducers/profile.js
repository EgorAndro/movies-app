import { CHANGE_USER_NAME } from '../actionTypes';

const initialState = {
	userName: 'John Doe',
	userAge: 23
};

const changeUserName = (state, payload) => ({
	...state,
	userName: payload.newName
});

const reducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case CHANGE_USER_NAME: return changeUserName(state, payload);

		default: return state;
	}
};

export default reducer;