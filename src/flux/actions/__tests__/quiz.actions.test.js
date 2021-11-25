// @ts-check
import { useQuizStore } from 'flux/stores';
import { QuizzesController } from 'api/quiz/controllers';
import { getQuestionsByAssignment } from '../quiz.actions';

const sampleQuestion = {
	id: 'sample-question-id',
	assignment: 'Matematica',
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
				/** @param {string} assignment */
				(assignment) =>
					Promise.resolve([sampleQuestion].map((q) => ({ ...q, assignment })))
			);

			await getQuestionsByAssignment('Quimica');

			const currentState = useQuizStore.getState();

			expect(currentState.assignment).toBe('Quimica');
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
				await getQuestionsByAssignment('Fisica');
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
});
