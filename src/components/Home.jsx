import React from 'react';
import {answer, checkboxes} from '../images';
import game from '../games';
import useLocalState from '../store';

const Home = () => {
  const [localStore, localActions] = useLocalState();
  const gameOptions = [
    {
      name: 'Opcion múltiple',
      image: checkboxes,
      alt: 'options_game',
      type: 'm'
    },
    {
      name: 'Preguntas',
      image: answer,
      alt: 'questions_game',
      type: 'q'
    }
  ];
  console.log('localStore.currentGame -> ', localStore.currentGame);
  if (localStore.currentGame) {
    return game[localStore.currentGame];
  }
  return (
    <section className="container">
      <div className="container-fluid">
        <p className="init-greeting">Que tal , {localStore.user}.</p>
        <p className="init-greeting">Selecciona con que quieres comenzar</p>
      </div>
      <div className="row justify-content-center">
        {gameOptions.map((game, key) => {
          const selectGameType = () => {
            localActions.selectGameType(game.type);
          };
          return (
            <div key={key} onClick={selectGameType} className="game-cards-options card m-3" style={{width: '18rem'}}>
              <img src={game.image} className="card-img-top" alt={game.alt} />
              <div className="card-body text-center">
                <h3 className="card-text text-danger">{game.name}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
