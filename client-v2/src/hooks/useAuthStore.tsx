import { create } from "zustand";
import {persist} from 'zustand/middleware';

type AuthStore = {
	user: any;
	loading: boolean;
	player: any;
	reset: () => void;
};

const initialState = {
	user: null,
	player: null,
	loading: true,
}

const useAuthStore = create<AuthStore>()(
	persist(
		(set, get) => ({
			...initialState,
			reset: () => set(initialState),
		}),
		{name: 'arcoslearning-auth', version: 1}
	)
);

export default useAuthStore;
