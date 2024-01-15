import { useState } from "react";
import useToasEmit from "../../hooks/useToasEmit";
import useAuthStore from "../../hooks/useAuthStore";
import playersService from "../../services/players.service";
import avatars from "../../avatars";

export default function RegisterAvatar() {
	const toasEmit = useToasEmit();
	const [changingAvatar, setChangingAvatar] = useState<boolean>(false);

	const user = useAuthStore(state => state.user);
 	const player = useAuthStore(state => state.player);

	const handleAvatarSelect = async (avatar: string) => {
		if (changingAvatar) return;

		setChangingAvatar(true);
		const [updated_player_avatar] = await toasEmit.wait(playersService.update(player.id, {avatar, user_id: user.id}), {
			pending: 'Seleccionando avatar...',
			success: 'Avatar cambiado',
			error: 'Error al cambiar el avatar'
		});
		useAuthStore.setState({player: updated_player_avatar});
		setChangingAvatar(false);
	}

	return (
		<div className="max-w-4xl grid gap-6">
			<p className="text-center text-xl text-cyan-500 " style={{textShadow: '1px 1px #7b8081'}}>
				Ahora, elige tu avatar
			</p>

			<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
				{
					avatars.map(({slug, src}) => (
						<div key={slug} className="flex justify-center">
							<img src={src} alt={slug} className="w-20 h-20 rounded-full cursor-pointer" onClick={() => handleAvatarSelect(slug)} />
						</div>
					))
				}
			</div>
		</div>
	);
}
