// @ts-check
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
	timingSeconds: 0,
};

export const useQuizTimingStore = createStore(
	devtools(() => initialState, { name: 'app-quiz-timing-store' })
);
