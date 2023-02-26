import { AUTHENTICATE_USER, LOGOUT_USER } from '../actionTypes';
const initialState = {
	idYoken: null,
	localId: null,
	databaseKey: null
};

const authenticateUser = (state, action) => ({
	...state,
	idToken: action.idToken,
	localId: action.localId,
	databaseKey: action.databaseKey
});
const logoutUser = state => ({
	...state,
	idToken: null,
	localId: null,
	databaseKey: null
});

const reducer = (state = initialState, action) => {

	switch (action.type) {

		case AUTHENTICATE_USER: return authenticateUser(state, action);
		case LOGOUT_USER: return logoutUser(state);

		default: return state;	
	}
};

export default reducer;