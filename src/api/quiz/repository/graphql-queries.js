import { gql } from 'graphql-request';

export const GET_QUIZ_SCORES = gql`
	query {
		scores(orderBy: updatedAt_DESC) {
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
		updatedAt
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

export const SEARCH_PREV_SCORES = gql`
	query SearchPrevScore($user: ID!, $assignment: ID!) {
		scores(where: { user: { id: $user }, assignment: { id: $assignment } }) {
			...scoreFields
		}
	}

	fragment scoreFields on Score {
		id
	}
`;
