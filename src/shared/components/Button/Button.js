import React, { memo } from 'react';
import PT from 'prop-types';
import classNames from 'classnames';

import './Button.scss';

const Button = ({
	type = 'button',
	className,
	isDisabled = false,
	onClick,
	children
}) => {
		

		return (
			<button
				type={type}
				className={classNames('button', {
				[className]: className
			})}
				disabled={isDisabled}
				onClick={onClick}
			>
				{children}
			</button>
		);
};

Button.propTypes = {
	type: PT.oneOf(['button', 'submit']),
	className: PT.string,
	isDisabled: PT.bool,
	onClick: PT.func,
	children: PT.oneOfType([
		PT.string,
		PT.number,
		PT.object,
		PT.arrayOf(PT.object)
	]).isRequired
}


export default memo(Button);