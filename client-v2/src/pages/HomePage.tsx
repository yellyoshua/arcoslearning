import { Link } from "wouter";
import useAssignmentsStore from "../hooks/useAssignmentsStore";
import bucketService from "../services/bucket.service";

export default function HomePage() {
	const assignments = useAssignmentsStore((state) => state.assignments);

	const selectAssignment = (assignmentId: string) => {
		useAssignmentsStore.setState({assignment: assignmentId});
	}

	const getInitials = (name: string) => {
		const words = name.split(' ');
		const initials = words.map((word) => word.charAt(0));
		return initials.join('.');
	}

	return (
		<div className="max-w-4xl grid gap-8">
			<p className="text-center text-xl text-cyan-500" style={{textShadow: '1px 1px #7b8081'}}>
				Selecciona con que quieres comenzar
			</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{
					assignments.map((assignment) => (
						<Link key={`${assignment.id}`} to={`/assessments?assignment=${assignment.id}`} onClick={() => selectAssignment(assignment.id)}>
							<a className="text-slate-600 bg-white hover:text-white transition-colors hover:bg-slate-700 rounded-xl overflow-hidden cursor-pointer flex">
								<div className="bg-cyan-300 grid place-items-center relative min-w-24 md:min-w-16">
									{assignment.cover
										? <img src={bucketService.getPublicUrl(assignment.cover)} alt={assignment.name} className="absolute top-0 left-0 w-full h-full object-cover" />
										: <p className="font-bold">{getInitials(assignment.name)}</p>
									}
								</div>
								<div className="p-3 flex items-center w-full">
									<p className="text-left text-base">{assignment.name}</p>
								</div>
							</a>
						</Link>
					))
				}
			</div>

			{!assignments.length && (
				<div className="text-center text-xl text-slate-600 my-20" style={{textShadow: '1px 1px #7b8081'}}>
					No hay asignaturas disponibles
				</div>
			)}
		</div>
	);
}
