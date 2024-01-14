import { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { useShallow } from "zustand/react/shallow";
import playersService from "../../services/players.service";
import Loading from "../Loading";
import assignmentsService from "../../services/assignments.service";
import useAssignmentsStore from "../../hooks/useAssignmentsStore";

type InitialDataLoaderProps = {
	children: React.ReactNode;
}

export default function InitialDataLoader(props: InitialDataLoaderProps) {
	const [loading, setLoading] = useState(true);
	const user = useAuthStore(useShallow(state => state.user));

	const getPlayer = async () => {
		const [player] = await playersService.get({user_id: user.id});
		useAuthStore.setState({ player });
	};

	const getAssigments = async () => {
		const assignments = await assignmentsService.get({});
		useAssignmentsStore.setState({ assignments });
	}

	useEffect(() => {
		const getInitialData = async () => {
			setLoading(true);
			await Promise.all([
				getPlayer(),
				getAssigments()
			]);
			setLoading(false);
		};

		getInitialData();
	}, []);

	if (loading) {
		return <Loading />
	}

	return <>{props.children}</>
}
