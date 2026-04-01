import { Movie } from "@/lib/types/Movie";
import { useQuery } from "@tanstack/react-query";

/* ========= TYPES ========= */



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