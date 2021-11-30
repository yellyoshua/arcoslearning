// @ts-check
import React from 'react';
import { useQuizStore } from 'flux/stores';
import { AssignmentPicker } from 'components/AssignmentPicker';
import { Quiz } from 'components/Quiz';

const Home = () => {
	const assignment = useQuizStore((state) => state.assignment);

	if (assignment) {
		return <Quiz />;
	}

	return <AssignmentPicker />;
};

export default Home;
