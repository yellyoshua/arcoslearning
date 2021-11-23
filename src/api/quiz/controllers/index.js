// @ts-check
/** @typedef {import("types").Score} Score */
import { QuizzesRepository } from '../repository';

export class QuizzesController {
  constructor() {
    this.quizzesRepository = new QuizzesRepository();
  }

  /**
   * @returns {Promise<Score[]>} session
   */
  async getQuizScores() {
    const response = await this.quizzesRepository.getQuizScores();
    return response.data;
  }
}
