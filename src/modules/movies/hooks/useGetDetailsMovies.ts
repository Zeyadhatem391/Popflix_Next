
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/modules/movies/api/getMovieDetails";

const useGetDetailsMovies = (movieId: string) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetDetailsMovies;
