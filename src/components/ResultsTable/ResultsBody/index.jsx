// @ts-check
import React from 'react';
import { personalizeScoreQualification } from 'utils/utils';

/** @param {{score: import("types").Score}} props */
const ResultContent = ({ score }) => {
	const { color, qualification, value } = personalizeScoreQualification(
		score.qualification
	);

	return (
		<tr>
			<th scope='row'>
				<img
					src={score.user.avatar?.url}
					className='d-inline-block avatar-result align-top mx-3'
					alt={'avatar-' + score.user.name}
				/>
			</th>
			<td className='d-flex justify-content-left align-items-center'>
				{score.user.name}
			</td>
			<td>{score.assignment.name}</td>
			<td className='text-right' style={{ color }}>
				{qualification}/100 {value}
			</td>
		</tr>
	);
};

/** @param {{scores: import("types").Score[]}} props */
export const ResultsBody = ({ scores }) => {
	return (
		<tbody>
			{scores.map((score, key) => (
				<ResultContent
					key={`result-${key}-${score.assignment.id}`}
					score={score}
				/>
			))}
		</tbody>
	);
};
