import { Movie } from "@/lib/types/Movie";

export const getMovieDetails = async (
  movieId: string
): Promise<Movie> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&append_to_response=credits,videos`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};