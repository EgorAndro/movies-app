import React from 'react';
import { createPortal } from 'react-dom';

import PT from 'prop-types';

import './Loader.scss';

const Loader = ({ type, toPortal = true }) => {
	const loaderClasses = [
		'fas',
		'fa-spinner',
		'loader',
		`loader--${type}`
		];
	if (toPortal) {
		return createPortal(
			<i className={loaderClasses.join(' ')} />,
			document.getElementById('modal-root')
		);
	}
	return <i className={loaderClasses.join(' ')} />;
};

Loader.propTypes = {
	type: PT.string.isRequired,
	toPortal: PT.bool
};

export default Loader;