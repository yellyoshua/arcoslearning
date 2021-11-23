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

export interface GameStore {
  pages: number;
  quiz: null;
  currentPage: number;
  start: null | Date;
}

export interface AppStore {
  avatars: Asset[];
  loading: boolean;
}
