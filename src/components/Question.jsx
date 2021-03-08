import React from 'react';

const Question = ({ name, options, onAnswer }) => {
  return (
    <div>
      <div className="col">
        <p>{name}</p>
      </div>
      <div className="text-center col">
        <div className="row justify-content-between align-items-center">
          {options.map((option, key) => {
            return (
              <div key={key} onClick={() => onAnswer(option)} className="col-6 p-2">
                <p title={`answer-${option}`} className="text-center m-0 option-answer-select py-3 py-2">
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

export default Question;
