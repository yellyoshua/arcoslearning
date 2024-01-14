import { useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../../hooks/useAuthStore";
import playersService from "../../services/players.service";
import avatars from "../../avatars";

type AvatarProps = {
};

export default function Avatar({}: AvatarProps) {
	const user = useAuthStore(useShallow(state => state.user));
	const player = useAuthStore(useShallow(state => state.player));

	const playerAvatar = useMemo(() => {
		const playerAvatar = avatars.find(avatar => avatar.slug === player?.avatar);
		const defaultAvatar = 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png';
		return playerAvatar ? playerAvatar.src : defaultAvatar;
	}, [player?.avatar]);


	const removeAvatar = async () => {
		await playersService.update(player.id, {avatar: null});
		useAuthStore.setState((state) => ({player: {...state.player, avatar: null}}));
	}

	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center mx-2">
			<div className="flex-shrink-0">
				<img className="h-10 w-10 rounded-full object-cover cursor-pointer" onClick={removeAvatar} src={playerAvatar} alt="" />
			</div>
		</div>
	);
}
