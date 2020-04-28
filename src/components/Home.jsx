import React from 'react';
import avatar from '../avatars';
import Game from './Game';
import useLocalState from '../store';

const Home = () => {
  const [localStore, localActions] = useLocalState();

  if (!localStore.avatar) {
    return (
      <section className="container">
        <div className="container-fluid">
          <p className="init-greeting">Selecciona tu avatar</p>
        </div>
        <div className="row justify-content-center">
          {avatar.list.map((avatar, key) => {
            const selectAvatar = () => {
              localActions.addAvatar(avatar);
            };
            return (
              <div key={key} onClick={selectAvatar} className="game-cards-options card m-3" style={{height: 64, width: 64}}>
                <img src={avatar} className="card-img-top" alt={'avatar-' + key} />
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (localStore.currentGame) {
    return <Game />;
  }

  return (
    <React.Fragment>
      <section className="container">
        <div className="container-fluid text-center">
          <p className="init-greeting">Selecciona con que quieres comenzar</p>
        </div>
        <div className="row justify-content-center">
          {localStore.gameOptions.map((game, key) => {
            const selectGameType = () => {
              localActions.selectGameType(game.game);
            };
            return (
              <div key={key} onClick={selectGameType} className="game-cards-options card m-3" style={{width: '18rem', background: game.background}}>
                <div className="card-body text-center">
                  <h3 className="card-text text-danger">{game.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
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

export default Home;
