// @ts-check

import { QuizzesController } from 'api/quiz/controllers';
import { useAsignmentStore } from 'flux/stores';

const quizzesController = new QuizzesController();

export const getAssignments = async () => {
	try {
		useAsignmentStore.setState({ loading: true });
		const assignments = await quizzesController.getQuizzesAssignments();
		useAsignmentStore.setState({ assignments, loading: false });
	} catch (error) {
		useAsignmentStore.setState({ assignments: [], loading: false });
	}
};
