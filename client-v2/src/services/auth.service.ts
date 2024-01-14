import crud from "../crud";

const authService = crud().auth;
export default {
	magicLink: async (email: string) => {
		const { error, data } = await authService.signInWithOtp({
			email: email,
			options: {
				shouldCreateUser: true,
				emailRedirectTo: `${window.location.origin}/register`,
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
	service: authService
};
