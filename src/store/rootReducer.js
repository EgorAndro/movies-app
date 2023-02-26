import { combineReducers } from 'redux';

import profileReducer from './reducers/profile';
import favoriteMoviesReducer from './reducers/favoriteMovies';
import authReducer from './reducers/auth'


export default combineReducers({
	profile: profileReducer,
	favoriteMovies: favoriteMoviesReducer,
	auth: authReducer
});
