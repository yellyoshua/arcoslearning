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
			done: false,
		});

		const questions = await quizzesController.getQuestionsByAssignment(
			assignment
		);

		return useQuizStore.setState({
			questions,
			loading: false,
			pages: questions.length,
			currentPage: 0,
			done: false,
		});
	} catch (error) {
		console.error(error);
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
export const finalizeQuiz = (qualification) => {
	useQuizStore.setState({
		qualification: Math.round(qualification),
		loading: true,
		done: true,
	});

	// TODO: upload the quiz results
	// in the api validate (userId and assignment)
	// if can update or create a new

	useQuizStore.setState({ loading: true });
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
