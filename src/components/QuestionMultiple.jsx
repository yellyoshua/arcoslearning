import React, { useContext } from 'react';
import { AppContext } from '../store';
import stateComponent from '../states';

const QuestionsMultiple = () => {
  const [app, actions] = useContext(AppContext);
  const [count, setCounter] = stateComponent('count', 5);

  const startingGame = (event) => {
    event.preventDefault();
    actions.addUser(event.target.username.value);
  };
  if (count !== 0) {
    return (
      <section className="container">
        <div className="container-fluid">
          <p className="init-greeting">Bueno {app.user}, vamos a comenzar con esto.</p>
          <p className="init-greeting text-primary">Preguntas</p>
        </div>
        <div className="row justify-content-center">
          <div className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body text-center">
              <h3 className="card-text text-danger">{count}</h3>
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
  return null;
};

export default QuestionsMultiple;
