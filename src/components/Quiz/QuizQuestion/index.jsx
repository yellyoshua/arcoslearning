// @ts-check
import React from 'react';
import { qualifyAnswerAndNext } from 'flux/actions';

/** @param {{ question: import('types').Quiz, answerIndex: number }} props */
export const QuizQuestion = ({ question, answerIndex }) => {
	/**
	 * @param {number} optionIndex
	 */
	const selectOptionHandler = (optionIndex) => {
		qualifyAnswerAndNext(optionIndex, answerIndex);
	};

	return (
		<div>
			<div className='col'>
				<p>{question.question}</p>
			</div>
			<div className='text-center col'>
				<div className='row justify-content-between align-items-center'>
					{question.options.map((option, optionIndex) => {
						return (
							<div
								key={optionIndex}
								onClick={() => selectOptionHandler(optionIndex)}
								className='col-6 p-2'
							>
								<p
									title={`answer-${option}`}
									className='text-center m-0 option-answer-select py-3 py-2'
								>
									{option}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
