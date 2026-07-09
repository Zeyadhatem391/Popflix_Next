

export type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
  gender?: number;
  birthday?: string;
};

export type PopularActorsResponse = {
  page: number;
  results: Actor[];
};