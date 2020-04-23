//USER
export const addUser = (store, newUser) => {
  let state = {
    ...store.state,
    user: newUser
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
export const removeUser = (store) => {
  let state = {
    ...store.state,
    user: null,
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
//USER
//GAME
export const startGame = (store) => {
  let state = {
    ...store.state,
    timeStart: Date.now(),
    currentPage: 0
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
export const endGame = (store, endAnswer) => {
  let state = {
    ...store.state,
    timeEnd: Date.now()
  };
  state.answers[state.currentGame].push({page: state.currentPage, value: endAnswer});

  let playedSchema = {
    questionsCalified: [],
    user: state.user,
    timeStart: state.timeStart,
    timeEnd: state.timeEnd,
    failed: 0,
    passed: 0
  };
  state.answers[state.currentGame].forEach((answer, iAnswer) => {
    let answers = [];
    let q = {question: null, wrong: false};

    state.questions[state.currentGame][iAnswer].answer.forEach((answerquestion) => {
      let isNumber = Number(answerquestion);
      console.log('answerquestion -> ', answer, answerquestion);
      if (isNumber) {
        if (Number(answer.value) === Number(answerquestion)) {
          answers.push(true);
          return;
        }
        return;
      }
      if (answer.value.toString().trim().toUpperCase() === answerquestion.toString().toUpperCase()) {
        answers.push(true);
        return;
      }
      return;
    });

    console.log('answers -> ', answers);
    if (answers.indexOf(true) !== -1) {
      q.question = state.questions[state.currentGame][iAnswer].question;
      q.answer = answer.value;
      q.wrong = false;
      playedSchema.questionsCalified.push(q);
      return;
    }
    q.question = state.questions[state.currentGame][iAnswer].question;
    q.answer = answer.value;
    q.wrong = true;
    playedSchema.questionsCalified.push(q);
    return;
  });
  playedSchema.questionsCalified.forEach((question) => {
    if (question.wrong) {
      playedSchema.failed = playedSchema.failed + 1;
      return;
    }
    playedSchema.passed = playedSchema.passed + 1;
  });

  // for (let iAnswer = 0; state.answers[state.currentGame].length > iAnswer; iAnswer++) {
  //   let answers = [];
  //   let q = {question: null, wrong: false};

  //   let answer = state.answers[state.currentGame][iAnswer];
  //   for (let iAnswerQ = 0; state.questions[state.currentGame][iAnswer].answer.length > iAnswerQ; iAnswerQ++) {
  //     let answerquestion = state.questions[state.currentGame][iAnswer].answer[iAnswerQ];
  //     let isNumber = Number(answerquestion);
  //     if (isNumber) {
  //       if (Number(answer) === Number(answerquestion)) {
  //         answers.push(true);
  //         return;
  //       }
  //       return;
  //     }
  //     if (answer.toString().toUpperCase() === answerquestion.toString().toUpperCase()) {
  //       answers.push(true);
  //       return;
  //     }
  //     return;
  //   }
  //   console.log('answers -> ', answers);
  //   if (answers.indexOf(true) !== -1) {
  //     q.question = state.questions[state.currentGame][iAnswer].question;
  //     q.wrong = false;
  //     playedSchema.questionsCalified.push(q);
  //     return;
  //   }
  //   q.question = state.questions[state.currentGame][iAnswer].question;
  //   q.wrong = true;
  //   playedSchema.questionsCalified.push(q);
  // }

  // for (let question = 0; playedSchema.questionsCalified.length > question; question++) {
  //   if (playedSchema.questionsCalified[question].wrong) {
  //     playedSchema.failed = playedSchema.failed + 1;
  //     return;
  //   }
  //   playedSchema.passed = playedSchema.passed + 1;
  // }

  state.played.push(playedSchema);

  state.currentPage = null;
  state.currentGame = null;
  state.answers.m = [];
  state.answers.q = [];

  window.localStorage.setItem('store', JSON.stringify(state));
  return store.setState(state);
};
export const goHome = (store) => {
  let state = {
    ...store.state,
    timeStart: null,
    timeEnd: null,
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
export const goNext = (store, answer, actions) => {
  let currentPage = store.state.currentPage + 1;

  let state = {
    ...store.state,
    currentPage: currentPage
  };

  state.answers[store.state.currentGame].push({page: store.state.currentPage, value: answer});

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};

export const selectGameType = (store, gameType) => {
  let state = {
    ...store.state,
    currentGame: gameType
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
export const restartGame = (store) => {
  let state = {
    ...store.state,
    played: [],
    currentPage: null,
    currentGame: null
  };

  window.localStorage.setItem('store', JSON.stringify(state));
  store.setState(state);
};
//GAME
