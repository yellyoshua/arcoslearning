import React, { createContext, useState } from 'react';
import { mixColors } from 'utils/mixcolors';
import * as questions from 'utils/sample-questions';
// PENDING: import stateComponent from '../states';

import * as appActions from '../actions';

function setBackground() {
	return mixColors().background;
}

export const initialState = {
	user: null,
	avatar: null,
	scores: [],
	gameOptions: [
		{
			name: 'Lenguage',
			background: setBackground(),
			alt: 'language_game',
			game: 'literature',
		},
		{
			name: 'Historia',
			background: setBackground(),
			alt: 'language_game',
			game: 'history',
		},
		{
			name: 'Biologia',
			background: setBackground(),
			alt: 'language_game',
			game: 'biology',
		},
		{
			name: 'Matemáticas',
			background: setBackground(),
			alt: 'language_game',
			game: 'math',
		},
	],
	questions: {
		literature: questions.LiteratureQuestions,
		history: questions.HistoryQuestions,
		biology: questions.BiologyQuestions,
		math: questions.MathQuestions,
	},
	answers: {
		literature: [], // {page: 0,value : []}
		history: [], // {page: 0,value : []},
		biology: [], // {page: 0,value : []},
		math: [], // {page: 0,value : []},
	},
	currentPage: null,
	timeStart: null,
	timeEnd: null,
	currentGame: null,
};

export const AppContext = createContext([initialState, appActions]);

const AppContextProvider = function ({ children }) {
	const [appState, setAppState] = useState(getLocalSession(initialState));

	const actions = {
		addAvatar: appActions.addAvatar(appState, setAppState),
		addUser: appActions.addUser(appState, setAppState),
		addScore: appActions.addScore(appState, setAppState),
		goHome: appActions.goHome(appState, setAppState),
		goNext: appActions.goNext(appState, setAppState),
		removeAvatar: appActions.removeAvatar(appState, setAppState),
		removeUser: appActions.removeUser(appState, setAppState),
		restartGame: appActions.restartGame(appState, setAppState),
		selectGameType: appActions.selectGameType(appState, setAppState),
		startGame: appActions.startGame(appState, setAppState),
	};

	return (
		<AppContext.Provider value={[appState, actions]}>
			{children}
		</AppContext.Provider>
	);
};

function getLocalSession(appState) {
	const state = { ...appState };
	const session = JSON.parse(window.localStorage.getItem('store'));

	if (!session) {
		return state;
	}

	if (!session.user) {
		return state;
	}

	state.user = session.user.username;
	state.avatar = session.user.avatar;
	state.avatar = session.user.avatar;
	state.scores = session.scores;
	return state;
}

export default AppContextProvider;
