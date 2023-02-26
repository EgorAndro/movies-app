import React, {Component} from 'react';
import PT from 'prop-types';
import {Link} from 'react-router-dom';

import Footer from '../Footer/Footer';

import './ErrorBoundary.scss';


class ErrorBoundary extends Component {
    state = {
        error: null
    }

	static getDerivedStateFromError(error) {
		return { error };
	}
	

    render() {
        const { error } = this.state;
        const { children } = this.props;

        if (!error) return children;

        const { name, message } = error;

        return (
            <div className="error-boundary">
                <div className="error-boundary__content">
                    <div className="error-boundary__body">
                        <h1 className="error-boundary__title">{name}</h1>
                        <p className="error-boundary__text">{message}</p>

                        <Link to="/" className="error-boundary__link">Return to previous page</Link>
                    </div>
                </div>

                <Footer />
            </div>
        );
    }
}

    ErrorBoundary.propTypes = {
        children: PT.oneOfType([
            PT.object,
            PT.arrayOf(PT.object),
            PT.bool
        ]).isRequired
    };

export default ErrorBoundary;