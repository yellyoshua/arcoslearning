// @ts-check
import { UsersRepository } from '../repository';

export class UsersController {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  /**
   * @param {string} username name for the user session
   * @returns {Promise<{ id: string, name: string}>} session
   */
  async createSession(username) {
    const response = await this.usersRepository.createSession(username);
    const { id, name } = response.data;
    return { id, name };
  }

  /**
   * @param {string} sessionId ID of the session
   * @returns {Promise<{ id: string, name: string} | null>} session
   */
  async getSession(sessionId) {
    const response = await this.usersRepository.getSession(sessionId);

    if (response.data === null) {
      return null;
    }

    const { id, name } = response.data;
    return { id, name };
  }
}
