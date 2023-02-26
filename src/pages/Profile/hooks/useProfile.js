import { useEffect, useState, useCallback, useReducer, useRef } from 'react';
import {useSelector} from 'react-redux'
import Axios from 'axios';

import reducer, { initialState } from '../store/reducer';
import { saveUserData } from '../store/actions';

export const useProfile = () => {

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [age, setAge] = useState('');
	const [store, dispatch] = useReducer(reducer, initialState);
	const formRef = useRef(store);

	const databaseKey = useSelector(state => state.auth.databaseKey);

	useEffect(() => {
		const axios = Axios.create({
			baseURL: 'https://movies-app-89976-default-rtdb.firebaseio.com'
		});

		if (!databaseKey) return;
		axios.get(`users/${databaseKey}.json`)
			.then((response) => {
				if (!response.data) return;

				const { firstName, lastName, age } = response.data;

				setFirstName(firstName);
				setLastName(lastName);
				setAge(age);

			}).catch((err) => {

			});
	}, [databaseKey]);

	useEffect(() => {
		console.log(store);
		console.log(formRef)
	}, [store, formRef]);

	const onChangeHandler = useCallback(e => {
		const { name, value } = e.target;

		if (name === 'firstName') {
			return setFirstName(value);
		}
		if (name === 'lastName') {
			return setLastName(value);
		}
		if (name === 'age') {
			setAge(value);
		}
	}, []);

	const onSubmitHandler = useCallback(e => {
		e.preventDefault();

		const userData = { firstName, lastName, age };

		
		const axios = Axios.create({
			baseURL: 'https://movies-app-89976-default-rtdb.firebaseio.com'
		});

		if (!databaseKey) return;
		axios.put(`users/${databaseKey}.json`, userData)
			.then(response => {
				
				console.log('User data saved successfully!');
			})
			.catch(error => {
				
				console.log('Error occurred while saving user data:', error);
			});

		dispatch(saveUserData(userData));

	}, [firstName, lastName, age, databaseKey, dispatch]);


	return {
		firstName,
		lastName,
		age,
		onChangeHandler,
		onSubmitHandler
	};
};