import { useState } from "react";
import { Link } from "wouter";
import Footer from "../components/Footer";
import NavigationHeader from "../components/NavigationHeader";
import useAssignmentsStore from "../hooks/useAssignmentsStore";

export default function HomePage() {
	const assignments = useAssignmentsStore((state) => state.assignments);
	const [query, setQuery] = useState(() => {
		const query = new URLSearchParams(window.location.search);
		return Object.fromEntries(query);
	});

	return (
		<div className="max-w-4xl grid gap-6">
			<NavigationHeader/>

			<p className="text-center text-xl text-cyan-500" style={{textShadow: '1px 1px #7b8081'}}>
				Selecciona con que quieres comenzar
			</p>

			<div className="grid grid-cols-2">
				{
					assignments.map((assignment) => (
						<Link to={`/?assignment=${assignment.id}`} onClick={() => setQuery(state => ({...state, assignments: assignment.id}))} key={`${assignment.name}`}>
							<div className=" text-slate-600 hover:text-white transition-colors bg-white hover:bg-slate-700 p-3 m-3 rounded-xl cursor-pointer">
								<div className='card-body text-center m-auto'>
									<h3 className='card-text text-danger'>{assignment.name}</h3>
								</div>
							</div>
						</Link>
					))
				}
			</div>

			{!assignments.length && (
				<div className="text-center text-xl text-slate-600 my-20" style={{textShadow: '1px 1px #7b8081'}}>
					No hay asignaturas disponibles
				</div>
			)}

			<Footer />
		</div>
	);
}
