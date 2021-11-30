// @ts-check
import { GetGraphqlClient } from '../../config';
import * as queries from './graphql-queries';

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
}
