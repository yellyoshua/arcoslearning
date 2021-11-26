// @ts-check
import { QuizzesController } from 'api/quiz/controllers';
import { useScoresStore } from 'flux/stores';

const quizzesController = new QuizzesController();

export const getQuizzesScores = async () => {
	try {
		useScoresStore.setState({ loading: true });
		const scores = await quizzesController.getQuizScores();
		return useScoresStore.setState({ scores, loading: false });
	} catch (error) {
		return useScoresStore.setState({ loading: false });
	}
};
