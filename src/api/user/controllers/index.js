// @ts-check
/** @typedef {import("types").UserSession} UserSession  */
import { UsersRepository } from '../repository';

export class UsersController {
	constructor() {
		this.usersRepository = new UsersRepository();
	}

	/**
	 * @param {string} userName name for the user session
	 * @returns {Promise<UserSession>} session
	 */
	async createSession(userName) {
		const existSession = await this.usersRepository.getSessionByUsername(
			userName
		);

		if (existSession.data) {
			const { id, name, avatar } = existSession.data;
			return { id, name, avatar };
		}

		const response = await this.usersRepository.createSession(userName);
		const { id, name, avatar } = response.data;
		return { id, name, avatar };
	}

	/**
	 * @param {string} sessionId ID of the session
	 * @returns {Promise<UserSession | null>} session
	 */
	async getSession(sessionId) {
		const response = await this.usersRepository.getSession(sessionId);

		if (response.data === null) {
			return null;
		}

		return response.data;
	}

	/**
	 * @param {string} sessionID
	 * @param {string} assetID ID of the session
	 * @returns {Promise<UserSession>} session
	 */
	async connectAvatarAsset(sessionID, assetID) {
		const response = await this.usersRepository.connectAvatarAsset(
			sessionID,
			assetID
		);
		return response.data;
	}
}
