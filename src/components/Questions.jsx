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

  const goNext = (event) => {
    event.preventDefault();
    const answer = event.target.answer.value;

    if (app.currentPage === app.questions[app.currentGame].length - 1) {
      event.target.answer.value = '';
      return actions.endGame(answer);
    }
    event.target.answer.value = '';
    return actions.goNext(answer, actions);
  };

  if (!app.currentPage && app.currentPage !== 0) {
    return (
      <section className="container">
        <div className="container-fluid">
          <p className="init-greeting">Bueno {app.user}, vamos a comenzar con esto.</p>
          <p className="init-greeting text-primary">Preguntas</p>
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
        <form className="text-center col" onSubmit={goNext}>
          <input placeholder="Tu nombre" className="col-ms-6" name="answer" autoComplete="off" type="text" />
          <button type="submit" style={{ maxWidth: 200 }} className="col-ms-6 m-5 btn btn-danger">
            Comenzar
          </button>
        </form>
      </div>
    );
  }
  return null;
  //HERE POST Q & ANSWERS
};

export default Questions;
