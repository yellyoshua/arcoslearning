import { useState } from "react";
import useToasEmit from "../../hooks/useToasEmit";
import useAuthStore from "../../hooks/useAuthStore";
import playersService from "../../services/players.service";

export default function RegisterUsername() {
	const toasEmit = useToasEmit();
	const [username, setUsername] = useState<string>('');
	const [checkingUsername, setCheckingUsername] = useState<boolean>(false);

	const user = useAuthStore(state => state.user);
 	const player = useAuthStore(state => state.player);

	const checkUsernameAvailability = async (username: string, user: any) => {
		const [playerWithUsername] = await playersService.get({username});
		const matchWithUser = playerWithUsername?.user_id === user.id;

		if (playerWithUsername && !matchWithUser) throw new Error('Username not available');
		if (player?.id) await playersService.update(player.id, {username, user_id: user.id});
		return await playersService.create({username, user_id: user.id});
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (checkingUsername) return;

		setCheckingUsername(true);
		const updated_player_list = await toasEmit.wait(checkUsernameAvailability(username, user), {
			pending: 'Comprobando disponibilidad del nombre de usuario...',
			success: 'Nombre de usuario creado',
			error: 'Nombre de usuario no disponible'
		});
		setCheckingUsername(false);

		if (updated_player_list && updated_player_list.length) {
			const [updated_player] = updated_player_list;
			useAuthStore.setState({player: updated_player});
		}
	}

	return (
		<div className="max-w-4xl grid grid-rows-3 gap-8">
			<p className="text-center text-xl text-cyan-500" style={{textShadow: '1px 1px #7b8081'}}>
				Okey, comenzemos pero antes debo saber...
				<br /> ¿Qui&eacute;n eres?
			</p>

			<p className="text-center font-bold text-red-600">
				(De 3 a 15 car&aacute;cteres)
			</p>

			<form className="flex justify-center" onSubmit={handleSubmit}>
				<input
					className="rounded-xl px-2 py-1 w-64 h-10"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
					placeholder="Nombre de usuario"
				/>

				<button className="bg-red-600 text-white rounded-md px-3 py-1 ml-2 h-10" type="submit" disabled={checkingUsername}>
					Continuar
				</button>
			</form>
		</div>
	);
}
