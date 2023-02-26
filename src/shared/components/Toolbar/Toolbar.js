import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';

import Input from '../Input/Input';
import Button from '../Button/Button';
import NavBar from '../NavBar/NavBar';
import {logoutUser} from '../../../store/actions/auth'

import './Toolbar.scss';

const Toolbar = ({
	isAuthenticated,
	search,
	isFetching,
	onChangeInput,
	className,
	searchMovies,
	logoutUser
}) => {

	const onKeyDownHandler = e => {
		if (e.key !== 'Enter' || !search) return;

		searchMovies();
	};

	const toolbarClasses = ['toolbar'];

	if (isAuthenticated && className) {
		toolbarClasses.push(className);
	}

	return (
		<div className={toolbarClasses.join(' ')}>
			<div className='toolbar__wrapper'>
				{
					isAuthenticated
					? (
						<>
						<div className='toolbar__tools'>
							<Input
								label="Enter request here"
								name="search"
								className="toolbar__input"
								value={search}
								onChange={onChangeInput}
								onKeyDown={onKeyDownHandler}
							/>
							<Button
								className="button--orange"
								isDisabled={isFetching || !search}
								onClick={searchMovies}
							>
								{ isFetching ? 'Searching...' : 'Search' }
							</Button>
						</div>

						<NavBar logoutUser={logoutUser} />
						</>
					)
					: <h1 className='toolbar__title'>Welcome to our application, please login or register</h1>
				}
				
			</div>
		</div>
	);
}

Toolbar.propTypes = {
	isAuthenticated: PT.bool.isRequired,
	search: PT.string.isRequired,
	isFetching: PT.bool.isRequired,
	onChangeInput: PT.func.isRequired,
	className: PT.string,
	searchMovies: PT.func.isRequired

};

export default connect(
	state => ({
		isAuthenticated: !!state.auth.idToken
	}),
	{ logoutUser }
)(Toolbar);