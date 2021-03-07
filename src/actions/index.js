//USER
export const addUser = (store, setState) => (payload) => {
  const newUser = payload;
  let state = {
    ...store,
    user: newUser
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};

export const addAvatar = (store, setState) => (payload) => {
  const avatar = payload;
  let state = {
    ...store,
    avatar: avatar
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};

export const removeAvatar = (store, setState) => () => {
  let state = {
    ...store,
    avatar: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};
export const removeUser = (store, setState) => () => {
  let state = {
    ...store,
    user: null,
    avatar: null,
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};
//USER
//GAME
export const startGame = (store, setState) => () => {
  let state = {
    ...store,
    timeStart: Date.now(),
    currentPage: 0
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};
export const endGame = (store, setState) => (payload) => {
  const endAnswer = payload;
  let state = {
    ...store,
    timeEnd: Date.now()
  };
  state.answers[state.currentGame].push({ page: state.currentPage, value: endAnswer });

  let playedSchema = {
    questionsCalified: [],
    user: state.user,
    timeStart: state.timeStart,
    timeEnd: state.timeEnd,
    failed: 0,
    passed: 0,
    score: 0,
    game: state.currentGame,
    avatar: state.avatar
  };

  const scorePlayed = (played) => {
    let newGame = {
      ...played,
      value: 0,
      score: 0,
      calification: 'A',
      color: 'black'
    };

    const totalQuestions = newGame.passed + newGame.failed;
    const passQuestions = newGame.passed;

    newGame.value = passQuestions / totalQuestions;
    newGame.score = Math.floor(newGame.value * 100);

    if (newGame.score >= 90 && newGame.score <= 100) {
      newGame.calification = 'A';
      newGame.color = 'green';
    }
    if (newGame.score >= 80 && newGame.score <= 89) {
      newGame.calification = 'B';
    }
    if (newGame.score >= 70 && newGame.score <= 79) {
      newGame.calification = 'C';
    }
    if (newGame.score >= 60 && newGame.score <= 69) {
      newGame.calification = 'D';
    }
    if (newGame.score <= 59 && newGame.score >= 0) {
      newGame.calification = 'F';
      newGame.color = 'red';
    }
    return newGame;
  };
  const sortCalifications = (game1, game2) => {
    return game2.score - game1.score;
  };

  const useranswers = state.answers[state.currentGame];
  useranswers.forEach((useranswer, iAnswer) => {
    let answers = [];
    let reviewtest = { question: null, wrong: false };

    const gameanswers = state.questions[state.currentGame][iAnswer].answer;

    gameanswers.forEach((gameanswer) => {
      let isNumber = Number(gameanswer.trim());

      if (isNumber) {
        if (Number(useranswer.value.trim()) === Number(gameanswer)) {
          answers.push(true);
          return;
        }
        return;
      }
      if (useranswer.value.trim().toUpperCase() === gameanswer.toUpperCase()) {
        answers.push(true);
        return;
      }
      if (useranswer.value === gameanswer) {
        answers.push(true);
        return;
      }
      return;
    });

    if (answers.indexOf(true) !== -1) {
      reviewtest.question = state.questions[state.currentGame][iAnswer].question;
      reviewtest.answer = useranswer.value.trim();
      reviewtest.wrong = false;
      playedSchema.questionsCalified.push(reviewtest);
      return;
    }
    reviewtest.question = state.questions[state.currentGame][iAnswer].question;
    reviewtest.answer = useranswer.value.trim();
    reviewtest.wrong = true;
    playedSchema.questionsCalified.push(reviewtest);
    return;
  });
  playedSchema.questionsCalified.forEach((question) => {
    if (question.wrong) {
      playedSchema.failed = playedSchema.failed + 1;
      return;
    }
    playedSchema.passed = playedSchema.passed + 1;
  });

  state.played.push(playedSchema);
  state.played = state.played
    .map(scorePlayed)
    .sort(sortCalifications)
    .filter((played, index) => {
      return state.played.findIndex((game) => game.user.toUpperCase() === played.user.toUpperCase()) === index;
    });
  state.currentPage = null;
  state.currentGame = null;
  state.answers.literature = [];
  state.answers.history = [];
  state.answers.biology = [];
  state.answers.math = [];

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};

export const goHome = (store, setState) => () => {
  let state = {
    ...store,
    timeStart: null,
    timeEnd: null,
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};

export const goNext = (store, setState) => (payload) => {
  const answer = payload;
  let currentPage = store.currentPage + 1;

  let state = {
    ...store,
    currentPage: currentPage
  };
  state.answers[state.currentGame].push({ page: store.currentPage, value: answer });

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};

export const selectGameType = (store, setState) => (payload) => {
  const gameType = payload;
  let state = {
    ...store,
    currentGame: gameType
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};
export const restartGame = (store, setState) => () => {
  let state = {
    ...store,
    played: [],
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  return setState(state);
};
//GAME
