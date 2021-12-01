// @ts-check
import { useQuizStore } from 'flux/stores';
import { QuizzesController } from 'api/quiz/controllers';
import {
	getQuestionsByAssignment,
	initiateQuiz,
	finalizeQuiz,
	qualifyAnswerAndNext,
	reelectAssignmentQuiz,
} from 'flux/actions/quiz.actions';

const sampleQuestion = {
	id: 'sample-question-id',
	assignment: { id: 'random-id', name: 'Matematica' },
	question: 'this is a question',
	options: ['a', 'b'],
	answerIndex: 1,
};

jest.spyOn(QuizzesController.prototype, 'getQuestionsByAssignment');

const initialState = useQuizStore.getState();

describe('quiz dispatch actions', () => {
	describe('getQuestionsByAssignment action', () => {
		beforeEach(() => {
			// @ts-ignore
			QuizzesController.prototype.getQuestionsByAssignment.mockClear();
			useQuizStore.setState(initialState, true);
		});

		it('should pass and set questions to the state', async () => {
			// @ts-ignore
			QuizzesController.prototype.getQuestionsByAssignment.mockImplementation(
				/** @param {import('types').Assignment} assignment */
				(assignment) =>
					Promise.resolve([sampleQuestion].map((q) => ({ ...q, assignment })))
			);

			await getQuestionsByAssignment({ id: 'Quimica', name: 'Quimica' });

			const currentState = useQuizStore.getState();

			expect(currentState.assignment).toEqual({
				id: 'Quimica',
				name: 'Quimica',
			});
			expect(currentState.start).toBeNull();
			expect(currentState.pages).toBe(1);
			expect(currentState.currentPage).toBe(0);
			expect(currentState.qualification).toBe(0);
			expect(currentState.questions.length).toBe(1);
			expect(currentState.questions[0].id).toBe('sample-question-id');
			expect(currentState.questions[0].assignment).toBe('Quimica');
			expect(currentState.loading).toBeFalsy();
			expect(
				QuizzesController.prototype.getQuestionsByAssignment
			).toHaveBeenCalled();
		});

		it('should catch and set to default state', async () => {
			// @ts-ignore
			QuizzesController.prototype.getQuestionsByAssignment.mockImplementation(
				/** @param {string} assignment */
				() => Promise.reject({})
			);

			try {
				await getQuestionsByAssignment({ id: 'Fisica', name: 'Fisica' });
			} catch (error) {}

			const currentState = useQuizStore.getState();

			expect(currentState.assignment).toBeNull();
			expect(currentState.start).toBeNull();
			expect(currentState.pages).toBe(0);
			expect(currentState.currentPage).toBe(0);
			expect(currentState.qualification).toBe(0);
			expect(currentState.questions.length).toBe(0);
			expect(currentState.loading).toBeFalsy();
			expect(
				QuizzesController.prototype.getQuestionsByAssignment
			).toHaveBeenCalled();
		});
	});

	describe('reelectAssignmentQuiz action', () => {
		beforeEach(() => {
			useQuizStore.setState(initialState, true);
		});

		it('should clean the quiz store', () => {
			useQuizStore.setState({
				questions: [
					{
						id: 'sample-id',
						question: 'Sample question',
						answerIndex: 1,
						assignment: { id: 'random-id', name: 'MATEMATICA' },
						options: [],
					},
				],
				loading: false,
				pages: 1,
				currentPage: 0,
				done: false,
			});

			reelectAssignmentQuiz();

			expect(useQuizStore.getState()).toEqual({
				loading: false,
				questions: [],
				pages: 0,
				currentPage: 0,
				assignment: null,
				qualification: 0,
				start: null,
				done: false,
			});
		});
	});

	describe('initiateQuiz action', () => {
		beforeEach(() => {
			useQuizStore.setState(initialState, true);
		});

		it('should add date for start the quiz', () => {
			expect(useQuizStore.getState().start).toBeNull();

			initiateQuiz();

			expect(useQuizStore.getState().start).not.toBeNull();
			expect(useQuizStore.getState().done).toBeFalsy();
		});
	});

	describe('qualifyAnswerAndNext action', () => {
		beforeEach(() => {
			useQuizStore.setState(initialState, true);
		});

		it('must qualify (100 of 100)', () => {
			const correctAnswer = { optionIndex: 5, answerIndex: 6 };

			const questions = new Array(100).fill(correctAnswer);

			useQuizStore.setState({ pages: questions.length, currentPage: 0 });

			questions.forEach(({ optionIndex, answerIndex }) => {
				qualifyAnswerAndNext(optionIndex, answerIndex);
			});

			const state = useQuizStore.getState();

			expect(state.done).toBeTruthy();
			expect(state.qualification).toBe(100);
		});

		it('must qualify (40 of 100)', () => {
			const correctAnswer = { optionIndex: 5, answerIndex: 6 };
			const wrongAnswer = { optionIndex: 5, answerIndex: 4 };

			const questions = new Array(100)
				.fill(correctAnswer, 0, 40)
				.fill(wrongAnswer, 40);

			useQuizStore.setState({ pages: questions.length, currentPage: 0 });

			questions.forEach(({ optionIndex, answerIndex }) => {
				qualifyAnswerAndNext(optionIndex, answerIndex);
			});

			const state = useQuizStore.getState();

			expect(state.done).toBeTruthy();
			expect(state.qualification).toBe(40);
		});

		it('must qualify (60 of 100)', () => {
			const correctAnswer = { optionIndex: 5, answerIndex: 6 };
			const wrongAnswer = { optionIndex: 5, answerIndex: 4 };

			const questions = new Array(100)
				.fill(correctAnswer, 0, 60)
				.fill(wrongAnswer, 60);

			useQuizStore.setState({ pages: questions.length, currentPage: 0 });

			questions.forEach(({ optionIndex, answerIndex }) => {
				qualifyAnswerAndNext(optionIndex, answerIndex);
			});

			const state = useQuizStore.getState();

			expect(state.done).toBeTruthy();
			expect(state.qualification).toBe(60);
		});
	});
});
