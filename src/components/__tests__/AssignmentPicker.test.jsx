// @ts-check
import '@testing-library/jest-dom';
import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { useAsignmentStore } from 'flux/stores';
import { getAssignments } from 'flux/actions';
import { AssignmentPicker } from 'components/AssignmentPicker';

const initialState = useAsignmentStore.getState();

jest.mock('flux/actions', () => ({
	getAssignments: jest.fn(),
}));

describe('Assignment Picker', () => {
	beforeEach(() => {
		// @ts-ignore
		getAssignments.mockClear();
		useAsignmentStore.setState(initialState, true);
	});

	it('should make it the first call to api', () => {
		render(<AssignmentPicker />);

		// @ts-ignore
		expect(getAssignments.mock.calls.length).toBe(1);
	});

	it('should render the title of the component', () => {
		render(<AssignmentPicker />);

		expect(
			screen.getByText('Selecciona con que quieres comenzar')
		).toBeInTheDocument();
	});

	it('should show loading and hide loading', () => {
		render(<AssignmentPicker />);

		expect(() => screen.getByText('Loading...')).toThrow();

		act(() => {
			useAsignmentStore.setState({ loading: true });
		});

		expect(screen.getByText('Loading...')).toBeInTheDocument();

		act(() => {
			useAsignmentStore.setState({ loading: false });
		});

		expect(() => screen.getByText('Loading...')).toThrow();
	});

	it('should render 4 assignments', () => {
		render(<AssignmentPicker />);

		act(() => {
			useAsignmentStore.setState({
				assignments: [
					{ name: 'Matematica' },
					{ name: 'Fisica' },
					{ name: 'Quimica' },
					{ name: 'Lenguaje' },
				],
			});
		});

		expect(screen.getByText('Matematica')).toBeInTheDocument();
		expect(screen.getByText('Fisica')).toBeInTheDocument();
		expect(screen.getByText('Quimica')).toBeInTheDocument();
		expect(screen.getByText('Lenguaje')).toBeInTheDocument();
	});
});
