import { useQuery } from "@tanstack/react-query";

/* ========= TYPES ========= */

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
  release_date: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;

  genres: Genre[];

  credits: {
    cast: Cast[];
    crew: Crew[];
  };

  videos: {
    results: Video[];
  };
};

/* ========= FETCH ========= */

const GetDetailsMovies = async (
  movieId: string
): Promise<Movie> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=credits,videos`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};

/* ========= HOOK ========= */

const useGetDetailsMovies = (movieId: string) => {
  return useQuery<Movie>({
    queryKey: ["movie-details", movieId],
    queryFn: () => GetDetailsMovies(movieId),
    staleTime: 1000 * 60 * 5,
    enabled: !!movieId,
  });
};

export default useGetDetailsMovies;