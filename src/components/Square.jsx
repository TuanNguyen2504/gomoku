import React from 'react';

function Square({ value, onClick, isSelected = false, isHighlight = false }) {
	return (
		<div
			className={`square ${isSelected ? 'selected' : ''} ${
				isHighlight ? 'win-highlight' : ''
			}`}
			onClick={onClick}
		>
			{value}
		</div>
	);
}

export default Square;
