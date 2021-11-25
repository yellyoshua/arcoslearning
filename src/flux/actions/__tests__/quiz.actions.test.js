// @ts-check
import { render, act } from '@testing-library/react';
import { useQuizStore } from 'flux/stores';

const initialState = useQuizStore.getState();

describe('quiz dispatch actions', () => {
	beforeEach(() => {
		useQuizStore.setState(initialState, true);
	});

	it('should be a change state', () => {
		useQuizStore.setState({ pages: 10 });

		expect(useQuizStore.getState().pages).toBe(10);
	});
});
