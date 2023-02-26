import React, { useState, createContext } from 'react';

export const ProfileContext = createContext();

const ProfileState = ({ children }) => {

const [userName] = useState('John Doe');
const [userAge,] = useState(25);

		return (
		<ProfileContext.Provider value={{
			name: userName,
			age: userAge
		}}>
			{children}
		</ProfileContext.Provider>
		);
	};



export default ProfileState;