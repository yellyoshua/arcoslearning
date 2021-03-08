import React, { useContext } from 'react';
import Game from './Game';
import { AppContext } from 'store';

const Home = () => {
  const [app, actions] = useContext(AppContext);

  if (app.currentGame) {
    return <Game questions={app.questions[app.currentGame] || []} />;
  }

  return (
    <React.Fragment>
      <section className="container">
        <div className="container-fluid text-center">
          <p className="init-greeting">Selecciona con que quieres comenzar</p>
        </div>
        <div className="row justify-content-center">
          {app.gameOptions.map((game, key) => {
            const selectGameType = () => {
              actions.selectGameType(game.game);
            };
            return (
              <div key={key} onClick={selectGameType} className="game-cards-options card m-3" style={{ width: '18rem', background: game.background }}>
                <div className="card-body text-center">
                  <h3 className="card-text text-danger">{game.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
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

export default Home;
