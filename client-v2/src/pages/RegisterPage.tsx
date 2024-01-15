import { useState } from "react";
import useToasEmit from "../hooks/useToasEmit";
import authService from "../services/auth.service";

export default function RegisterPage() {
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
		<div className="grid grid-rows-2 gap-8">
			<p className="m-auto text-lg text-slate-300 max-w-xs p-2 bg-gray-900 rounded-lg shadow-xl">
				Te enviaremos un enlace por correo electrónico para que puedas iniciar sesión sin contraseña.
			</p>

			<form className="flex justify-center" onSubmit={handleSubmit}>
				<input
					className="rounded-xl px-2 py-1 w-64 h-10"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					placeholder="Correo electrónico"
				/>

				<button className={`${ sendingMagicLink ? 'bg-orange-100' : 'bg-red-600'} text-white rounded-md px-3 py-1 ml-2 h-10`} type="submit" disabled={sendingMagicLink}>
					Continuar
				</button>
			</form>
		</div>
	);
};
