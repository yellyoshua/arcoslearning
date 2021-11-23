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
}
