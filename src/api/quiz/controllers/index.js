// @ts-check
/** @typedef {import("types").Score} Score */
/** @typedef {import("types").Question} Question */
/** @typedef {import("types").Assignment} Assignment */
import { QuizzesRepository } from '../repository';

export class QuizzesController {
	constructor() {
		this.quizzesRepository = new QuizzesRepository();
	}

	/**
	 * @returns {Promise<Score[]>} Session
	 */
	async getQuizScores() {
		const response = await this.quizzesRepository.getQuizScores();
		return response.data;
	}

	/**
	 * @returns {Promise<Assignment[]>} Quizzes (Enumerations)
	 */
	async getQuizzesAssignments() {
		const response = await this.quizzesRepository.getQuizzesAssignments();
		return response.data;
	}

	/**
	 * @param {string} assignment
	 * @returns {Promise<Question[]>} Questions
	 */
	async getQuestionsByAssignment(assignment) {
		const response = await this.quizzesRepository.getQuestionsByAssignment(
			assignment
		);
		return response.data;
	}
}
