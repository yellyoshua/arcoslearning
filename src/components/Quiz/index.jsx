// @ts-check
import React from 'react';
import { useQuizStore } from 'flux/stores';
import shallow from 'zustand/shallow';
import { initiateQuiz, reelectAssignmentQuiz } from 'flux/actions';
import { QuizDetails } from './QuizDetails';
import { QuizGreeting } from './QuizGreeting';
import { QuizEvaluation } from './QuizEvaluation';

export const Quiz = () => {
	const { loading, start } = useQuizStore(
		(state) => ({
			loading: state.loading,
			start: state.start,
		}),
		shallow
	);

	const reelecAssignmenttHandler = () => {
		reelectAssignmentQuiz();
	};

	const startQuizHandler = () => {
		initiateQuiz();
	};

	if (loading) {
		return <p>Loading...</p>;
	}

	if (start) {
		return <QuizEvaluation />;
	}

	return (
		<section className='container'>
			<QuizGreeting />
			<QuizDetails />
			<div className='text-center '>
				<button
					onClick={reelecAssignmenttHandler}
					className='m-2 btn btn-success'
				>
					Regresar
				</button>

				<button onClick={startQuizHandler} className='m-2 btn btn-danger'>
					Comenzar 🥳!
				</button>
			</div>
		</section>
	);
};
