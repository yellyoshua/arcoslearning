// @ts-check
import React, { useEffect } from 'react';
import {
	connectAvatarAssetToUserSession,
	getAvatarsAssets,
} from 'flux/actions';
import { useAppStore } from 'flux/stores';

export const AvatarPicker = () => {
	const avatars = useAppStore((state) => state.avatars);

	/** @param {string} avatarID */
	const handlerAvatarSelect = (avatarID) => {
		connectAvatarAssetToUserSession(avatarID);
	};

	useEffect(() => {
		getAvatarsAssets();
	}, []);

	return (
		<section className='container'>
			<div className='container-fluid'>
				<p className='init-greeting'>Selecciona tu avatar</p>
			</div>
			<div className='row justify-content-center'>
				{avatars.map((avatar, key) => {
					return (
						<div
							key={key}
							onClick={() => handlerAvatarSelect(avatar.id)}
							className='game-cards-options card m-3'
							style={{ height: 64, width: 64 }}
						>
							<img
								src={avatar.url}
								className='card-img-top'
								alt={key + '-avatar-' + avatar.slug}
							/>
						</div>
					);
				})}
			</div>
		</section>
	);
};
