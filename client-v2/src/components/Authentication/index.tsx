import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { useLocation, useRoute, useRouter } from "wouter";

type AuthenticationProps = {
	isPublic?: boolean;
	children: JSX.Element;
}

export default function Authentication({ isPublic = false, children}: AuthenticationProps) {
	const [, setLocation] = useLocation();

	useEffect(() => {
		const unsubscribe = authService.onAuthStateChange((status) => {
			if (status.isSignedIn && isPublic) {
				return setLocation('/');
			}

			if (!status.isSignedIn && !isPublic) {
				return setLocation('/register');
			}
		});

		return () => unsubscribe();
	}, []);

	return <>{children}</>
}
