// @ts-check
/** @typedef {import("types").AssignmentStore} AssignmentStore */
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {AssignmentStore} */
const initialState = {
	assignments: [],
	loading: false,
};

export const useAsignmentStore = createStore(
	devtools(() => initialState, { name: 'app-assignment-store' })
);

process.env.NODE_ENV === 'development' &&
	useAsignmentStore.subscribe((assignments) => console.log({ assignments }));
