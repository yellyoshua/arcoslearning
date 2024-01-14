import Footer from "../Footer";
import NavigationHeader from "../NavigationHeader";

export default function Loading() {
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
