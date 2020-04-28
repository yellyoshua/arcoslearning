import React from 'react';
import useLocalState from '../store';

const Results = () => {
  const [localStore, localActions] = useLocalState();
  const restartGame = () => {
    localActions.restartGame();
  };

  return (
    <React.Fragment>
      <section className="container">
        <div className="container-fluid d-flex justify-content-between">
          <p className="init-greeting">LISTA GANADORES</p>
          <p onClick={restartGame} className="restart-game">
            Limpiar lista
          </p>
        </div>
        <table style={{borderRadius: 10}} className="text-center table table-light table-hover table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Usuario</th>
              <th scope="col">Aciertos</th>
              <th scope="col">Calificaci&oacute;n</th>
            </tr>
          </thead>
          <tbody>
            {localStore.played.sort(sortCalifications).map((game, key) => {
              return (
                <tr key={key}>
                  <th scope="row">
                    <img src={game.avatar} width="40" height="40" className="d-inline-block align-top mx-3" alt={'avatar-' + game.user} />
                  </th>
                  <td>{game.user}</td>
                  <td>
                    {game.passed}/{game.failed + game.passed}
                  </td>
                  <td className="d-flex justify-content-center align-items-center">
                    <p className="text-white" style={{padding: '0px 10px', background: game.color, borderRadius: '50%'}}>
                      {game.calification}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="footer container">
        <blockquote class="blockquote text-center">
          <footer class="blockquote-footer">
            Por <cite title="Briggitte Arcos">Briggitte Arcos</cite>
          </footer>
        </blockquote>
      </section>
    </React.Fragment>
  );
};
const sortCalifications = (game1, game2) => {
  return game2.percent - game1.percent;
};

export default Results;
