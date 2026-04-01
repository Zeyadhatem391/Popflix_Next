import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";
import { containsBlockedWord } from "@/lib/utils/blockedKeywords";

const GetSearchMovies = async (searchQuery: string): Promise<Movie[]> => {
  if (!searchQuery) return [];

  if (containsBlockedWord(searchQuery)) {
    throw new Error("This search term is not allowed.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}&include_adult=false`
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