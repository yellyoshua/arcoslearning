// @ts-check
import { GetGraphqlClient } from '../../config';
import * as queries from './graphql-queries';
import * as mutations from './graphql-mutations';

export class QuizzesRepository {
	constructor() {
		this.api = GetGraphqlClient();
	}

	async getQuizScores() {
		const { scores } = await this.api.request(queries.GET_QUIZ_SCORES);
		return { data: scores };
	}

	async getQuizzesAssignments() {
		const { assignments } = await this.api.request(
			queries.GET_QUIZZES_ASSIGNMENTS
		);

		return { data: assignments };
	}

	/** @param {string} assignmentID */
	async getQuestionsByAssignment(assignmentID) {
		const { questions } = await this.api.request(
			queries.GET_QUESTIONS_BY_ASSIGNMENT,
			{ assignmentID }
		);
		return { data: questions };
	}

	/**
	 * @param {string} user
	 * @param {string} assignment
	 * @param {number} qualification
	 */
	async createScore(user, assignment, qualification) {
		const { scores } = await this.api.request(queries.SEARCH_PREV_SCORES, {
			user,
			assignment,
		});

		if (scores.length > 0) {
			const score = scores[0].id;

			const { updateScore } = await this.api.request(mutations.UPDATE_SCORE, {
				score,
				qualification,
			});

			await this.api.request(mutations.PUBLISH_SCORE, { score });

			return { data: updateScore };
		}

		const { createScore } = await this.api.request(mutations.CREATE_SCORE, {
			user,
			assignment,
			qualification,
		});

		const score = createScore.id;
		await this.api.request(mutations.PUBLISH_SCORE, { score });

		return { data: createScore };
	}
}
