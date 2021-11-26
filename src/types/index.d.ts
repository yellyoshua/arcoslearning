export interface Asset {
	id: string;
	slug: string | null;
	url: string;
}

export interface UserSession {
	id: string;
	avatar: Asset | null;
	name: string;
}
export interface UserStore {
	user: UserSession | null;
	loading: boolean;
}

export interface Score {
	score: string;
	qualification: number;
	quiz: string;
	user: UserSession;
}

export interface ScoresStore {
	scores: Score[];
	loading: boolean;
}

export interface QuizStore {
	pages: number;
	assignment: null | string;
	questions: Question[];
	qualification: number;
	currentPage: number;
	start: null | Date;
	loading: boolean;
}

export interface AppStore {
	avatars: Asset[];
	loading: boolean;
}

export interface Question {
	id: string;
	assignment: string;
	question: string;
	options: string[];
	answerIndex: number;
}
