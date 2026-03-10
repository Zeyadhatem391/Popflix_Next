import { Movie } from "@/lib/types/Movie";
import { useQuery } from "@tanstack/react-query";

export const GetGenreMovies = async (genreId: number, page: number): Promise<Movie[]> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&with_genres=${genreId}&page=${page}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return data.results;
};

const useGetGenreMovies = (genreId: number, page: number) => {
  return useQuery<Movie[]>({
    queryKey: ["genreMovies", genreId, page],
    queryFn: () => GetGenreMovies(genreId, page),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetGenreMovies;