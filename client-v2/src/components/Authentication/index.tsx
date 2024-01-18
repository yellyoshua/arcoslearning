import { useEffect } from "react";
import { Redirect } from "wouter";
import {useShallow} from 'zustand/react/shallow';
import useAuthStore from "../../hooks/useAuthStore";
import authService from "../../services/auth.service";
import Loading from "../Loading";

type AuthenticationProps = {
	isPublic?: boolean;
	children: JSX.Element;
}

export default function Authentication({ isPublic = false, children}: AuthenticationProps) {
	const loading = useAuthStore(useShallow(state => state.loading));
	const user = useAuthStore(useShallow(state => state.user));
	const reset = useAuthStore(useShallow(state => state.reset));

	useEffect(() => {
		const eventState = authService.service.onAuthStateChange(
			(event, session) => {
				if (['SIGNED_IN', 'SIGNED_OUT'].includes(event)) {
					const isSignedOut = ['SIGNED_OUT'].includes(event) || !session;

					if (isSignedOut) {
						reset();
					}

					if (!isSignedOut) {
						useAuthStore.setState({user: session?.user, session: session});
					}
				}

				useAuthStore.setState({loading: false});
			}
		);

		return () => eventState.data.subscription.unsubscribe();
	}, []);

	if (loading) {
		return <Loading />
	}

	if (user && isPublic) {
		return <Redirect to='/' />;
	}

	if (!user && !isPublic) {
		return <Redirect to='/register' />;
	}

	return <>{children}</>
}
