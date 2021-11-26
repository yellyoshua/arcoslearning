// @ts-check
import { UsersController } from 'api/user/controllers';
import { useUserStore } from 'flux/stores';

const usersController = new UsersController();

/** @param {string} name */
export const createUserSession = async (name) => {
	useUserStore.setState({ loading: true });
	const { id } = await usersController.createSession(name);
	useUserStore.setState({
		user: { name: name, id, avatar: null },
		loading: false,
	});
};

export const removeSession = () => {
	useUserStore.setState({ user: null, loading: false }, true);
};

export const verifyUserSession = async () => {
	try {
		const localSession = useUserStore.getState().user?.id;
		useUserStore.setState({ loading: true });

		if (localSession) {
			const session = await usersController.getSession(localSession);

			console.log({ session });

			if (session) {
				return useUserStore.setState({
					user: session,
					loading: false,
				});
			}
		}
	} catch (error) {}

	return useUserStore.setState({ user: null, loading: false }, true);
};

/** @param {string} assetID */
export const connectAvatarAssetToUserSession = async (assetID) => {
	try {
		useUserStore.setState({ loading: true });
		const sessionID = `${useUserStore.getState().user?.id}`;
		const session = await usersController.connectAvatarAsset(
			sessionID,
			assetID
		);
		return useUserStore.setState({
			user: {
				id: session.id,
				name: session.name,
				avatar: session.avatar,
			},
			loading: false,
		});
	} catch (error) {
		return useUserStore.setState({ loading: false });
	}
};
