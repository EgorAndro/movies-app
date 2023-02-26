import React from 'react';

import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import ProfileState from './ProfileState/ProfileState';
import {useProfile} from './hooks/useProfile';
import {useFormInput} from './hooks/useFormInput';
import {ProfileWrapper, Fields, Form, Title} from './UI';

import './Profile.scss';
 
const Profile = () => {

	const {
		firstName,
		lastName,
		age,
		onChangeHandler,
		onSubmitHandler
	} = useProfile();

	const passwordProps = useFormInput('');

		return 	(
			<ProfileState>
				<ProfileWrapper>
					<Form>
						<Title>Profile</Title>
						<Fields>
							<Input
							wrapperClassName="profile__input-wrapper" 
							className="profile__input"						
							label="First name"
							name="firstName"
							value={firstName}
							onChange={onChangeHandler}
						/>
						<Input
							wrapperClassName="profile__input-wrapper" 
							className="profile__input"
							label="Last name"
							name="lastName"
							value={lastName}
							onChange={onChangeHandler}
						/>
						<Input
							wrapperClassName="profile__input-wrapper" 
							className="profile__input"
							label="Age"
							name="age"
							value={age}
							onChange={onChangeHandler}
						/>
						<Input
							{...passwordProps}
							wrapperClassName="profile__input-wrapper"
							className="profile__input"
							label="Password"
							name="password"
						/>
						</Fields>
						<Button 
							className="button--orange profile__btn"
							onClick={onSubmitHandler}
						> 
							Submit
						</Button>
					</Form>
				</ProfileWrapper>
			</ProfileState>
			
			);
		}

export default Profile;


