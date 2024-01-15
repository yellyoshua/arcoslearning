import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import useAuthStore from "../../hooks/useAuthStore";
import playersService from "../../services/players.service";
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon';
import avatars from "../../avatars";

export default function Avatar() {
	const player = useAuthStore(useShallow(state => state.player));

	const playerAvatar = useMemo(() => {
		const playerAvatar = avatars.find(avatar => avatar.slug === player?.avatar);
		return playerAvatar?.src
	}, [player?.avatar]);


	const removeAvatar = async () => {
		await playersService.update(player.id, {avatar: null});
		useAuthStore.setState((state) => ({player: {...state.player, avatar: null}}));
	}

	return (
		<div className="flex items-center mx-2 w-10 h-10">
			{
				playerAvatar
				? <img className="w-full h-full rounded-full object-cover cursor-pointer" onClick={removeAvatar} src={playerAvatar} alt="Avatar" />
				: <div className="w-full h-full rounded-full object-cover cursor-pointer bg-gray-300"><UserCircleIcon className="w-full h-full text-blue-800" /></div>
			}
		</div>
	);
}
