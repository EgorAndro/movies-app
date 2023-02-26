// import { saveFavoriteMovies } from '../actions/favoriteMovies';
import {ADD_MOVIE_TO_FAVORITE, REMOVE_MOVIE_FROM_FAVORITE, SAVE_FAVORITE_MOVIES} from '../actionTypes'

const initialState = {
	movies: []
};

const saveFavoriteMovies = (state, action) => ({
	...state,
	movies: action.movies
});

const addMovieToFavorite = (state, action) => ({
	...state,
	movies: [...state.movies, action.movie]
});

const removeMovieFromFavorite = (state, action) => ({
	...state,
	movies: state.movies.filter(m => m.databaseId !== action.databaseId)
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE_FAVORITE_MOVIES: return saveFavoriteMovies(state, action);
		case ADD_MOVIE_TO_FAVORITE: return addMovieToFavorite(state, action);
		case REMOVE_MOVIE_FROM_FAVORITE: return removeMovieFromFavorite(state, action);

		default: return state;
	}
};

export default reducer;