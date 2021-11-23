// @ts-check
import { GetGraphqlClient } from '../../config';
import * as queries from './graphql-queries';

export class AppRepository {
  constructor() {
    this.api = GetGraphqlClient();
  }

  async getAvatarsAssets() {
    const { avatars } = await this.api.request(queries.GET_AVATARS_ASSETS);
    return { data: avatars };
  }
}
