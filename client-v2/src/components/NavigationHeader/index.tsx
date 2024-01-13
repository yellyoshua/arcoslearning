import { useState } from 'react';
import { Link } from 'wouter';
import Avatar from '../Avatar';
import Modal from '../Modal.tsx';
import { arrowDown } from '../../icons';
import useAuthStore from '../../hooks/useAuthStore';
import authService from '../../services/auth.service';

export default function NavigationHeader() {
	const isSignedIn = useAuthStore(state => state.isSignedIn);
	const [isSigningOut, setIsSigningOut] = useState(false);

	const signOut = async () => {
		setIsSigningOut(true);
		await authService.signOut();
		setIsSigningOut(false);
	}

	return (
		<nav className='bg-transparent justify-around w-full flex items-center'>
			<Modal isOpen={isSigningOut} onClose={() => {}}>
				<div className='flex flex-col items-center max-w-sm'>
					<l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>

					<p className='text-slate-700 text-xs mt-2'>
						Cerrando sesión...
					</p>
				</div>
			</Modal>

			<a style={{ fontSize: 35, textShadow: '1px 1px #279deb' }} className='text-center flex items-center text-white' href='/'>
				<img src={arrowDown} width='64' height='64' className='inline-block align-top mx-3' alt='Arcos Learning - Arrow Down'/>
				Arcos Learning
			</a>

			<Link to='/scores' style={{ fontSize: 20, textShadow: '1px 1px rgb(84, 20, 20) 1px 1px' }} className='text-red-600 flex items-center pt-3 px-2'>
				World Scores
			</Link>

			{isSignedIn && <button onClick={signOut} className='px-3 py-1 bg-red-600 text-white rounded-md ml-2'>
				Cerrar sessi&oacute;n
			</button>}

			{isSignedIn && <Avatar
				image={'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
				onPress={() => {/* Remove profile photo? */}}
			/>}
		</nav>
	);
}
