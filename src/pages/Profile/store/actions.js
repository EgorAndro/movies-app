import {SAVE_USER_DATA} from './actionTypes';

export const saveUserData = userData => ({
	type: SAVE_USER_DATA,
	userData
});