// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { qualifyAnswerAndNext } from 'flux/actions';
import { QuizQuestion } from '../QuizQuestion';

jest.mock('flux/actions', () => ({
	qualifyAnswerAndNext: jest.fn(),
}));

describe('QuizQuestion tests', () => {
	beforeEach(() => {
		// @ts-ignore
		qualifyAnswerAndNext.mockClear();
	});

	it('should render the question content', () => {
		/** @type {import('types').Question} */
		const question = {
			id: 'random-id',
			assignment: 'Wathever',
			question: 'what is number five?',
			options: ['5', '4', '3'],
			answerIndex: 1,
		};

		render(<QuizQuestion question={question} answerIndex={1} />);

		expect(screen.getByText(/what is number five/)).toBeInTheDocument();
		expect(screen.getByText(/5/)).toBeInTheDocument();
		expect(screen.getByText(/4/)).toBeInTheDocument();
		expect(screen.getByText(/3/)).toBeInTheDocument();
	});

	it('should able click a question option', () => {
		/** @type {import('types').Question} */
		const question = {
			id: 'random-id',
			assignment: 'Wathever',
			question: 'what is number five?',
			options: ['5', '4', '3'],
			answerIndex: 1,
		};

		render(<QuizQuestion question={question} answerIndex={1} />);

		fireEvent.click(screen.getByText(/3/));

		// @ts-ignore
		expect(qualifyAnswerAndNext.mock.calls.length).toBe(1);
		// @ts-ignore
		// position in the array of the number 3 clicked
		expect(qualifyAnswerAndNext.mock.calls[0][0]).toBe(2);
		// @ts-ignore
		// the position of the answer inside options array
		expect(qualifyAnswerAndNext.mock.calls[0][1]).toBe(1);
	});
});
