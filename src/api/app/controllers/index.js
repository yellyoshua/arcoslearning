// @ts-check
/** @typedef {import("types").Asset} Asset */
import { AppRepository } from '../repository';

export class AppController {
  constructor() {
    this.appRepository = new AppRepository();
  }

  /**
   * @returns {Promise<Asset[]>} session
   */
  async getAvatarsAssets() {
    const response = await this.appRepository.getAvatarsAssets();
    return response.data;
  }
}
