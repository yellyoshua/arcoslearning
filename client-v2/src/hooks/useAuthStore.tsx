import { create } from "zustand";
import playersService from "../services/players.service";

type AuthStore = {
	isSignedIn: boolean;
	user: any;
	loading: boolean;
	player: any;
	getPlayer: () => Promise<void>;
};

export default create<AuthStore>((set, get) => ({
	isSignedIn: false,
	user: null,
	player: null,
	loading: true,
	getPlayer: async () => {
		set({ loading: true });

		if (get().user?.id) {
			const [player] = await playersService.get({user: get().user.id})
			set({ player, loading: false });
		}

		set({ loading: false });
	}
}));
