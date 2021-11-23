// @ts-check
/** @typedef {import("types").GameStore} GameStore */
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

/** @type {GameStore} */
const initialState = {
  pages: 0,
  quiz: null,
  currentPage: 0,
  start: null
};

export const useGameStore = createStore(
  devtools(
    () => ({
      ...initialState
    }),
    { name: 'app-game-store' }
  )
);
