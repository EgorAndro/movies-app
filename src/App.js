import React, { Component, Suspense, lazy } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Axios from 'axios';

import ErrorBoundary from './shared/components/ErrorBoundary/ErrorBoundary';
import Layout from './shared/components/Layout/Layout';
import { authenticateUser } from './store/actions/auth';
import { fetchFavoriteMovies, addMovieToFavorite, removeMovieFromFavorite } from './store/actions/favoriteMovies';

const Home = lazy(() => import('./pages/Home/Home'));
const FullMovie = lazy(() => import('./pages/FullMovie/FullMovie'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Auth = lazy(() => import('./pages/Auth/Auth'));
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const FavoriteMovies = lazy(() => import('./pages/FavoriteMovies/FavoriteMovies'));

const API_KEY = '9032d3a2a129d4cd56f0a5349c06cd18';

const axios = Axios.create({
	baseURL: 'https://api.themoviedb.org/3'
});

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			search: '',
			movies: [],
			isFetching: false
		};
	}
	

	componentDidMount() {
		const { authenticateUser, fetchFavoriteMovies } = this.props;

		const idToken = localStorage.getItem('idToken');
		const localId = localStorage.getItem('localId');
		const databaseKey = localStorage.getItem('databaseKey');

		const isAuthenticated = !!idToken && !!localId && !!databaseKey;

		if (!isAuthenticated){
			localStorage.removeItem('idToken');
			localStorage.removeItem('localId');
			localStorage.removeItem('databaseKey');
			return;
		} 
		
		authenticateUser(idToken, localId, databaseKey);
		this.fetchMovies('fast furious');
		fetchFavoriteMovies(databaseKey);
		
	}
	componentDidUpdate = (prevProps) => {
		const { isAuthenticated, fetchFavoriteMovies, databaseKey } = this.props;

		if (!prevProps.isAuthenticated && isAuthenticated) {
			this.fetchMovies('fast furious');
			fetchFavoriteMovies(databaseKey);
		}
	}
	

	onChangeInputHandler = e => {
		const { name, value } = e.target;

		this.setState({ [name]: value });
	}

	fetchMovies = (query, afterSuccesfulFetch) => {
		this.setState({ isFetching: true });

		axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1`)
			.then(response => {

				if (!response.data) return;

				const movies = response.data.results;

				setTimeout(() => {
					this.setState({ movies });
				}, 500);
			})
			.catch(error => {
				console.log(error);
			})
			.finally(() => {
				setTimeout(() => {
					this.setState({ isFetching: false });

					if(!afterSuccesfulFetch) return;

					afterSuccesfulFetch();
				}, 500);
			});
	}

	searchMovies = () => {
		const { search } = this.state;

		if (!search) return;

		const { history } = this.props;

		this.fetchMovies(search, () => history.push('/'));
	}

	render() {
		const { search, movies, isFetching } = this.state;
		const {
			favoriteMovies,
			addMovieToFavorite,
			removeMovieFromFavorite
		} = this.props;
		
		const idToken = localStorage.getItem('idToken');
		const localId = localStorage.getItem('localId');

		const isAuthenticated = !!idToken && !!localId;

		return (
			<ErrorBoundary>
				<Layout
					search={search}
					isFetching={isFetching}
					onChangeInput={this.onChangeInputHandler}
					searchMovies={this.searchMovies}
				>	
				<Suspense fallback={<h3 style={{ color: '#fff' }}>Now Loading...</h3>}>
					<Switch>
						{
							!isAuthenticated && 
								<>
								<Route path="/auth" component={Auth}
								/>
								<Redirect to="/auth" />
								</>
							
						}
						<Switch>
							<Route path="/" exact render={() => {
								return <Home movies={movies} />;
							}}
							/>
							<Route path="/movies/:movieId" render={props => {
								return (
									<FullMovie
									{...props}
									movies={movies}
									favoriteMovies={favoriteMovies}
									addMovieToFavorite={addMovieToFavorite}
									removeMovieFromFavorite={removeMovieFromFavorite}
									/>
								);
							}}
							/>
							
							<Route path="/favorite-movies" render={() => {
								return <FavoriteMovies 
											movies={favoriteMovies} 
											removeMovieFromFavorite={removeMovieFromFavorite} 
										/>;
							}}
							/>
							<Route path="/profile" component={Profile}
							/>
							<Route path="/logout" render={() => {
								return <p>Logout</p>;
							}}
							/>
							<Route path="/404" component={PageNotFound}
							/>
						<Redirect from="/auth" to='/' />
						<Redirect to="/404" />
						</Switch>
					</Switch>	
				</Suspense>
					
				
				</Layout>
			</ErrorBoundary>
		);
	}
}


export default connect(
	state => ({
		isAuthenticated: !!state.auth.idToken,
		databaseKey: state.auth.databaseKey,
		favoriteMovies: state.favoriteMovies.movies
	}),
	{ 
		authenticateUser,
		fetchFavoriteMovies,
		addMovieToFavorite, 
		removeMovieFromFavorite
	}
)(withRouter(App)); 
