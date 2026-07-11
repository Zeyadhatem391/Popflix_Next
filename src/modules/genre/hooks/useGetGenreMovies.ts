import { useQuery } from "@tanstack/react-query";
import { GetGenreMovie, SortBy } from "../api/GetGenreMovie";
import { containsBlockedWord } from "@/shared/utils/blockedKeywords";

const useGetGenreMovies = (
  genreId: number,
  page: number,
  rating: number,
  decade: string,
  language: string,
  sortBy: SortBy,
  debouncedQuery: string
) => {
  const blocked = containsBlockedWord(debouncedQuery);

  return useQuery({
    queryKey: [
      "genreMovies",
      genreId,
      page,
      rating,
      decade,
      language,
      sortBy,
      debouncedQuery,
    ],

    queryFn: () =>
      GetGenreMovie(
        genreId,
        page,
        rating,
        decade,
        language,
        sortBy,
        debouncedQuery
      ),

    enabled: !blocked,

    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export default useGetGenreMovies;