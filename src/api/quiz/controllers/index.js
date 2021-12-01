// @ts-check
/** @typedef {import("types").Score} Score */
/** @typedef {import("types").Quiz} Quiz */
/** @typedef {import("types").Assignment} Assignment */
import dayjs from 'dayjs';
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

		/** @type {Score[]} */
		const scores = response.data;

		return scores.map((score) => {
			const updatedAt = dayjs(score.updatedAt).format('MMM D, YYYY h:mm A');
			return { ...score, updatedAt };
		});
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
	 * @returns {Promise<Quiz[]>} Questions
	 */
	async getQuestionsByAssignment(assignment) {
		const response = await this.quizzesRepository.getQuestionsByAssignment(
			assignment
		);
		return response.data;
	}

	/**
	 * @param {string} user
	 * @param {string} assignment
	 * @param {number} qualification
	 * @returns {Promise<{ user: string; assignment: string; score: string; qualification: number }>}
	 */
	async createScore(user, assignment, qualification) {
		const response = await this.quizzesRepository.createScore(
			user,
			assignment,
			qualification
		);

		const score = response.data.id;

		return { user, score, assignment, qualification };
	}
}
