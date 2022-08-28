// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createUserSession } from 'flux/actions';
import Register from 'pages/Register';
import { useUserStore } from 'flux/stores';

const initialState = useUserStore.getState();

jest.mock('flux/actions', () => ({
	createUserSession: jest.fn(),
}));

describe('Register page', () => {
	beforeEach(() => {
		// @ts-ignore
		createUserSession.mockClear();
		useUserStore.setState({ ...initialState, loading: false }, true);
	});

	it('should input enable button', () => {
		render(<Register />);

		expect(screen.getByText('Comenzar').closest('button')).toBeDisabled();

		fireEvent.change(screen.getByPlaceholderText('Tu nombre'), {
			target: { value: 'yellyoshua' },
		});

		expect(screen.getByText('Comenzar').closest('button')).toBeEnabled();

		fireEvent.click(screen.getByText('Comenzar'));

		// @ts-ignore
		expect(createUserSession.mock.calls.length).toBe(1);
		// @ts-ignore
		expect(createUserSession.mock.calls[0][0]).toBe('yellyoshua');
	});

	it('should input disable button', () => {
		render(<Register />);

		expect(screen.getByText('Comenzar').closest('button')).toBeDisabled();

		fireEvent.change(screen.getByPlaceholderText('Tu nombre'), {
			target: { value: 'wrong-username' },
		});

		expect(screen.getByText('Comenzar').closest('button')).toBeDisabled();

		fireEvent.click(screen.getByText('Comenzar'));

		// @ts-ignore
		expect(createUserSession.mock.calls.length).toBe(0);
	});
});
