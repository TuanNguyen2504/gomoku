import React from 'react';

function History({
	history = [],
	currentStep = 0,
	isAscending = true,
	onJumpTo,
}) {
	let renderHistory = [...history];
	if (!isAscending) {
		renderHistory.sort((a, b) => b.step - a.step);
	}

	return (
		<ol className='game-history'>
			{renderHistory.map(item => {
				const { step, location = {} } = item;
				const { row, col } = location;
				const desc = step
					? `Go to move #${step} (row: ${row}, col: ${col})`
					: 'Go to game start';
				return (
					<li
						key={step}
						className={currentStep === step ? 'history-active' : ''}
					>
						<button onClick={() => onJumpTo(item)}>{desc}</button>
					</li>
				);
			})}
		</ol>
	);
}

export default History;
