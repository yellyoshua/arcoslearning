export default function Footer() {

	const redirect = () => {
		window.open("https://yoshualopez.com", "_blank");
	};

	return (
		<footer className="text-gray-400 grid place-items-center h-10">
			<blockquote>
				Por <cite title="Yoshua Lopez" onClick={redirect} className="cursor-pointer">Yoshua Lopez</cite>
			</blockquote>
		</footer>
	)
}
