import { gql } from 'graphql-request';

export const CREATE_SESSION = gql`
  mutation CreateSession($name: String!) {
    createSession(data: { name: $name }) {
      id
      name
      avatar {
        id
        slug
        url
      }
    }
  }
`;

export const PUBLISH_SESSION = gql`
  mutation PublishSession($id: ID!) {
    publishSession(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;

export const CONNECT_AVATAR_ASSET = gql`
  mutation ConnectAvatarAsset($id: ID!, $sessionID: ID!) {
    session: updateSession(data: { avatar: { connect: { id: $id } } }, where: { id: $sessionID }) {
      id
      name
      avatar {
        id
        slug
        url
      }
    }
  }
`;
