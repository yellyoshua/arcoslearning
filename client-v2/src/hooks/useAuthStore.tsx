import { useEffect } from "react";
import { create } from "zustand";
import {persist} from 'zustand/middleware';
import authService from "../services/auth.service";
import { useShallow } from "zustand/react/shallow";

type AuthStore = {
	user: any;
	session: any;
	lastRefresh: number | null;
	loading: boolean;
	player: any;
	reset: () => void;
};

const TEN_MINUTES = 1000 * 60 * 5;

const initialState = {
	user: null,
	session: null,
	lastRefresh: null,
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

export const useAuthCheckSession = () => {
	const user = useAuthStore(useShallow(state => state.user));
	const lastRefresh = useAuthStore(useShallow(state => state.lastRefresh));

	const checkSession = async () => {
		const sessionResponse = await authService.service.getSession();
		if (sessionResponse.error) {
			return await authService.signOut();
		}

		const shouldRefresh = lastRefresh && (Date.now() - lastRefresh) < TEN_MINUTES;

		const sessionData = shouldRefresh
			? await authService.service.refreshSession()
			: sessionResponse;

		if (sessionData.error) {
			return await authService.signOut();
		}

		useAuthStore.setState({
			session: sessionData.data.session,
			user: sessionData.data.session?.user,
			lastRefresh: Date.now()
		});
	}

	return {
		checkSession: checkSession,
		checkSessionInterval: (interval?: number) => {
			const sessionInterval = setInterval(async () => {
				if (user) await checkSession();
			}, interval || TEN_MINUTES);

			return {clear: () => clearInterval(sessionInterval)}
		}
	}
}

export default useAuthStore;
