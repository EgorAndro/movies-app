import { AUTHENTICATE_USER, LOGOUT_USER } from '../actionTypes';

export const authenticateUser = (idToken, localId, databaseKey) => {
	localStorage.setItem('idToken', idToken);
	localStorage.setItem('localId', localId);
	localStorage.setItem('databaseKey', databaseKey);
	
	return {
		type: AUTHENTICATE_USER,
		idToken,
		localId,
		databaseKey
	};
	};

export const logoutUser = () => {
	localStorage.removeItem('idToken');
	localStorage.removeItem('localId');
	localStorage.removeItem('databaseKey');


	return {
		type: LOGOUT_USER
	};
};
