import { useEffect, useMemo, useState } from "react";
import { Link, Redirect } from "wouter";
import { useShallow } from "zustand/react/shallow";
import useToasEmit from "../hooks/useToasEmit";
import useAssignmentsStore from "../hooks/useAssignmentsStore";
import Loading from "../components/Loading";
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightCircleIcon';
import assessmentsService from "../services/assessments.service";
import { getPageQuery } from "../utils/getUrlData";
import timeConverter from "../utils/timeConverter";

export default function AssessmentsPage() {
	const query = getPageQuery();
	const toastEmit = useToasEmit();
	const [loading, setLoading] = useState(true);
	const [assessments, setAssessments] = useState<any[]>([]);
	const assignments = useAssignmentsStore(useShallow((state) => state.assignments));

	const currentAssignment = useMemo(() => assignments.find((assignment) => assignment.id === query.assignment), [query.assignment]);

	useEffect(() => {
		const getAssessments = async () => {
			setLoading(true);

			const assessments = query.assignment
				? await assessmentsService.get({assignment_id: query.assignment}, {select: 'id, name, available'})
				: [];

			if (!assessments.length) toastEmit.error('No hay evaluaciones para esta asignatura');
			setAssessments(assessments);

			setLoading(false);
		}

		getAssessments();
	}, []);

	if (loading) {
		return <Loading />
	}

	if (!query.assignment || !assessments.length) {
		return <Redirect to="/" />
	}

	return (
		<div className="max-w-4xl grid gap-2">
			<p className="text-center text-xl text-cyan-500" style={{textShadow: '1px 1px #7b8081'}}>
				<strong>{assessments.length}</strong> Evaluaciones para <span className="font-bold">{currentAssignment?.name}</span>
			</p>

			<div className="grid grid-cols-1 gap-4">
				{
					assessments.map((assessment) => {
						return (
							<div key={`${assessment.id}`} className="grid grid-rows-[auto_1fr] sm:grid-cols-[auto_1fr] rounded-lg overflow-hidden shadow-md">
								<div className="sm:max-w-24 flex justify-center sm:grid sm:grid-rows-2 gap-2 place-items-center bg-white py-1 sm:p-2">
									<p className="text-xs font-bold">Tiempo</p>
									<p className="text-xs">{timeConverter(assessment.duration)}</p>
								</div>

								<div className="bg-slate-900 text-white flex justify-between items-center">
									<p className="px-3 py-2 font-bold text-base">{assessment.name}</p>

									<Link to={`/assessments/${assessment.id}`}>
										<a className="text-sm text-cyan-500 h-full min-w-14 bg-red-600 grid place-items-center cursor-pointer">
											<ArrowRightIcon className="w-8 h-8  font-bold" color="white" />
										</a>
									</Link>
								</div>
							</div>
						);
					})
				}
			</div>

			{!assessments.length && (
				<div className="text-center text-xl text-slate-600 my-20" style={{textShadow: '1px 1px #7b8081'}}>
					No hay evaluaciones para esta asignatura
				</div>
			)}
		</div>
	);
}
