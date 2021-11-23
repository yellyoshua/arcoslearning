import { gql } from 'graphql-request';

export const GET_QUIZ_SCORES = gql`
  query {
    quizScores {
      score
      qualification
      quiz
      user: userSession {
        id
        avatar {
          slug
          url
        }
        name
      }
    }
  }
`;
