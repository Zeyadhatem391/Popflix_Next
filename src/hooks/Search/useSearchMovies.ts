import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";

const GetSearchMovies = async (searchQuery: string): Promise<Movie[]> => {
  if (!searchQuery) return [];

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=7b8da597ddda3922e0a74cec92c25b67&query=${searchQuery}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await res.json();

  return data.results;
};

const useSearchMovies = (searchQuery: string) => {
  return useQuery<Movie[]>({
    queryKey: ["searchMovies", searchQuery],
    queryFn: () => GetSearchMovies(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  });
};

export default useSearchMovies;