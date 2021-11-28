// @ts-check
import React, { useEffect } from 'react';
import { useAsignmentStore } from 'flux/stores';
import { getAssignments, getQuestionsByAssignment } from 'flux/actions';

export const AssignmentPicker = () => {
	const { assignments, loading } = useAsignmentStore();

	/** @param {string} assignment */
	const selectAssignmentHandler = (assignment) => {
		getQuestionsByAssignment(assignment);
	};

	useEffect(() => {
		getAssignments();
	}, []);

	if (loading) {
		return <p>Loading...</p>;
	}

	return (
		<section className='container'>
			<div className='container-fluid text-center'>
				<p className='init-greeting'>Selecciona con que quieres comenzar</p>
			</div>
			<div className='row justify-content-center'>
				{assignments.map((assignment, key) => (
					<div
						key={`${key}-${assignment.name}`}
						onClick={() => selectAssignmentHandler(assignment.name)}
						className='game-cards-options card m-3'
						style={{ width: '18rem' }}
					>
						<div className='card-body text-center'>
							<h3 className='card-text text-danger'>{assignment.name}</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};
