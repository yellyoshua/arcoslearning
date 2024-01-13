import { useState } from "react";
import { useDebounceFn } from "ahooks";
import useToasEmit from "../../hooks/useToasEmit";
import playersService from "../../services/players.service";
import authService from "../../services/auth.service";
// import useDebounce from "../../hooks/useDebounce";

export default function SignInForm() {
	const [email, setEmail] = useState<string>('');
	const [sendingMagicLink, setSendingMagicLink] = useState<boolean>(false);

	const toasEmit = useToasEmit();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setSendingMagicLink(true);

		toasEmit.wait(authService.magicLink(email), {
			pending: 'Enviando enlace mágico...',
			success: 'Enlace mágico enviado',
			error: 'Ha ocurrido un error al enviar el enlace mágico'
		})
		setSendingMagicLink(false);
	}

	return (
		<form className="flex justify-center" onSubmit={handleSubmit}>
			<input
				className="rounded-xl px-2 py-1 w-64 h-10"
				type="text"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				placeholder="Correo electrónico"
			/>

			<button className={`${ sendingMagicLink ? 'bg-orange-100' : 'bg-red-600'} text-white rounded-md px-3 py-1 ml-2 h-10`} type="submit" disabled={sendingMagicLink}>
				Continuar
			</button>
		</form>
	)
}
