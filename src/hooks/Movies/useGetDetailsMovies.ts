
import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";
import { getMovieDetails } from "@/services/movies/getMovieDetails";

const useGetDetailsMovies = (movieId: string) => {
  return useQuery<Movie>({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 1000 * 60 * 5,
    enabled: !!movieId,
  });
};

export default useGetDetailsMovies;