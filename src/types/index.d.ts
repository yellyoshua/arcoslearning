export type UserStore = {
  username: string | null;
  loading: boolean;
  id: string | null;
};

export type ScoresStore = {
  scores: {
    [k: string]: string[];
  };
  loading: boolean;
};
