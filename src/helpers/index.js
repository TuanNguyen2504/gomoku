import { N_ROWS } from './constant';

function getVerticalLine(index, squares = []) {
	const len = squares.length;
	const res = [];

	for (let i = index - N_ROWS; i >= 0; i -= N_ROWS) res.push(i);
	res.push(index);
	for (let i = index + N_ROWS; i < len; i += N_ROWS) res.push(i);

	return res;
}

function getHorizontalLine(index) {
	const res = [];

	for (let i = index - 1; ; --i) {
		res.push(i);
		if (i % N_ROWS === 0) break;
	}
	res.push(index);
	for (let i = index + 1; i % N_ROWS !== 0; ++i) res.push(i);

	return res;
}

function getMainDiagonalLine() {
	return Array.from({ length: N_ROWS }, (_, i) => i * (N_ROWS + 1));
}

function getAuxiliaryDiagonalLine() {
	return Array.from({ length: N_ROWS }, (_, i) => (i + 1) * (N_ROWS - 1));
}

function checkVerticalLine(index = 0, squares = []) {
	const len = squares.length;
	const p = squares[index]; // player
	if (!p) return false;

	for (let i = index + N_ROWS; i < len; i += N_ROWS) {
		if (squares[i] !== p) return false;
	}
	for (let i = index - N_ROWS; i >= 0; i -= N_ROWS) {
		if (squares[i] !== p) return false;
	}

	return true;
}

function checkHorizontalLine(index = 0, squares = []) {
	const p = squares[index]; // player
	if (!p) return false;

	for (let i = index + 1; i % N_ROWS !== 0; ++i) {
		if (squares[i] !== p) return false;
	}
	for (let i = index - 1; ; --i) {
		if (squares[i] !== p) return false;
		if (i % N_ROWS === 0) break;
	}

	return true;
}

function checkMainDiagonalLine(squares = []) {
	const center = (N_ROWS * N_ROWS - 1) / 2;
	const p = squares[center]; // player
	if (!p) return false;

	const cross = getMainDiagonalLine();
	for (let i of cross) {
		if (squares[i] !== p) return false;
	}

	return true;
}

function checkAuxiliaryDiagonalLine(squares = []) {
	const center = (N_ROWS * N_ROWS - 1) / 2;
	const p = squares[center]; // player
	if (!p) return false;

	const cross = getAuxiliaryDiagonalLine();
	for (let i of cross) {
		if (squares[i] !== p) return false;
	}

	return true;
}

export function calculateWinner(squares = []) {
	const len = squares.length;
	const center = (N_ROWS * N_ROWS - 1) / 2;

	if (checkMainDiagonalLine(squares)) {
		return { player: squares[center], lines: getMainDiagonalLine() };
	}

	if (checkAuxiliaryDiagonalLine(squares)) {
		return { player: squares[center], lines: getAuxiliaryDiagonalLine() };
	}

	for (let i = 0; i < len; ++i) {
		if (checkVerticalLine(i, squares))
			return { player: squares[i], lines: getVerticalLine(i, squares) };

		if (checkHorizontalLine(i, squares))
			return { player: squares[i], lines: getHorizontalLine(i) };
	}

	return null;
}
