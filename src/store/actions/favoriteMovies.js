import Axios from 'axios';
import { ADD_MOVIE_TO_FAVORITE, REMOVE_MOVIE_FROM_FAVORITE, SAVE_FAVORITE_MOVIES } from '../actionTypes'

const axios = Axios.create({
	baseURL: 'https://movies-app-89976-default-rtdb.firebaseio.com'
});

const addMovieToStore = movie => ({
	type: ADD_MOVIE_TO_FAVORITE,
	movie
});

export const addMovieToFavorite = movie => {
	return (dispatch, getState) => {
		const {databaseKey} = getState().auth;

		axios.post(`/users/${databaseKey}/favoriteMovies.json`, movie)
			.then((response) => {
				const { name } = response.data;

				dispatch(addMovieToStore({ 
					...movie,
					databaseId: name
				 }));

			}).catch((err) => {
				console.log(err);
			});
	};
};

const removeMovieFromStore = databaseId => ({
	type: REMOVE_MOVIE_FROM_FAVORITE,
	databaseId
});

export const removeMovieFromFavorite = databaseId => {
	return (dispatch, getState) => {
		const { databaseKey } = getState().auth;

		axios.delete(`/users/${databaseKey}/favoriteMovies/${databaseId}.json`, databaseId)
			.then(() => {
				dispatch(removeMovieFromStore(databaseId));

			}).catch((err) => {
				console.log(err);
			});
	};
};

export const fetchFavoriteMovies = databaseKey => {
	return dispatch => {
		axios.get(`/users/${databaseKey}/favoriteMovies.json`)
		.then((response) => {
			const { data } = response;

			if (!data) return;

			const favoriteMovies = Object
				.entries(data)
				.map(([ databaseId, movieData ]) => ({
					...movieData,
					databaseId
				}))

			dispatch(saveFavoriteMovies(favoriteMovies));

		}).catch((err) => {
			
		});
	};
};

const saveFavoriteMovies = movies => ({
	type: SAVE_FAVORITE_MOVIES,
	movies
})