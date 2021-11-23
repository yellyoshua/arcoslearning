import { gql } from 'graphql-request';

export const GET_AVATARS_ASSETS = gql`
  query {
    avatars: assets(where: { slug_contains: "avatar" }) {
      id
      slug
      url
    }
  }
`;
