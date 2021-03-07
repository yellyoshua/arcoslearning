import React, { createContext, useCallback, useState } from 'react';
import { mixColors } from '../utils/mixcolors';
// import useGlobalHook from 'use-global-hook';

// PENDING: import stateComponent from '../states';

import * as appActions from '../actions';

function setBackground() {
  return mixColors().background;
}

export const initialState = {
  user: null,
  avatar: null,
  played: [],
  gameOptions: [
    { name: 'Lenguage', background: setBackground(), alt: 'language_game', game: 'literature' },
    { name: 'Historia', background: setBackground(), alt: 'language_game', game: 'history' },
    { name: 'Biologia', background: setBackground(), alt: 'language_game', game: 'biology' },
    { name: 'Matemáticas', background: setBackground(), alt: 'language_game', game: 'math' }
  ],
  questions: {
    literature: [
      { question: 'Selecciona la escritura correcta:', answer: ['Zanahoria'], options: ['Zanahoria', 'Sanahoria', 'Zanaoria'] },
      { question: 'Selecciona la escritura correcta:', answer: ['Barbacoa'], options: ['Barbacoa', 'Varvacoa', 'Barvacoa'] },
      { question: '¿La palabra (abundante) a qué grupo pertenece?', answer: ['Sinónimo'], options: ['Sinónimo', 'Antónimo'] },
      { question: '¿La palabra (casado) a qué grupo pertenece?', answer: ['Antónimo'], options: ['Sinónimo', 'Antónimo'] }
    ],
    history: [
      { question: '¿Quien descubrió América?', answer: ['Cristóbal Colón'], options: ['Nicolás Copérnico', 'Cristóbal Colón', 'Fernando de Aragón', 'Charles Darwin'] },
      { question: '¿Cuál fue la primera maquina de vapor creada por el hombre?', answer: ['El tren'], options: ['La bomba industrial', 'El motor industrial', 'El tren', 'Barco a vapor'] },
      { question: '¿En qué año fue la independencia de América?', answer: ['1808'], options: ['1815', '1808', '1822', '1775'] }
    ],
    biology: [
      {
        question: '¿Cuál es el orden del ciclo del agua?',
        answer: ['SOLIDO-LIQUIDO-GASEOSO-CONDENSACION'],
        options: ['SOLIDO-LIQUIDO-GASEOSO-CONDENSACION', 'SOLIDO-LIQUIDO-CONDENSACION-GASEOSO', 'LIQUIDO-CONDENSACION-SOLIDO-GASEOSO']
      },
      { question: '¿A qué reino pertenecen las bacterias?', answer: ['Monera'], options: ['Fungi', 'Protista', 'Vegetal', 'Monera'] },
      {
        question: '¿Qué es la célula?',
        answer: ['La unidad más pequeña que puede vivir por si sola'],
        options: [
          'Es la que está destinada a la fecundación del óvulo',
          'La unidad más pequeña que puede vivir por si sola',
          'Es la que puede estar presentes tanto en materia viva como materia inerte',
          'Es una unidad que no puede tener un desarrollo evolutivo'
        ]
      }
    ],
    math: [
      { question: 'Cuál es el resultado de: 5+5*5(5-5)/5', answer: ['5'], options: ['10', '50', '2', '5'] },
      { question: '¿Cuál es la raíz de 81?', answer: ['9'], options: ['9', '8', '7'] },
      { question: '¿Cuál es el resultado de 5 al cubo?', answer: ['125'], options: ['25', '125', '625', '275'] }
    ]
  },
  answers: {
    literature: [], // {page: 0,value : []}
    history: [], // {page: 0,value : []},
    biology: [], // {page: 0,value : []},
    math: [] // {page: 0,value : []},
  },
  currentPage: null,
  timeStart: null,
  timeEnd: null,
  currentGame: null,
  version: '1.1.0'
};

export const AppContext = createContext([initialState, appActions]);

const AppContextProvider = function ({ children }) {
  const [appState, setAppState] = useState(initialState);



  const actions = {
    addAvatar: appActions.addAvatar(appState, setAppState),
    addUser: appActions.addUser(appState, setAppState),
    endGame: appActions.endGame(appState, setAppState),
    goHome: appActions.goHome(appState, setAppState),
    goNext: appActions.goNext(appState, setAppState),
    removeAvatar: appActions.removeAvatar(appState, setAppState),
    removeUser: appActions.removeUser(appState, setAppState),
    restartGame: appActions.restartGame(appState, setAppState),
    selectGameType: appActions.selectGameType(appState, setAppState),
    startGame: appActions.startGame(appState, setAppState)
  };

  return <AppContext.Provider value={[appState, actions]}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

// let localStored = window.localStorage.getItem('store');
// let setBackground = () => {
//   return mixColors().background;
// };

// if (localStored) {
//   localStored = JSON.parse(localStored);
//   if (localStored.version) {
//     if (localStored.version !== initialState.version) {
//       localStorage.removeItem('store');
//       localStored = initialState;
//     }
//   }
//   initialState.user = localStored.user;
//   initialState.avatar = localStored.avatar;
//   initialState.played = localStored.played;
//   initialState.questions = localStored.questions;
//   initialState.answers = localStored.answers;
//   initialState.currentPage = localStored.currentPage;
//   initialState.currentGame = localStored.currentGame;
//   initialState.version = localStored.version;
// }

// const useGlobal = useGlobalHook(React, initialState, userActions);

// export default useGlobal;
