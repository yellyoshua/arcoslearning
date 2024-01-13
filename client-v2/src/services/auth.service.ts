import { create } from "zustand";
import crud from "../crud";
import useAuthStore from "../hooks/useAuthStore";

const authService = crud().auth;

type onAuthStateChangeCallback = (data: {isSignedIn: boolean, user: any}) => void;

export default {
	magicLink: async (email: string) => {
		const { error, data } = await authService.signInWithOtp({
			email: email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: `${window.location.origin}/`,
			}
		});

		if (error) {
			throw error;
		}

		return data;
	},
	signOut: async () => {
		const { error } = await authService.signOut();

		if (error) {
			throw error;
		}
	},
	onAuthStateChange: (callback: onAuthStateChangeCallback) => {
		const eventState = authService.onAuthStateChange(
			(event, session) => {
				if (['SIGNED_OUT'].includes(event) || !session) {
					useAuthStore.setState({isSignedIn: false, user: null});
					return callback({isSignedIn: false, user: null});
				}

				useAuthStore.setState({isSignedIn: true, user: session?.user});
				return callback({isSignedIn: true, user: session?.user});
			}
		);

		return eventState.data.subscription.unsubscribe;
	}
};
