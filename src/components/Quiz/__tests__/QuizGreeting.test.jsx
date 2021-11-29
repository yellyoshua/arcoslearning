// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { screen, render } from '@testing-library/react';
import { useUserStore } from 'flux/stores';
import { QuizGreeting } from '../QuizGreeting';

const initialState = useUserStore.getState();

describe('QuizGreeting tests', () => {
	beforeEach(() => {
		useUserStore.setState(initialState, true);
	});

	it('should show a greeting with user name', () => {
		useUserStore.setState({
			user: { id: 'yyyy', name: 'Yoshua', avatar: null },
		});

		render(<QuizGreeting />);

		const greeting = screen.getByText(/Yoshua/).closest('p');

		expect(greeting).toBeInTheDocument();
		expect(greeting).toHaveTextContent(
			'Bueno Yoshua, vamos a comenzar con esto.'
		);
	});
});
