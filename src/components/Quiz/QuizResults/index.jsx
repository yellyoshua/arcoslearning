// @ts-check
import React from 'react';
import { useQuizStore } from 'flux/stores';
import { reelectAssignmentQuiz } from 'flux/actions';

export const QuizResults = () => {
	const { qualification } = useQuizStore();

	const reelecAssignmenttHandler = () => {
		reelectAssignmentQuiz();
	};

	return (
		<div>
			<p>Done {qualification}</p>
			<button
				onClick={reelecAssignmenttHandler}
				className='m-2 btn btn-success'
			>
				Intentarlo denuevo
			</button>
		</div>
	);
};
