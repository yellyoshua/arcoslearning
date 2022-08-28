import { GraphQLClient } from 'graphql-request';

export const GetGraphqlClient = () => {
	return new GraphQLClient(String(process.env.REACT_APP_API_URI), {
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
		},
	});
};
