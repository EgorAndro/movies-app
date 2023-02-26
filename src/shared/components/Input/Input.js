import React from 'react';
import PT from 'prop-types';
import classNames from 'classnames'
import { v1 as uuid } from 'uuid';

import './Input.scss';

const  Input = ({
	type = 'text',
	name,
	label,
	value,
	wrapperClassName,
	className,
	onChange,
	onBlur,
	onKeyDown
}) => {
	const uniqueId = uuid();
	
	return (
		<div className={classNames('input-wrapper', {
			[wrapperClassName]: wrapperClassName
		})}>
			<label 
				htmlFor={uniqueId} 
				className={classNames('input-wrapper__label', {
					'input-wrapper__label--top': value
				})}
			>
				{label}
			</label>
			<input
				id={uniqueId}
				type={type}
				name={name}
				className={classNames('input-wrapper__input', {
					[className]: className
				})}
				autoComplete="off"
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			/>
	
		</div>

	);
};

Input.propTypes = {
	type: PT.oneOf(['text', 'email', 'number', 'password']),
	name: PT.string,
	label: PT.string,
	wrapperClassName: PT.string,
	className: PT.string,
	value: PT.oneOfType([
		PT.string,
		PT.number
	]).isRequired,
	onChange: PT.func.isRequired,
	onBlur: PT.func,
	onKeyDown: PT.func
};

export default Input;