// @ts-check
import React from 'react';
import { useUserStore } from 'flux/stores';
import { Navigate } from 'react-router-dom';

/** @param {{children: import('react').ReactNode}} props */
export const Authentication = ({ children }) => {
	const { loading, user } = useUserStore();

	if (!user || !user.avatar || !user.name) {
		return <Navigate to='/register' />;
	}

	if (loading) {
		return (
			<div>
				<p>Loading...</p>
				<section className='footer container'>
					<blockquote className='blockquote text-center'>
						<footer className='blockquote-footer'>
							Por <cite title='Briggitte Arcos'>Briggitte Arcos</cite>
						</footer>
					</blockquote>
				</section>
			</div>
		);
	}

	return (
		<div>
			<div>{children}</div>
			<section className='footer container'>
				<blockquote className='blockquote text-center'>
					<footer className='blockquote-footer'>
						Por <cite title='Briggitte Arcos'>Briggitte Arcos</cite>
					</footer>
				</blockquote>
			</section>
		</div>
	);
};
