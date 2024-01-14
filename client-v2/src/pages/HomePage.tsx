import Footer from "../components/Footer";
import NavigationHeader from "../components/NavigationHeader";

export default function HomePage() {
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
