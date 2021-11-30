// @ts-check
import React, { useEffect } from 'react';
import { useAsignmentStore } from 'flux/stores';
import { getAssignments, getQuestionsByAssignment } from 'flux/actions';

export const AssignmentPicker = () => {
	const { assignments, loading } = useAsignmentStore();

	/** @param {import('types').Assignment} assignment */
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
					<button
						key={`${key}-${assignment.name}`}
						disabled={assignment.quizzes?.length === 0}
						onClick={() => selectAssignmentHandler(assignment)}
						className='game-cards-options card m-3'
						style={{ width: '18rem' }}
					>
						<div className='card-body text-center m-auto'>
							<h3 className='card-text text-danger'>{assignment.name}</h3>
						</div>
					</button>
				))}
			</div>
		</section>
	);
};
