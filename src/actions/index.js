function setInLocalStorage(state) {
	const value = {
		user: {
			username: state.user,
			avatar: state.avatar,
		},
		scores: state.scores,
	};
	window.localStorage.setItem('store', JSON.stringify(value));
}

//USER
export const addUser = (store, setState) => (payload) => {
	const newUser = payload;
	let state = {
		...store,
		user: newUser,
	};

	setInLocalStorage(state);
	return setState(state);
};

export const addAvatar = (store, setState) => (payload) => {
	const avatar = payload;
	let state = {
		...store,
		avatar: avatar,
	};

	setInLocalStorage(state);
	return setState(state);
};

export const removeAvatar = (store, setState) => () => {
	let state = {
		...store,
		avatar: null,
	};

	setInLocalStorage(state);
	return setState(state);
};
export const removeUser = (store, setState) => () => {
	let state = {
		...store,
		user: null,
		avatar: null,
		currentPage: null,
		currentGame: null,
	};

	setInLocalStorage(state);
	return setState(state);
};
//USER
//GAME
export const startGame = (store, setState) => () => {
	let state = {
		...store,
		timeStart: Date.now(),
		currentPage: 0,
	};

	return setState(state);
};

export const addScore = (store, setState) => (payload) => {
	const state = { ...store };
	if (payload) {
		const filterScores = state.scores.filter(({ user, game }) => {
			const exist = payload.user === user && payload.game === game;
			return !exist;
		});

		state.scores = [...filterScores, payload];
		setInLocalStorage(state);
		return setState(state);
	} else {
		return setState(state);
	}
};

export const goHome = (store, setState) => () => {
	let state = {
		...store,
		timeStart: null,
		timeEnd: null,
		currentPage: null,
		currentGame: null,
	};

	setInLocalStorage(state);
	return setState(state);
};

export const goNext = (store, setState) => (payload) => {
	const answer = payload;
	let currentPage = store.currentPage + 1;

	let state = {
		...store,
		currentPage: currentPage,
	};
	state.answers[state.currentGame].push({
		page: store.currentPage,
		value: answer,
	});

	return setState(state);
};

export const selectGameType = (store, setState) => (payload) => {
	const gameType = payload;
	let state = {
		...store,
		currentGame: gameType,
	};

	return setState(state);
};
export const restartGame = (store, setState) => () => {
	let state = {
		...store,
		scores: [],
		currentPage: null,
		currentGame: null,
	};

	setInLocalStorage(state);
	return setState(state);
};
//GAME
