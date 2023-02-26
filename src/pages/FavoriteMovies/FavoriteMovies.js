import React, { useState } from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import Button from '../../shared/components/Button/Button';
import Pagination from '../../shared/components/Pagination/Pagination';

import './FavoriteMovies.scss';

const FavoriteMovies = ({ movies, removeMovieFromFavorite }) => {

	const [ currentPage, setCurrentPage ] = useState(1);

	const switchPageHandler = page => {
		setCurrentPage(page);
	};

	const handleRemoveClick = (id) => {
		const favoriteMovie = movies.find(m => m.id === id);
		console.log('Removing movie with ID:', id);
		removeMovieFromFavorite(favoriteMovie.databaseId);
	};

	let content = (
		<div className="favorite-movies__container">
			<p className="favorite-movies__emptytext">There are no movies yet. Please search and add movies to favorite</p>
		</div>
	);

	if (movies.length) {
		content = (
			<>
			<table className = 'favorite-movies__table' >
				<thead>
					<tr className='favorite-movies__tr'>
						<th className='favorite-movies__th'>ID</th>
						<th className='favorite-movies__th'>Image</th>
						<th className='favorite-movies__th'>Title</th>
						<th className='favorite-movies__th'>Overview</th>
						<th className='favorite-movies__th'>Options</th>
					</tr>
				</thead>
				<tbody>
					{movies
						.slice((currentPage - 1) * 5, currentPage * 5)
						.map(({ id, poster_path, original_title, overview }) => (
							<tr key={id} className='favorite-movies__tr'>
								
								<td className='favorite-movies__td'>
									<Link 
										to={`/movies/${id}`}
										className='favorite-movies__link'
									>
										<i className='fas fa-link favorite-movies__icon' />
										<span className='favorite-movies__text'>{id}</span>
									</Link>
								</td>
								
								<td className='favorite-movies__td'>
									<div className='favorite-movies__img-wrapper'>
										<Link to={`/movies/${id}`} >
											<img 
												src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
												alt={original_title} 
												className='favorite-movies__img' 
											/>
										</Link>
										
									</div>
								</td>		
								
								<td className='favorite-movies__td'>{original_title}</td>
								<td className='favorite-movies__td'>{overview}</td>
								
								<td className='favorite-movies__td'>
									<Button
										className="button--red favorite-movies__btn"
										onClick={() => handleRemoveClick(id)}
									>
										Remove
									</Button>
								</td>			
							
							</tr>
						))}
				</tbody>
			</table>
			<Pagination
				className='favorite-movies__pagination'
				current={currentPage}
				total={movies.length}
				onClick={switchPageHandler}
			/>
			</>
		)	
	};
				
	return (
		<div className='favorite-movies'>
			{content}
		</div>
	);
}; 

FavoriteMovies.propTypes = {
	movies: PT.arrayOf(PT.shape({
		poster_path: PT.string,
		id: PT.number.isRequired,
		original_title: PT.string.isRequired,
		overview: PT.string.isRequired,
		databaseId: PT.oneOfType([PT.string, PT.number]).isRequired
	})).isRequired,
	removeMovieFromFavorite: PT.func.isRequired
};

export default FavoriteMovies;