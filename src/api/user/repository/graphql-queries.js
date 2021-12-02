import { gql } from 'graphql-request';

export const GET_SESSION_BY_USERNAME = gql`
	query GetSessionByUsername($username: String!) {
		session(where: { name: $username }) {
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

export const GET_SESSION_BY_ID = gql`
	query GetSessionById($id: ID!) {
		session(where: { id: $id }) {
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
