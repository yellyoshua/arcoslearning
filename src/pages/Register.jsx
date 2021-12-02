// @ts-check
import React, { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from 'flux/stores';
import { AvatarPicker } from 'components/AvatarPicker';
import { RegisterForm } from 'components/RegisterForm';

const Register = () => {
	const { user, loading } = useUserStore();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (user && user.name && user.avatar) {
		return <Navigate to='/' />;
	}

	if (user?.name && !user.avatar) {
		return <AvatarPicker />;
	}

	return (
		<Fragment>
			<RegisterForm />
			<section className='footer container'>
				<blockquote className='blockquote text-center'>
					<footer className='blockquote-footer'>
						Por <cite title='Briggitte Arcos'>Briggitte Arcos</cite>
					</footer>
				</blockquote>
			</section>
		</Fragment>
	);
};

export default Register;
