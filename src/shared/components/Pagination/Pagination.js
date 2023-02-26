import React from 'react';
import PT from 'prop-types';
import classNames from 'classnames';

import './Pagination.scss';
import Button from '../Button/Button';

const Pagination = ({
	className,
	current,
	total,
	onClick
}) => {
	const numbers = [];
	const maxCount = 5;
	const totalPages = Math.ceil(total / maxCount);

	const startPage = Math.max(1, current - 2);
	const endPage = Math.min(totalPages, current + 2);

	for (let i = startPage; i <= endPage; i++) {
		numbers.push(i);
	}


	return (
		<div
			className={classNames('pagination', {
				[className]: className
			})}
		>
			<Button
				className={classNames('pagination__btn', {
					'pagination__btn--disabled': current === 1
				})}
				onClick={() => onClick(current - 1)}
				disabled={current === 1}
			>
				{'<'}
			</Button>
			{numbers.map(n => (
				<Button
					key={n}
					className={classNames('pagination__btn', {
						'pagination__btn--active': n === current
					})}
					onClick={() => onClick(n)}
				>
					{n}
				</Button>
			))}
			<Button
				className={classNames('pagination__btn', {
					'pagination__btn--disabled': current === totalPages
				})}
				onClick={() => onClick(totalPages)}
				disabled={current === totalPages}
			>
				{'>>'}
			</Button>
		</div>
	);
};

Pagination.propTypes = {
	className: PT.string,
	current: PT.number.isRequired,
	total: PT.number.isRequired,
	onClick: PT.func.isRequired
};

export default Pagination;
