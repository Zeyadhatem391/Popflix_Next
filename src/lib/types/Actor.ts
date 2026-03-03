

export type Actor = {
  id: number;
  name: string;
  profile_path: string | null;
};

export type PopularActorsResponse = {
  page: number;
  results: Actor[];
};