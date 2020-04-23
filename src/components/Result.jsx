import React from 'react';
import useLocalState from '../store';

const Results = () => {
  const [localStore, localActions] = useLocalState();
  const startingGame = (event) => {
    event.preventDefault();
    localActions.addUser(event.target.username.value);
  };
  return (
    <section className="container">
      <div className="container-fluid">
        <p className="init-greeting">LISTA GANADORES</p>
      </div>
      <table style={{borderRadius: 10}} className="text-center table table-light table-hover table-responsive-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuario</th>
            <th scope="col">Correctas</th>
            <th scope="col">Incorrectas</th>
          </tr>
        </thead>
        <tbody>
          {localStore.played.map((game, key) => {
            return (
              <tr key={key}>
                <th scope="row">{key + 1}</th>
                <td>{game.user}</td>
                <td>{game.passed}</td>
                <td>{game.failed}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default Results;
