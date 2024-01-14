import { Redirect } from "wouter";
import {useShallow} from 'zustand/react/shallow';
import useAuthStore from "../../hooks/useAuthStore";

type OnboardingRedirectProps = {
	children: React.ReactNode;
}

export default function OnboardingRedirect(props: OnboardingRedirectProps) {
	const player = useAuthStore(useShallow(state => state.player));

	if (!player?.username || !player?.avatar) {
		return <Redirect to='/onboarding' />;
	}

	return <>{props.children}</>
}
