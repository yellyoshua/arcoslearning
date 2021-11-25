// @ts-check
import React, { useEffect } from 'react';
import { useScoresStore } from 'flux/stores';
import { getQuizzesScores } from 'flux/actions';

const Results = () => {
	const { scores, loading } = useScoresStore();

	useEffect(() => {
		getQuizzesScores();
	}, []);

	const renderLoading = () => {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	};

	const renderTableOfContent = () => {
		return (
			<table className='text-center rounded table table-light table-hover table-responsive-sm'>
				<thead>
					<tr>
						<th scope='col'>Avatar</th>
						<th scope='col'>Usuario</th>
						<th scope='col'>Juego</th>
						<th scope='col'>Calificaci&oacute;n</th>
					</tr>
				</thead>
				<tbody>
					{scores
						.sort((a, b) => a.qualification - b.qualification)
						.map((score, key) => {
							return (
								<tr key={key}>
									<th scope='row'>
										<img
											src={score.user.avatar?.url}
											width='40'
											height='40'
											className='d-inline-block align-top mx-3'
											alt={'avatar-' + score.user.name}
										/>
									</th>
									<td>{score.user.name}</td>
									<td>{score.quiz}</td>
									<td className='d-flex justify-content-center align-items-center'>
										<p>{score.qualification}/100</p>
										<p
											className='text-white'
											style={{ padding: '0px 10px', borderRadius: '50%' }}
										>
											{score.score}
										</p>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		);
	};

	return (
		<React.Fragment>
			<section className='container'>
				<p className='init-greeting'>LISTA GANADORES</p>
				{loading ? renderLoading() : renderTableOfContent()}
			</section>
			<section className='footer container'>
				<blockquote className='blockquote text-center'>
					<footer className='blockquote-footer'>
						Por <cite title='Briggitte Arcos'>Briggitte Arcos</cite>
					</footer>
				</blockquote>
			</section>
		</React.Fragment>
	);
};

export default Results;
