// @ts-check
import { GetGraphqlClient } from '../../config';
import * as queries from './graphql-queries';

export class QuizzesRepository {
	constructor() {
		this.api = GetGraphqlClient();
	}

	async getQuizScores() {
		const { quizScores } = await this.api.request(queries.GET_QUIZ_SCORES);
		return { data: quizScores };
	}

	async getQuizzesAssignments() {
		const {
			quizzes: { assignments = [] }
		} = await this.api.request(queries.GET_QUIZZES_ASSIGNMENTS);

		return { data: assignments };
	}

	/** @param {string} assignment */
	async getQuestionsByAssignment(assignment) {
		const { questions } = await this.api.request(queries.GET_QUESTIONS_BY_ASSIGNMENT, { assignment });
		return { data: questions };
	}
}
