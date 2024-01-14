import RegisterUsername from "../components/RegisterUsername";
import useAuthStore from "../hooks/useAuthStore";
import RegisterAvatar from "../components/RegisterAvatar";
import { useShallow } from "zustand/react/shallow";
import { Redirect } from "wouter";

export default function OnboardingPage() {
	const player = useAuthStore(useShallow(state => state.player));

	if (!player?.username) {
		return <RegisterUsername />
	}

	if (!player?.avatar) {
		return <RegisterAvatar />
	}

	return <Redirect to='/' />;
}
