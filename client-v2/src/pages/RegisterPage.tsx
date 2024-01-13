import Footer from "../components/Footer";
import NavigationHeader from "../components/NavigationHeader";
import SignInForm from "../components/SignInForm";

export default function RegisterPage() {
	return (
		<div className="max-w-4xl grid grid-rows-4 gap-6 h-screen">
			<NavigationHeader/>

			<p className="m-auto text-lg text-slate-300 max-w-xs p-2 bg-gray-900 rounded-lg shadow-xl">
				Te enviaremos un código mágico por correo electrónico para que puedas conectarte sin contraseña.
			</p>

			<SignInForm />
			<Footer />
		</div>
	);
};
