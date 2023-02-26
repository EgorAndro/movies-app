import {SAVE_USER_DATA} from './actionTypes'

export const initialState = {
	userData: []
};

const saveUserData = (state, action) => ({
	...state,
	userData: action.userData
})

const reducer = (state, action) => {
	
	switch (action.type) {
		case SAVE_USER_DATA: return saveUserData(state, action);
		default: return state;
	}
};

export default reducer;