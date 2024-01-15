import { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuthStore";
import { useShallow } from "zustand/react/shallow";
import playersService from "../../services/players.service";
import assignmentsService from "../../services/assignments.service";
import useAssignmentsStore from "../../hooks/useAssignmentsStore";
import Loading from "../Loading";

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
		const assignments = await assignmentsService.get({}, {select: 'id, name, cover'});
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

		if (user) {
			getInitialData();
		}
	}, [user?.id]);

	if (loading) {
		return <Loading />
	}

	return <>{props.children}</>
}
