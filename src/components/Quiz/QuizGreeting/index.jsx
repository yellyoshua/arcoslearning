// @ts-check
import React from 'react';
import { useUserStore } from 'flux/stores';

export const QuizGreeting = () => {
	const user = useUserStore.getState().user;

	return (
		<div className='container-fluid'>
			<p className='init-greeting'>
				Bueno {user?.name}, vamos a comenzar con esto.
			</p>
		</div>
	);
};
