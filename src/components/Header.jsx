// @ts-check
import React from 'react';
import { Link } from 'react-router-dom';
import { removeSession } from 'flux/actions';
import { useUserStore } from 'flux/stores';
import { arrowDown } from '../icons';
import Avatar from './Avatar';

export default function Header() {
	const { user } = useUserStore();

	return (
		<nav className='bg-transparent justify-content-around w-100 align-items-center navbar navbar-light bg-light'>
			<a
				style={{ fontSize: 35, textShadow: '1px 1px #279deb' }}
				className={'text-white d-flex align-items-center navbar-brand'}
				href='/'
			>
				<img
					src={arrowDown}
					width='64'
					height='64'
					className='d-inline-block align-top mx-3'
					alt=''
				/>
				Arcos Learning
			</a>
			<Link
				to='/scores'
				style={{ fontSize: 20, textShadow: '1px 1px rgb(84, 20, 20) 1px 1px' }}
				className='text-danger d-flex align-items-center navbar-brand pt-3 px-2'
			>
				World Scores
			</Link>

			{user && user.name ? (
				<button onClick={removeSession} className='btn btn-danger'>
					Cerrar sessi&oacute;n
				</button>
			) : null}

			<Avatar />
		</nav>
	);
}
