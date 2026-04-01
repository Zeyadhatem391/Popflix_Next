
export type Cast = {
  id: number;
  character: string;
  original_name: string;
  profile_path: string | null;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  key: string;
  site: string;
  type: string;
};

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

  genres: Genre[];

  credits: {
    cast: Cast[];
    crew: Crew[];
  };

  videos: {
    results: Video[];
  };
};