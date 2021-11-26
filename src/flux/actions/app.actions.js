// @ts-check
import { AppController } from 'api/app/controllers';
import { useAppStore } from 'flux/stores';

const appController = new AppController();

export const getAvatarsAssets = async () => {
	try {
		useAppStore.setState({ loading: true });
		const avatars = await appController.getAvatarsAssets();
		return useAppStore.setState({ avatars, loading: false });
	} catch (error) {
		return useAppStore.setState({ loading: false });
	}
};
