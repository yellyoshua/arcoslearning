// @ts-check
import { UsersController } from 'api/user/controllers';
import { useUserStore } from 'flux/stores';

const usersController = new UsersController();

/** @param {string} username */
export const createUserSession = async (username) => {
  useUserStore.setState({ loading: true });
  const { id } = await usersController.createSession(username);
  useUserStore.setState({ username, id, loading: false });
};

export const verifyUserSession = async () => {
  const localSession = useUserStore.getState().id;
  useUserStore.setState({ loading: true });

  if (localSession) {
    const session = await usersController.getSession(localSession);

    if (session) {
      return useUserStore.setState({ id: session.id, username: session.name, loading: false });
    }
  }

  return useUserStore.setState({ id: null, username: null, loading: false }, true);
};
