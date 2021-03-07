import React, { useContext } from 'react';
import { AppContext } from '../store';
import stateComponent from '../states';

const Questions = () => {
  const [app, actions] = useContext(AppContext);
  const [counter, setCounter] = stateComponent('count', 5);
  // Third Attempts
  React.useEffect(() => {
    if (!app.currentPage && app.currentPage !== 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        clearInterval(timer);
        return actions.startGame();
      }
    }
  });

  const goNext = (answer) => {
    if (app.currentPage === app.questions[app.currentGame].length - 1) {
      return actions.endGame(answer);
    }
    return actions.goNext(answer, actions);
  };

  if (!app.currentPage && app.currentPage !== 0) {
    return (
      <section className="container">
        <div className="container-fluid">
          <p className="init-greeting">Bueno {app.user}, vamos a comenzar con esto.</p>
          <p className="init-greeting text-primary">{showGameName(app.gameOptions, app.currentGame, actions.goHome)}</p>
        </div>
        <div className="row justify-content-center">
          <div className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body text-center">
              <h3 className="card-text text-danger">{counter}</h3>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button onClick={actions.goHome} className="btn btn-success">
            Regresar
          </button>
        </div>
      </section>
    );
  }
  if (app.currentPage === 0 || app.currentPage) {
    let question = app.questions[app.currentGame][app.currentPage];
    return (
      <div>
        <div className="col">
          <p>{question.question}</p>
        </div>
        <div className="text-center col">
          <div className="row justify-content-between align-items-center">
            {question.options.map((option, key) => {
              return (
                <div key={key} onClick={goNext.bind(this, option)} className="col-6 p-2">
                  <p className="text-center m-0 option-answer-select py-3 py-2">{option}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return null;
  //HERE POST Q & ANSWERS
};

const showGameName = (gameOptions, currentGame, goBack) => {
  let gameSelected = [];
  gameOptions.map((game, index) => {
    if (game.game === currentGame) {
      gameSelected.push(game);
      return game;
    }
    return game;
  });

  if (!gameSelected.length) {
    goBack();
    return '';
  }

  return gameSelected[0].name;
};

export default Questions;
