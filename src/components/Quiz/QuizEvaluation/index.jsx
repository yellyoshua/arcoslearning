// @ts-check
import React from 'react';
import shallow from 'zustand/shallow';
import { useQuizStore } from 'flux/stores';
import { QuizTiming } from 'components/QuizTiming';
import { QuizQuestion } from '../QuizQuestion';
import { QuizResults } from '../QuizResults';

export const QuizEvaluation = () => {
	const { questions, currentPage, done } = useQuizStore(
		(state) => ({
			questions: state.questions,
			currentPage: state.currentPage,
			done: state.done,
		}),
		shallow
	);

	if (done) {
		return <QuizResults />;
	}

	return (
		<div>
			<QuizQuestion
				question={questions[currentPage]}
				answerIndex={questions[currentPage].answerIndex}
			/>
			<QuizTiming />
		</div>
	);
};
