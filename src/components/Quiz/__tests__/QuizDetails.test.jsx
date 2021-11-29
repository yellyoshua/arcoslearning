// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { screen, render } from '@testing-library/react';
import { useQuizStore } from 'flux/stores';
import { QuizDetails } from '../QuizDetails';

const initialState = useQuizStore.getState();

describe('QuizDetails tests', () => {
	beforeEach(() => {
		useQuizStore.setState(initialState, true);
	});

	it('should show details of the quiz', () => {
		useQuizStore.setState({ assignment: 'Matematica', pages: 10 });

		render(<QuizDetails />);

		const assignment = screen.getByText(/Matematica/).closest('h3');
		expect(assignment).toBeInTheDocument();
		expect(assignment).toHaveTextContent('Matematica');

		const pages = screen.getByText(/10/).closest('h6');
		expect(pages).toBeInTheDocument();
		expect(pages).toHaveTextContent('10 preguntas');
	});
});
