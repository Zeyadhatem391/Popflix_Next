import { useQuery } from "@tanstack/react-query";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
};

const GetMovies = async (genreId: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&with_genres=${genreId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return data.results.slice(0, 20);
};

const useMovies = (genreId: number) => {
  return useQuery<Movie[]>({
    queryKey: ["movies", genreId],
    queryFn: () => GetMovies(genreId),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useMovies;