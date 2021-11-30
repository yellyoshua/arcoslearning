import { gql } from 'graphql-request';

export const GET_QUIZ_SCORES = gql`
	query {
		scores {
			...scoreFields
		}
	}

	fragment scoreFields on Score {
		qualification
		assignment {
			name
		}
		user {
			...userFields
		}
	}

	fragment userFields on Session {
		id
		name
		avatar {
			slug
			url
		}
	}
`;

export const GET_QUIZZES_ASSIGNMENTS = gql`
	query {
		assignments(where: { public: true }) {
			...assignmentFields
		}
	}

	fragment assignmentFields on Assignment {
		id
		name
		quizzes {
			... on Quiz {
				id
			}
		}
	}
`;

export const GET_QUESTIONS_BY_ASSIGNMENT = gql`
	query GetQuestionsByAssignment($assignmentID: ID!) {
		questions: quizzes(where: { assignment: { id: $assignmentID } }) {
			...quizFields
		}
	}

	fragment quizFields on Quiz {
		id
		assignment {
			name
		}
		question
		options
		answerIndex
	}
`;
