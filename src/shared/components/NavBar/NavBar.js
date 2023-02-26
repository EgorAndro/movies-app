import React from 'react';
import { NavLink } from 'react-router-dom';
import PT from 'prop-types';

import './NavBar.scss';

const links = [
	{
		id: 1,
		url: '/',
		title: 'Home',
		exact: true
	},
	{
		id: 2,
		url: '/favorite-movies',
		title: 'Favorite Movies'
	},
	{
		id: 3,
		url: '/profile',
		title: 'Profile'
	},
	{
		id: 4,
		title: 'Logout'
	}
];

const activeClassName = "navbar__link--active";

const NavBar = ({ logoutUser }) => (
		<nav className="navbar">
			<ul className="navbar__list">
				{links.map(({ id, url, title, exact }) => {
					if (!url) {
						return (
							<li key={id} className="navbar__list-item">
								<span 
								className="navbar__link"
								onClick={logoutUser}
								>
									{title}
								</span>
							</li>
						);
						}

					return (
							<li key={id} className="navbar__list-item">
								<NavLink
									to={url}
									exact={exact}
									className="navbar__link"
									activeClassName={activeClassName}
								>
									{title}
								</NavLink>
							</li>
							);
						})}
			</ul>
		</nav>
);
NavBar.propTypes = {
	logoutUser: PT.func.isRequired
};

export default NavBar;