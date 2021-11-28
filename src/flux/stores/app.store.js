// @ts-check
/** @typedef {import("types").AppStore} AppStore */
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {AppStore} */
const initialState = {
	avatars: [],
	loading: false,
};

export const useAppStore = createStore(
	devtools(
		() => ({
			...initialState,
		}),
		{ name: 'app-store' }
	)
);

process.env.NODE_ENV === 'development' &&
	useAppStore.subscribe((app) => console.log({ app }));
