import React, {Component} from 'react';
import PT from 'prop-types';
import Axios from 'axios';

import Button from '../../shared/components/Button/Button';
import SimilarMovies from './SimilarMovies/SimilarMovies';

import './FullMovie.scss';

const API_KEY = '9032d3a2a129d4cd56f0a5349c06cd18';

const axios = Axios.create({
	baseURL: 'https://api.themoviedb.org/3'
});

class FullMovie extends Component {
	state = {
		fullMovie: null,
		similarMovies: []
	}
	componentDidMount() {
		const {match, movies} = this.props;
		const {movieId} = match.params;

		const fullMovie = movies.find(({id}) => id === +movieId);
		if (fullMovie) {
			return this.fetchSimilarMovies(movieId)
				.then(() => {
					this.setState({ fullMovie });
				})
				.catch(error => {
					console.log(error);
				});
		}

		axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
			.then(response => {
				const fullMovie = response.data;
				if (!fullMovie) return;

				this.fetchSimilarMovies(movieId)
					.then(() => {
						this.setState({ fullMovie });
					})
			})
			.catch(error => {
				console.log(error);
			});
	}

	componentDidUpdate(prevProps) {
		const { movieId } = this.props.match.params;
		const { movieId: prevMovieId } = prevProps.match.params;

		if (movieId === prevMovieId) return;

		axios.get(`/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
			.then(response => {
				const fullMovie = response.data;
				if (!fullMovie) return;

				this.fetchSimilarMovies(movieId)
					.then(() => {
						this.setState({ fullMovie });
					})
			})
			.catch(error => {
				console.log(error);
			});

	}

	fetchSimilarMovies(movieId) {
		return axios.get(`/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
			.then(response => {
				const {data} = response;

				const similarMovies = data.results.slice(0, 3);

				this.setState({ similarMovies });
			})
			.catch(error => {
				console.log(error);
			});
	}

	addMovieToFavorite = movieId => {
		console.log(movieId)
	}

	manageFavoriteMovie = () => {
		const { fullMovie } = this.state;
		const {addMovieToFavorite, removeMovieFromFavorite, favoriteMovies} = this.props;

		const favoriteMovie = favoriteMovies.find(m => m.id === fullMovie.id);

		if (favoriteMovie) {
			return removeMovieFromFavorite(favoriteMovie.databaseId);
		}

		addMovieToFavorite(fullMovie);
	}

	render() {
		const {fullMovie, similarMovies} = this.state;

		if (!fullMovie) return null;

		const {favoriteMovies} = this.props;

		const {
			id,
			poster_path,
			backdrop_path,
			original_title,
			release_date,
			overview
		} = fullMovie;

		const isFavorite = favoriteMovies.some(m => m.id === id);
		const storageUrl = 'https://image.tmdb.org/t/p';

		const btnClasses = ['full-movie__btn'];

		if (isFavorite) {
			btnClasses.push('button--red')
		} else {
			btnClasses.push('button--blue')
		}

		return (
			<div className='full-movie'>
				<div
					key={id}
					className="full-movie__content"
					style={{
						backgroundImage: `url(${storageUrl}/original${backdrop_path})`
					}}
				>
					<div className='full-movie__body'>
						<div className='full-movie__img-wrapper'>
							<img 
								src={`${storageUrl}/w500${poster_path}`} 
								alt={original_title} 
								className='full-movie__img' 
							/>
						</div>
						<div className='full-movie__info-wrapper'>
							<div className='full-movie__info'>
								<h1 className="full-movie__title">
									{original_title}
								</h1>
								<strong className='full-movie__date'>
									{release_date}
								</strong>
								<p className='full-movie__text'>
									{overview}
								</p>
							</div>
							<Button 
								className={btnClasses.join(' ')}
								onClick={this.manageFavoriteMovie}
							>
								{ isFavorite ? 'Remove from favorite' : 'Add to favorite' } 
							</Button>
						</div>
							
					</div>

					<SimilarMovies movies={similarMovies} />
				</div>
			</div>
		)
	}
}
FullMovie.propTypes = {
	match: PT.shape({
		params:PT.object.isRequired,
	}).isRequired,
	movies: PT.arrayOf(PT.shape({
		poster_path: PT.string,
		id: PT.number.isRequired,
		backdrop_path: PT.string,
		original_title: PT.string.isRequired,
		overview: PT.string.isRequired,
		release_date: PT.string.isRequired
	})).isRequired,
	favoriteMovies: PT.arrayOf(PT.shape({
		poster_path: PT.string,
		id: PT.number.isRequired,
		backdrop_path: PT.string,
		original_title: PT.string.isRequired,
		overview: PT.string.isRequired,
		release_date: PT.string.isRequired
	})).isRequired,
	addMovieToFavorite: PT.func.isRequired,
	removeMovieFromFavorite: PT.func.isRequired
};

export default FullMovie;

