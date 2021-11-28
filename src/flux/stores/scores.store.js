// @ts-check
/** @typedef {import("types").ScoresStore} ScoresStore */
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {ScoresStore} */
const initialState = {
	scores: [],
	loading: false,
};

export const useScoresStore = createStore(
	devtools(() => ({
		...initialState,
	}))
);

process.env.NODE_ENV === 'development' &&
	useScoresStore.subscribe((scores) => console.log({ scores }));
