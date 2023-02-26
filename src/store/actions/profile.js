import { CHANGE_USER_NAME } from '../actionTypes';

export const changeUserName = newName => {
	return dispatch => {
		setTimeout(() => {
			dispatch({
				type: CHANGE_USER_NAME,
				payload: {
					newName
				}
			});
		}, 1000);
	};
};