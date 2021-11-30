// @ts-check
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {import("types").QuizStore} */
const initialState = {
	assignment: null,
	qualification: 0,
	pages: 0,
	questions: [],
	currentPage: 0,
	start: null,
	loading: false,
	done: false,
};

export const useQuizStore = createStore(
	devtools(
		() => ({
			...initialState,
		}),
		{ name: 'app-quiz-store' }
	)
);

process.env.NODE_ENV === 'development' &&
	useQuizStore.subscribe((quiz) => console.log({ quiz }));
