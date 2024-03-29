// @ts-check
/** @typedef {import("types").UserStore} UserStore */
import createStore from 'zustand';
import { persist, devtools } from 'zustand/middleware';

/** @type {UserStore} */
const initialState = {
	user: null,
	loading: true,
};

export const useUserStore = createStore(
	devtools(
		persist(
			() => ({
				...initialState,
			}),
			{
				name: 'app-user-store',
				getStorage: () => localStorage,
				version: 0,
			}
		),
		{ name: 'app-user-store' }
	)
);

process.env.NODE_ENV === 'development' &&
	useUserStore.subscribe((user) => console.log({ user }));
