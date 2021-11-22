import { gql } from 'graphql-request';

export const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(data: { name: $name }) {
      id
      name
    }
  }
`;

export const PUBLISH_SESSION = gql`
  mutation PublishSession($id: ID!) {
    publishSession(where: { id: $id }) {
      id
    }
  }
`;
