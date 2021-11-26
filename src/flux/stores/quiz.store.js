// @ts-check
/** @typedef {import("types").QuizStore} QuizStore */
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {QuizStore} */
const initialState = {
	assignment: null,
	qualification: 0,
	pages: 0,
	questions: [],
	currentPage: 0,
	start: null,
	loading: false,
};

export const useQuizStore = createStore(
	devtools(
		() => ({
			...initialState,
		}),
		{ name: 'app-quiz-store' }
	)
);
