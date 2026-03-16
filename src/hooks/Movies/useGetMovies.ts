import { useQuery } from "@tanstack/react-query";
import { Movie } from "@/lib/types/Movie";

const GetMovies = async (genreId: number): Promise<Movie[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&with_genres=${genreId}`
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