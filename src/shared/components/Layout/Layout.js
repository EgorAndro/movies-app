import React from 'react';
import PT from 'prop-types';

import Toolbar from '../Toolbar/Toolbar';
import Loader from '../Loader/Loader';
import Backdrop from '../Backdrop/Backdrop';
import Footer from '../Footer/Footer';

import './Layout.scss';


const Layout = ({ 
	search,
	isFetching,
	onChangeInput,
	searchMovies,
	children
 }) => {
	return (
		<div className="layout">
			<Toolbar 
				search={search}
				isFetching={isFetching}
				onChangeInput={onChangeInput}
				className="toolbar--sticky"
				searchMovies={searchMovies}
			/>
			<div className="layout__content">
				{children}

				{
					isFetching &&

					<>
						<Backdrop />
						<Loader type="orange" />
					</>

				}	
			</div>
			

			<Footer />
		</div>
	);
};

Layout.propTypes = {
	search: PT.string.isRequired,
	isFetching: PT.bool.isRequired,
	onChangeInput: PT.func.isRequired,
	searchMovies: PT.func.isRequired,
	children: PT.oneOfType ([
		PT.object,
		PT.arrayOf (PT.object)
	]).isRequired
};
export default Layout;