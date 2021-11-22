// @ts-check
import createStore from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {};

export const useGameStore = createStore(
  devtools(
    () => ({
      ...initialState
    }),
    { name: 'app-user-store' }
  )
);
