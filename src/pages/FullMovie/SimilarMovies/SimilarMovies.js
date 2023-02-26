import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

import Tooltip from '../../../shared/components/Tooltip/Tooltip';

import './SimilarMovies.scss';

const SimilarMovies = ({ movies }) => {
	return (
		<div className='similar-movies'>
			<ul className='similar-movies__list'>
				{movies.map(({ id, poster_path, original_title }) => (
					<li key={id} className='similar-movies__list-item'>
						<Tooltip
							content={original_title}
							place='left'
							tooltipClass='similar-movies__tooltip'
						>
							<Link 
								to={`${id}`}
								className='similar-movies__link'
							>
								<img 
									src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
									alt={original_title}
									className='similar-movies__img' 
								/>
							</Link>
						</Tooltip>
					</li>
				))}
			</ul>
		</div>
	);
};

SimilarMovies.propTypes = {
	movies: PT.arrayOf(PT.shape({
		poster_path: PT.string,
		id: PT.number.isRequired,
		original_title: PT.string.isRequired,
	})).isRequired
};


export default SimilarMovies;