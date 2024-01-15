import { useState } from 'react';
import { Link } from 'wouter';
import { useShallow } from 'zustand/react/shallow';
import useAuthStore from '../hooks/useAuthStore';
import ArrowLeftStartOnRectangleIcon from '@heroicons/react/24/solid/ArrowLeftStartOnRectangleIcon'
import Avatar from './Avatar';
import Modal from './Modal.tsx';
import { arrowDown } from '../icons';
import authService from '../services/auth.service';

type LayoutProps = {
	children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
	const user = useAuthStore(useShallow(state => state.user));
	const [isSigningOut, setIsSigningOut] = useState(false);

	const signOut = async () => {
		setIsSigningOut(true);
		await authService.signOut();
	}

	const redirect = () => {
		window.open("https://yoshualopez.com", "_blank");
	};

	return <div>
		<Modal isOpen={isSigningOut} onClose={() => {}}>
			<div className='flex flex-col items-center max-w-sm'>
				<l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>

				<p className='text-slate-700 text-xs mt-2'>
					Cerrando sesión...
				</p>
			</div>
		</Modal>

		<nav className="sticky w-full flex justify-around items-center py-2 bg-opacity-50 bg-primary backdrop-blur-md">
			<a style={{ fontSize: 35, textShadow: '1px 1px #279deb' }} className='text-center flex items-center text-white' href='/'>
				<img src={arrowDown} width='64' height='64' className='inline-block align-top mx-3' alt='Arcos Learning - Arrow Down'/>
				<span className="sm:block hidden">Arcos Learning</span>
			</a>

			<Link to='/leaderboard' style={{ fontSize: 20, textShadow: '1px 1px rgb(84, 20, 20) 1px 1px' }} className='text-red-600 flex items-center pt-3 px-2'>
				Leaderboard
			</Link>

			{
				user && (
					<div className='flex items-center'>
						<button onClick={signOut} className='px-3 py-1 bg-red-600 text-white rounded-md ml-2'>
							<ArrowLeftStartOnRectangleIcon className='w-5 h-5'/>
						</button>
						<Avatar />
					</div>
				)
			}

		</nav>

		<main className="m-auto max-w-lg py-8">
			{props.children}
		</main>

		<footer className="text-gray-400 grid place-items-center h-10">
			<blockquote>
				Por <cite title="Yoshua Lopez" onClick={redirect} className="cursor-pointer">Yoshua Lopez</cite>
			</blockquote>
		</footer>
	</div>
}


