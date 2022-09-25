import React from 'react';
import { N_ROWS } from '../helpers/constant';
import Square from './Square';

function Board({ squares = [], onClick, selected = -1, winLines = [] }) {
	return (
		<div>
			{Array(N_ROWS)
				.fill(1)
				.map((_, i) => (
					<div key={i} className='board-row'>
						{Array(N_ROWS)
							.fill(1)
							.map((_, j) => {
								const pos = i * N_ROWS + j;
								return (
									<Square
										isSelected={selected === pos}
										isHighlight={winLines.includes(pos)}
										value={squares[pos]}
										key={`${i}${j}`}
										onClick={() => onClick(pos, { row: i + 1, col: j + 1 })}
									/>
								);
							})}
					</div>
				))}
		</div>
	);
}

export default Board;
