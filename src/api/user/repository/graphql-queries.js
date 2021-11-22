import { gql } from 'graphql-request';

export const GET_SESSION_BY_ID = gql`
  query GetSessionById($id: ID!) {
    session(where: { id: $id }) {
      id
      name
    }
  }
`;
