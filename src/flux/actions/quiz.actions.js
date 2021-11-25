// @ts-check

import { QuizzesController } from 'api/quiz/controllers';
import { useQuizStore } from 'flux/stores';

const quizzesController = new QuizzesController();

/** @param {string} assignment */
export const getQuestionsByAssignment = async (assignment) => {
	try {
		useQuizStore.setState({
			loading: true,
			questions: [],
			pages: 0,
			currentPage: 0,
			assignment,
			qualification: 0,
			start: null,
		});

		const questions = await quizzesController.getQuestionsByAssignment(
			assignment
		);

		return useQuizStore.setState({
			questions,
			loading: false,
			pages: questions.length,
			currentPage: 0,
		});
	} catch (error) {
		return useQuizStore.setState({
			loading: false,
			questions: [],
			pages: 0,
			currentPage: 0,
			assignment: null,
			qualification: 0,
			start: null,
		});
	}
};
