// @ts-check
import React, { useState } from 'react';
import { useToast } from 'hooks/useToast';
import { createUserSession } from 'flux/actions';
import { beUsername } from 'utils/validator';

/**
 * @param {string} username
 * @returns {boolean}
 */
const isUsernameCorrect = (username) => {
	const isUsername = beUsername(username);
	const lengthCorrect = username.length >= 3;

	return isUsername && lengthCorrect;
};

export const RegisterForm = () => {
	const [username, setUsername] = useState('');
	const [canSubmit, setCanSubmit] = useState(false);

	const { fireToastPromise } = useToast();

	/** @param {React.ChangeEvent<HTMLFormElement>} event */
	const registerPlayer = async (event) => {
		event.preventDefault();

		if (isUsernameCorrect(username)) {
			try {
				await fireToastPromise(createUserSession(username), {
					pending: 'Validando sesion',
					error: 'Intenta con otro nombre de usuario',
					success: `Bienvenido, ${username}`,
				});
			} catch (error) {}
		}
	};

	/** @param {React.ChangeEvent<HTMLInputElement>} event */
	const handlerNameInput = (event) => {
		const username = event.target.value;

		if (isUsernameCorrect(username)) {
			setCanSubmit(true);
		} else {
			setCanSubmit(false);
		}

		setUsername(username.slice(0, 15));
	};

	return (
		<section className='container'>
			<div style={{ maxWidth: 500 }} className='container-fluid text-center'>
				<p className='init-greeting'>
					Okey, comenzemos pero antes debo saber...
					<br /> ¿Qui&eacute;n eres?
				</p>
				<strong style={{ fontSize: 14 }} className='text-danger'>
					(De 3 a 15 car&aacute;cteres)
				</strong>
			</div>
			<form className='text-center col' onSubmit={registerPlayer}>
				<input
					type='text'
					onChange={handlerNameInput}
					value={username}
					placeholder='Tu nombre'
					className='col-ms-6'
					autoComplete='off'
				/>
				<button
					type='submit'
					disabled={!canSubmit}
					style={{ maxWidth: 200 }}
					className='col-ms-6 m-5 btn btn-danger'
				>
					Comenzar
				</button>
			</form>
		</section>
	);
};
