// @ts-check
import { useQuizStore } from 'flux/stores';
import React from 'react';

export const QuizDetails = () => {
	const { assignment, pages } = useQuizStore();

	return (
		<div className='row justify-content-center'>
			<div className='card m-3' style={{ width: '18rem' }}>
				<div className='card-body text-center'>
					<h3 className='card-text text-danger'>{assignment}</h3>
					<h6 className='card-text text-danger'>{pages} preguntas</h6>
				</div>
			</div>
		</div>
	);
};
