// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useScoresStore } from 'flux/stores';
import { getQuizzesScores } from 'flux/actions';
import Result from 'pages/Result';
import { act } from '@testing-library/react-hooks';

const initialState = useScoresStore.getState();

jest.mock('flux/actions', () => ({
	getQuizzesScores: jest.fn(),
}));

describe('Result page', () => {
	beforeEach(() => {
		// @ts-ignore
		getQuizzesScores.mockClear();
		useScoresStore.setState(initialState, true);
	});

	it('should render the title of the Result page', () => {
		render(<Result />);

		expect(screen.getByText('LISTA GANADORES')).toBeInTheDocument();
		// @ts-ignore
		expect(getQuizzesScores.mock.calls.length).toBe(1);
	});

	it('should show loading and hide loading', () => {
		render(<Result />);

		expect(() => screen.getByText('Loading...')).toThrow();

		act(() => {
			useScoresStore.setState({ loading: true });
		});

		expect(screen.getByText('Loading...')).toBeInTheDocument();

		act(() => {
			useScoresStore.setState({ loading: false });
		});

		expect(() => screen.getByText('Loading...')).toThrow();

		// @ts-ignore
		expect(getQuizzesScores.mock.calls.length).toBe(1);
	});

	it('should render the score of 1 user', () => {
		render(<Result />);

		expect(useScoresStore.getState().scores.length).toBe(0);

		act(() => {
			useScoresStore.setState({
				scores: [
					{
						qualification: 100,
						assignment: {
							id: 'random-id',
							name: 'Matematica',
						},
						updatedAt: 'Nov 30, 2021 11:50 PM',
						user: {
							name: 'Sample user',
							avatar: null,
							id: 'sample-id',
						},
					},
				],
			});
		});

		expect(screen.getByText('Sample user')).toBeInTheDocument();
		expect(screen.getByText('Matematica')).toBeInTheDocument();
		expect(screen.getByText('100/100 A')).toBeInTheDocument();
		expect(useScoresStore.getState().scores.length).toBe(1);
		// @ts-ignore
		expect(getQuizzesScores.mock.calls.length).toBe(1);
	});
});
