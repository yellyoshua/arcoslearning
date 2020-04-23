import React from 'react';
import useGlobalHook from 'use-global-hook';

import * as userActions from '../actions';

let localStored = window.localStorage.getItem('store');
let initialState = {
  user: null,
  played: [],
  questions: {
    q: [
      {
        question: 'Cuanto es 2 + 2',
        answer: ['4', 'cuatro']
      },
      {
        question: 'Cuanto es 4 x 4',
        answer: ['16', 'dieciseis']
      },
      {
        question: 'Fruta color rojo',
        answer: ['manzana']
      }
    ],
    m: [
      {
        question: 'Numeros pares',
        options: [
          {in: '2', out: '2'},
          {in: '3', out: '3'},
          {in: '4', out: '4'},
          {in: '5', out: '5'}
        ],
        answer: ['2', '4']
      },
      {
        question: 'Numeros inpares',
        options: [
          {in: '2', out: '2'},
          {in: '3', out: '3'},
          {in: '4', out: '4'},
          {in: '5', out: '5'}
        ],
        answer: ['3', '5']
      }
    ]
  },
  answers: {
    q: [], // {page: 0,value : []}
    m: [] // {page: 0,value : []}
  },
  currentPage: null,
  timeStart: null,
  timeEnd: null,
  currentGame: null
};

if (localStored) {
  localStored = JSON.parse(localStored);
  initialState.user = localStored.user;
  initialState.played = localStored.played;
  initialState.questions = localStored.questions;
  initialState.answers = localStored.answers;
  initialState.currentPage = localStored.currentPage;
  initialState.currentGame = localStored.currentGame;
}

const useGlobal = useGlobalHook(React, initialState, userActions);

export default useGlobal;
