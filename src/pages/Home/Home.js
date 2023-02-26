import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import './Home.scss';
const Home = ({ movies }) => {
	let content = (
		<div className="home__container">
			<p className="home__text">There are no movies yet.</p>
		</div>
	);
	if (movies.length) {
		content = (
			<div className="home__movies">
				{movies.map(({ id, original_title, poster_path }) => (
					<div 
					key={id} 
					className="home__movie"
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/w500${poster_path})`
					}}
					>
						<h1 className="home__title">
							{original_title}
						</h1>

						<Link 
							to={`/movies/${id}`}
							className="button button--blue home__link"
						>
							Read More
						</Link>
					</div>
				))}
			</div>
		);
	}
	return (
		<div className="home">
			<div className='home__wrapper'>
				{content}
			</div>
		</div>
	);
};
Home.propTypes = {
	movies: PT.arrayOf(PT.shape({
		poster_path: PT.string,
		id: PT.number.isRequired,
		backdrop_path: PT.string,
		original_title: PT.string.isRequired,
		overview: PT.string.isRequired,
		release_date: PT.string.isRequired
	})).isRequired
};
export default Home;