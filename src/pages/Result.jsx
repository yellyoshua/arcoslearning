// @ts-check
import React from 'react';
import { ResultsTable } from 'components/ResultsTable';

const Results = () => {
	return (
		<React.Fragment>
			<section className='container'>
				<p className='init-greeting'>LISTA GANADORES</p>
				<ResultsTable />
			</section>
			<section className='footer container'>
				<blockquote className='blockquote text-center'>
					<footer className='blockquote-footer'>
						Por <cite title='Briggitte Arcos'>Briggitte Arcos</cite>
					</footer>
				</blockquote>
			</section>
		</React.Fragment>
	);
};

export default Results;
