// @ts-check
import React, { useEffect } from 'react';
import { useScoresStore } from 'flux/stores';
import { ResultsBody } from './ResultsBody';
import { ResultsHead } from './ResultsHead';
import { getQuizzesScores } from 'flux/actions';

export const ResultsTable = () => {
	const { scores, loading } = useScoresStore();

	useEffect(() => {
		getQuizzesScores();
	}, []);

	if (loading) {
		return (
			<div>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<table className='text-center rounded table table-light table-hover table-responsive-sm'>
			<ResultsHead />
			<ResultsBody scores={scores} />
		</table>
	);
};
