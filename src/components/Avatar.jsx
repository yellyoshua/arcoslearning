// @ts-check
import React from 'react';
import { useUserStore } from 'flux/stores';

export default function Avatar() {
	const { user } = useUserStore();
	const styleUsername = { fontSize: 25, textShadow: '1px 1px #279deb' };

	const handlerRemoveAvatar = () => {
		// Remove avatar
	};

	if (!user) {
		return null;
	}

	return (
		<nav className='bg-transparent justify-content-center align-items-center navbar navbar-light bg-light'>
			<p
				style={styleUsername}
				className={
					user.name
						? 'text-white d-flex align-items-center navbar-brand'
						: 'm-auto text-white d-flex align-items-center navbar-brand'
				}
			>
				{user.avatar && (
					<img
						onClick={handlerRemoveAvatar}
						src={user.avatar.url}
						width='40'
						height='40'
						className='d-inline-block align-top mx-3'
						alt='app-user-avatar'
					/>
				)}
				{user.name}
			</p>
		</nav>
	);
}
