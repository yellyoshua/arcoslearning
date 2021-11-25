// @ts-check

import { QuizzesController } from 'api/quiz/controllers';
import { useQuizStore } from 'flux/stores';

const quizzesController = new QuizzesController();

/** @param {string} assignment */
export const getQuestionsByAssignment = async (assignment) => {
	try {
		useQuizStore.setState({ loading: true });
		const questions = await quizzesController.getQuestionsByAssignment(
			assignment
		);
		useQuizStore.setState((prev) => ({
			questions,
			loading: false,
			pages: questions.length,
			currentPage: prev.currentPage + 1,
		}));
	} catch (error) {}
};
