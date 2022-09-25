import React, { useRef, useState } from 'react';
import { calculateWinner } from '../helpers';
import { N_ROWS, PLAYERS } from './../helpers/constant';
import Board from './Board';
import History from './History';

function Game() {
	const [squares, setSquares] = useState(Array(N_ROWS * N_ROWS).fill(null));
	const [selected, setSelected] = useState(-1);
	const [isAscending, setIsAscending] = useState(true);
	const history = useRef([{ step: 0, squares, location: { row: 0, col: 0 } }]);
	const step = useRef(0);

	const winner = calculateWinner(squares);
	const status = winner
		? `Winner: ${winner.player}`
		: squares.includes(null)
		? `Next player: ${step.current % 2 ? PLAYERS.O : PLAYERS.X}`
		: 'End game: Draw Result';

	const handleMove = (pos, location) => {
		if (squares[pos] || calculateWinner(squares)) return;
		if (step.current < history.current.length - 1) {
			history.current = history.current.slice(0, step.current + 1);
		}

		const newSquares = [...squares];
		newSquares[pos] = step.current % 2 ? PLAYERS.O : PLAYERS.X;
		step.current++;

		history.current.push({
			step: step.current,
			squares: [...newSquares],
			location,
		});

		setSelected(pos);
		setSquares(newSquares);
	};

	const handleJumpToHistory = item => {
		const { row, col } = item.location;
		step.current = item.step;
		setSelected((row - 1) * N_ROWS + col - 1);
		setSquares([...item.squares]);
	};

	return (
		<div className='game'>
			<Board
				squares={squares}
				onClick={handleMove}
				selected={selected}
				winLines={winner?.lines}
			/>
			<div className='game-info'>
				<div className='status-wrap'>
					<div className='game-status'>{status}</div>
					<button
						className='sort-btn'
						onClick={() => setIsAscending(!isAscending)}
					>
						{isAscending ? 'Sort Ascending' : 'Sort Descending'}
					</button>
				</div>
				<History
					history={history.current}
					onJumpTo={handleJumpToHistory}
					currentStep={step.current}
					isAscending={isAscending}
				/>
			</div>
		</div>
	);
}

export default Game;
