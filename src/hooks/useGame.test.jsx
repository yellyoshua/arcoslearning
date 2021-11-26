import useGame from 'hooks/useGame';
import { renderHook, act } from '@testing-library/react-hooks';
import { MathQuestions } from 'utils/sample-questions';

describe('Functionality useGame hook', () => {
	it('Should be returned 2 ok and 1 wrong', async () => {
		const sampleAnswers = ['5', '7', '125'];
		const { result } = renderHook(
			(initialProps) => {
				return useGame({ ...initialProps });
			},
			{ initialProps: { questions: MathQuestions } }
		);

		for (let index = 0; index < sampleAnswers.length; index++) {
			const answer = sampleAnswers[index];

			act(() => {
				result.current[1].goNextQuestion(answer);
			});
		}

		expect(result.current[0].question).toBe(3);
		expect(result.current[0].rank).toEqual({
			qualification: 66,
			value: 'D',
			color: 'black',
		});
	});

	it('Should be returned 3 ok and 0 wrong', async () => {
		const sampleAnswers = ['5', '9', '125', '180'];
		const { result } = renderHook(
			(initialProps) => {
				return useGame({ ...initialProps });
			},
			{ initialProps: { questions: MathQuestions } }
		);

		for (let index = 0; index < sampleAnswers.length; index++) {
			const answer = sampleAnswers[index];

			act(() => {
				result.current[1].goNextQuestion(answer);
			});
		}

		expect(result.current[0].question).toBe(3);
		expect(result.current[0].rank).toEqual({
			qualification: 100,
			value: 'A',
			color: 'green',
		});
	});
});
