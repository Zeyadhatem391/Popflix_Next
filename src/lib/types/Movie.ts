export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  original_language: string,
  release_date: string,
  genre_ids: number[],
};
