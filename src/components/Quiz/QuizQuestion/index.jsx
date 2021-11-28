// @ts-check
import { qualifyAnswerAndNext } from 'flux/actions';
import React from 'react';

/** @param {{ question: import('types').Question, answerIndex: number }} props */
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
