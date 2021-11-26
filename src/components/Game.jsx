import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGame from 'hooks/useGame';
import { AppContext } from '../store';
import Question from './Question';

const GameComponent = ({ questions = [], timer = 5 }) => {
	const [game, gameAction] = useGame({ questions });
	const [rank, setRank] = useState(null);
	const [app, actions] = useContext(AppContext);
	const [started, setStart] = useState(false);
	const [counter, setCounter] = useState(timer);

	useEffect(() => {
		if (!started) {
			if (counter === 0) {
				setStart(true);
				return () => {};
			}
			const timer = setTimeout(() => setCounter(counter - 1), 1000);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [counter]);

	const goNext = (answer) => {
		const rank = gameAction.goNextQuestion(answer);
		if (rank) {
			const game = getGameName(app.gameOptions, app.currentGame);
			actions.addScore({ ...rank, user: app.user, avatar: app.avatar, game });
		}
		setRank(rank);
	};

	if (!started) {
		return (
			<section className='container'>
				<div className='container-fluid'>
					<p className='init-greeting'>
						Bueno {app.user}, vamos a comenzar con esto.
					</p>
					<p className='init-greeting text-primary'>
						{getGameName(app.gameOptions, app.currentGame)}
					</p>
				</div>
				<div className='row justify-content-center'>
					<div className='card m-3' style={{ width: '18rem' }}>
						<div className='card-body text-center'>
							<h3 className='card-text text-danger'>{counter}</h3>
						</div>
					</div>
				</div>
				<div className='text-center'>
					<button onClick={actions.goHome} className='btn btn-success'>
						Regresar
					</button>
				</div>
			</section>
		);
	}

	if (questions.length > game.question) {
		let page = questions[game.question];
		return (
			<Question name={page.question} options={page.options} onAnswer={goNext} />
		);
	}

	return (
		<div>
			<h2 className='text-center mb-3'>SCORE</h2>
			{rank && <h3 className='text-center my-3'>{rank.qualification}</h3>}
			<div className='text-center'>
				<button onClick={actions.goHome} className='btn btn-danger mx-3'>
					Jugar otra vez
				</button>
				<Link to='/scores' className='btn btn-success mx-3'>
					Jugadas
				</Link>
			</div>
		</div>
	);
};

const getGameName = (gameOptions = [], gameName) => {
	const found = gameOptions.find(({ game }) => {
		return game === gameName;
	});

	if (found) {
		return found.name;
	} else {
		return '---';
	}
};

export default GameComponent;
