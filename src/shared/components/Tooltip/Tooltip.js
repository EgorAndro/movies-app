import React from 'react';
import ReactTooltip from 'react-tooltip';
import {v1 as uuid} from 'uuid';
import PT from 'prop-types';

import './Tooltip.scss';

const Tooltip = ({ 
	content,
	effect = 'solid',
	place = 'top',
	tooltipClass,
	children }) => {

	const uniqueId = uuid();

	const tooltipClasses = ['tooltip'];
	
	if (tooltipClass) {
		tooltipClasses.push(tooltipClass);
	}

	return (
		<>
			<p 
				data-tip={content} 
				data-for={uniqueId}
				data-effect={effect}
				data-place={place}
				data-class={tooltipClasses.join(' ')}
				data-delay-hide={300}
			>
				{children}
			</p>

			<ReactTooltip id={uniqueId} />
		</>
		
	);
};

Tooltip.propTypes = {
	content: PT.string.isRequired,
	effect: PT.oneOf(['solid', 'float']),
	place: PT.oneOf(['top', 'bottom', 'left', 'right']),
	tooltipClass: PT.string,
	children: PT.oneOfType([
		PT.object,
		PT.arrayOf(PT.object)
	]).isRequired
};

export default Tooltip;