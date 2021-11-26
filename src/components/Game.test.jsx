import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import { MathQuestions } from 'utils/sample-questions';
import GameComponent from 'components/Game';
import AppContextProvider from '../store';

jest.setTimeout(7000);

describe('Game component', () => {
	it('Should be returned 3 ok and 0 wrong', async () => {
		const { question } = MathQuestions[0];
		render(
			<Router>
				<AppContextProvider>
					<GameComponent questions={MathQuestions} timer={1} />
				</AppContextProvider>
			</Router>
		);

		const questionOne = await screen.findByText(question);
		expect(questionOne.outerHTML).toMatch(`<p>${question}</p>`);

		for (let index = 0; index < MathQuestions.length; index++) {
			const { answer, question } = MathQuestions[index];
			const fullQuestion = await screen.findByText(question);
			expect(fullQuestion.outerHTML).toMatch(`<p>${question}</p>`);
			fireEvent.click(screen.getByTitle(`answer-${answer[0]}`));
		}

		const score = await screen.findByText(/100/i);
		const finished = await screen.findByText(/SCORE/i);

		expect(score.outerHTML).toMatch(`<h3 class=\"text-center my-3\">100</h3>`);
		expect(finished.outerHTML).toMatch(
			'<h2 class="text-center mb-3">SCORE</h2>'
		);
	});
});
