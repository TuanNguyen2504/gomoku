import './App.css';
import Game from './components/Game';

function App() {
	return (
		<div className='App'>
			<div className='title'>
				<h1>Gomoku game</h1>
				<h2>18120634 - Nguyễn Lê Anh Tuấn</h2>
			</div>

			<Game />
		</div>
	);
}

export default App;
