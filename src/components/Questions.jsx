import React from 'react';
import useLocalState from '../store';
import stateComponent from '../states';

const Questions = () => {
  const [localStore, localActions] = useLocalState();
  const [counter, setCounter] = stateComponent('count', 5);
  // Third Attempts
  React.useEffect(() => {
    if (!localStore.currentPage && localStore.currentPage !== 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0) {
        clearInterval(timer);
        return localActions.startGame();
      }
    }
  });

  const goNext = (event) => {
    event.preventDefault();
    const answer = event.target.answer.value;
    console.log('localStore.currentPage === localStore.questions[localStore.currentGame].length - 1 -> ', localStore.currentPage === localStore.questions[localStore.currentGame].length - 1);
    if (localStore.currentPage === localStore.questions[localStore.currentGame].length - 1) {
      return localActions.endGame(answer);
    }
    return localActions.goNext(answer, localActions);
  };

  if (!localStore.currentPage && localStore.currentPage !== 0) {
    return (
      <section className="container">
        <div className="container-fluid">
          <p className="init-greeting">Bueno {localStore.user}, vamos a comenzar con esto.</p>
          <p className="init-greeting text-primary">Preguntas</p>
        </div>
        <div className="row justify-content-center">
          <div className="card m-3" style={{width: '18rem'}}>
            <div className="card-body text-center">
              <h3 className="card-text text-danger">{counter}</h3>
            </div>
          </div>
        </div>
        <div className="text-center">
          <button onClick={localActions.goHome} className="btn btn-success">
            Regresar
          </button>
        </div>
      </section>
    );
  }
  if (localStore.currentPage === 0 || localStore.currentPage) {
    let question = localStore.questions[localStore.currentGame][localStore.currentPage];
    return (
      <div>
        <div className="col">
          <p>{question.question}</p>
        </div>
        <form className="text-center col" onSubmit={goNext}>
          <input placeholder="Tu nombre" className="col-ms-6" name="answer" autoComplete="off" type="text" />
          <button type="submit" style={{maxWidth: 200}} className="col-ms-6 m-5 btn btn-danger">
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
