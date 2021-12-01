// @ts-check

import { QuizzesController } from 'api/quiz/controllers';
import { useQuizStore, useUserStore } from 'flux/stores';

const quizzesController = new QuizzesController();

/** @param {import('types').Assignment} assignment */
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
			done: false,
		});

		const questions = await quizzesController.getQuestionsByAssignment(
			assignment.id
		);

		return useQuizStore.setState({
			questions,
			loading: false,
			pages: questions.length,
			currentPage: 0,
			done: false,
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
			done: false,
		});
	}
};

export const reelectAssignmentQuiz = () => {
	useQuizStore.setState({
		loading: false,
		questions: [],
		pages: 0,
		currentPage: 0,
		assignment: null,
		qualification: 0,
		start: null,
		done: false,
	});
};

export const initiateQuiz = () => {
	useQuizStore.setState({ start: new Date(), done: false });
};

/** @param {number} qualification */
export const finalizeQuiz = async (qualification) => {
	useQuizStore.setState({
		qualification: Math.round(qualification),
		loading: true,
		done: true,
	});

	const user = useUserStore.getState().user;
	const quiz = useQuizStore.getState();

	if (user && quiz.assignment) {
		try {
			await quizzesController.createScore(
				user.id,
				quiz.assignment.id,
				quiz.qualification
			);
		} catch (error) {}
	}

	useQuizStore.setState({ loading: false });
};

/**
 * @param {number} optionIndex
 * @param {number} answerIndex
 */
export const qualifyAnswerAndNext = (optionIndex, answerIndex) => {
	const {
		pages,
		currentPage,
		qualification: prevQualification,
	} = useQuizStore.getState();

	const isCorrect = optionIndex + 1 === answerIndex;

	const hundredthQualification = (prevQualification / 100) * pages;

	const correctAnswers = isCorrect
		? hundredthQualification + 1
		: hundredthQualification;

	const hasNextPage = currentPage + 1 < pages;

	const qualification = (correctAnswers / pages) * 100;

	if (hasNextPage) {
		useQuizStore.setState({ qualification, currentPage: currentPage + 1 });
	} else {
		finalizeQuiz(Math.round(qualification));
	}
};
