// @ts-check
import { GetGraphqlClient } from '../../config';
import * as queries from './graphql-queries';
import * as mutations from './graphql-mutations';

export class UsersRepository {
  constructor() {
    this.api = GetGraphqlClient();
  }

  /** @param {string} [username] */
  async createSession(username) {
    const { createSession } = await this.api.request(mutations.CREATE_SESSION, { name: username });
    await this.api.request(mutations.PUBLISH_SESSION, { id: createSession.id });
    return { data: createSession };
  }

  /** @param {string} [sessionId] */
  async getSession(sessionId) {
    const { session } = await this.api.request(queries.GET_SESSION_BY_ID, { id: sessionId });
    return { data: session };
  }
}