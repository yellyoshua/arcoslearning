export interface Asset {
	id: string;
	slug: string | null;
	url: string;
}

export interface UserSession {
	id: string;
	name: string;
	avatar: Asset | null;
}
export interface UserStore {
	user: UserSession | null;
	loading: boolean;
}

export interface Score {
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
	assignment: null | Assignment;
	questions: Quiz[];
	qualification: number;
	currentPage: number;
	start: null | Date;
	loading: boolean;
	done: boolean;
}

export interface Assignment {
	id: string;
	name: string;
	quizzes?: Quiz[];
}

export interface AssignmentStore {
	assignments: Assignment[];
	loading: boolean;
}

export interface AppStore {
	avatars: Asset[];
	loading: boolean;
}

export interface Quiz {
	id: string;
	assignment: Assignment;
	question: string;
	options: string[];
	answerIndex: number;
}
