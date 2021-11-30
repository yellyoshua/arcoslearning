import { gql } from 'graphql-request';

export const CREATE_SCORE = gql`
	mutation createScore($user: ID!, $assignment: ID!, $qualification: Int!) {
		createScore(
			data: {
				user: { connect: { id: $user } }
				assignment: { connect: { id: $assignment } }
				qualification: $qualification
			}
		) {
			...scoreFields
		}
	}

	fragment scoreFields on Score {
		id
		qualification
		assignment {
			name
		}
	}
`;

export const PUBLISH_SCORE = gql`
	mutation PublishScore($score: ID!) {
		publishScore(where: { id: $score }, to: PUBLISHED) {
			id
		}
	}
`;
