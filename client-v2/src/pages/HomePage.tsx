import {useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavigationHeader from "../components/NavigationHeader";
import RegisterUsername from "../components/RegisterUsername";
import useAuthStore from "../hooks/useAuthStore";
import RegisterAvatar from "../components/RegisterAvatar";
import Loading from "../components/Loading";
import playersService from "../services/players.service";

export default function HomePage() {
	const [loading, setLoading] = useState(true);
	const user = useAuthStore(state => state.user);
	const player = useAuthStore(state => state.player);

	useEffect(() => {
		const getPlayer = async () => {
			setLoading(true);
			const [player] = await playersService.get({user: user.id})
			useAuthStore.setState({ player});
			setLoading(false);
		};

		getPlayer();
	}, []);

	if (loading) {
		return <Loading />
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
