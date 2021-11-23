// @ts-check
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../store';
import { useGameStore, useUserStore } from 'flux/stores';

const Home = () => {
  const { loading, user } = useUserStore();
  const { quiz } = useGameStore();
  const [app] = useContext(AppContext);

  if (!user || !user.avatar || !user.name) {
    return <Navigate to="/register" />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (quiz) {
    return <p>CURRENT QUIZ GAME: {quiz}</p>;
    // return <Game questions={app.questions[app.currentGame] || []} />;
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
              // actions.selectGameType(game.game);
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
