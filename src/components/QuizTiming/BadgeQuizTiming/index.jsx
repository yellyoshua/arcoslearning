// @ts-check
import React, { useEffect } from 'react';
import { incrementalTimingInSeconds } from 'flux/actions';
import { useQuizTimingStore } from 'flux/stores';

export const BadgeQuizTiming = () => {
	const timing = useQuizTimingStore((state) => state.timingSeconds);

	useEffect(() => {
		const interval = setInterval(() => {
			incrementalTimingInSeconds();
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return <p className='badge bg-secondary'>{timing}s</p>;
};
