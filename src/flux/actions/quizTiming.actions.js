// @ts-check
import { useQuizTimingStore } from 'flux/stores';

export const incrementalTimingInSeconds = () => {
	useQuizTimingStore.setState((prev) => ({
		timingSeconds: prev.timingSeconds + 1,
	}));
};
