import { useEffect } from "react";
import Footer from "../components/Footer";
import NavigationHeader from "../components/NavigationHeader";
import RegisterUsername from "../components/RegisterUsername";
import useAuthStore from "../hooks/useAuthStore";
import playersService from "../services/players.service";
import RegisterAvatar from "../components/RegisterAvatar";

export default function HomePage() {
	const loading = useAuthStore(state => state.loading);
	const user = useAuthStore(state => state.user);
	const player = useAuthStore(state => state.player);
	const getPlayer = useAuthStore(state => state.getPlayer);

	useEffect(() => {
		getPlayer();
	}, [user]);

	if (loading || !user || !player) {
		return (
			<div className="max-w-4xl grid grid-rows-3 items-center gap-6 h-screen">
				<NavigationHeader/>

				<p className="text-center text-xl text-cyan-500">
				<l-tail-chase size="40" speed="1.75" color="white"></l-tail-chase>
				</p>
				<Footer />
			</div>
		);
	}

	if (!player?.username) {
		return <RegisterUsername />
	}

	if (!player?.avatar) {
		return <RegisterAvatar />
	}

	return (
		<div className="max-w-4xl grid grid-rows-3 gap-6 h-screen">
			<NavigationHeader/>

			<p className="text-center text-xl text-cyan-500" style={{textShadow: '1px 1px #7b8081'}}>
				Here we go!
			</p>
			<Footer />
		</div>
	);
}
