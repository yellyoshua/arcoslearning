import React, { useContext } from 'react';
import { AppContext } from '../store';

const Results = () => {
  const [app, actions] = useContext(AppContext);
  const restartGame = () => {
    actions.restartGame();
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
        <table style={{ borderRadius: 10 }} className="text-center table table-light table-hover table-responsive-sm">
          <thead>
            <tr>
              <th scope="col">Avatar</th>
              <th scope="col">Usuario</th>
              <th scope="col">Juego</th>
              <th scope="col">Calificaci&oacute;n</th>
            </tr>
          </thead>
          <tbody>
            {app.scores.sort(sortScores).map((score, key) => {
              return (
                <tr key={key}>
                  <th scope="row">
                    <img src={score.avatar} width="40" height="40" className="d-inline-block align-top mx-3" alt={'avatar-' + score.user} />
                  </th>
                  <td>{score.user}</td>
                  <td>{score.game}</td>
                  <td className="d-flex justify-content-center align-items-center">
                    <p>{score.qualification}/100</p>
                    <p className="text-white" style={{ padding: '0px 10px', background: score.color, borderRadius: '50%' }}>
                      {score.value}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section className="footer container">
        <blockquote className="blockquote text-center">
          <footer className="blockquote-footer">
            Por <cite title="Briggitte Arcos">Briggitte Arcos</cite>
          </footer>
        </blockquote>
      </section>
    </React.Fragment>
  );
};
const sortScores = (score1, score2) => {
  return score2.qualification - score1.qualification;
};

export default Results;
