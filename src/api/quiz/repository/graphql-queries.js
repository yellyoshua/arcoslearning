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

export const GET_QUIZZES_ASSIGNMENTS = gql`
	query {
		quizzes: __type(name: "Quizzes") {
			assignments: enumValues {
				name
			}
		}
	}
`;

export const GET_QUESTIONS_BY_ASSIGNMENT = gql`
	query GetQuestionsByAssignment($assignment: Quizzes!) {
		questions: quizzes(where: { assignment: $assignment }) {
			id
			assignment
			question
			options
			answerIndex
		}
	}
`;
